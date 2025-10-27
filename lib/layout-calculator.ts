import { ComponentCategory } from './component-registry';

// Component size estimates (width x height in pixels)
const COMPONENT_SIZES: Record<string, { width: number; height: number }> = {
  button: { width: 100, height: 40 },
  input: { width: 200, height: 40 },
  textarea: { width: 300, height: 120 },
  checkbox: { width: 120, height: 40 },
  'radio-group': { width: 200, height: 120 },
  switch: { width: 120, height: 40 },
  select: { width: 200, height: 40 },
  slider: { width: 200, height: 40 },
  label: { width: 100, height: 40 },
  card: { width: 350, height: 200 },
  badge: { width: 80, height: 24 },
  avatar: { width: 48, height: 48 },
  separator: { width: 300, height: 1 },
  skeleton: { width: 250, height: 80 },
  progress: { width: 200, height: 8 },
  tooltip: { width: 120, height: 40 },
  tabs: { width: 400, height: 150 },
  alert: { width: 400, height: 120 },
  accordion: { width: 400, height: 150 },
  table: { width: 500, height: 200 },
  breadcrumb: { width: 250, height: 30 },
  'navigation-menu': { width: 300, height: 40 },
  menubar: { width: 250, height: 40 },
  pagination: { width: 300, height: 40 },
  dialog: { width: 120, height: 40 },
  sheet: { width: 120, height: 40 },
  popover: { width: 120, height: 40 },
  'dropdown-menu': { width: 120, height: 40 },
  collapsible: { width: 350, height: 80 },
  'scroll-area': { width: 350, height: 200 },
  calendar: { width: 350, height: 350 },
  carousel: { width: 300, height: 200 },
  'aspect-ratio': { width: 300, height: 169 },
};

interface LayoutBlock {
  id: string;
  componentId: string;
  x: number;
  y: number;
  width: number;
  height: number;
  category: string;
  variantIds: string[];
}

interface LayoutResult {
  blocks: LayoutBlock[];
  totalHeight: number;
}

// Calculate the layout for all components
export function calculateLayout(
  categories: ComponentCategory[],
  getComponentsByCategory: (cat: ComponentCategory) => any[],
  getVariantsByComponent: (componentId: string) => any[]
): LayoutResult {
  const blocks: LayoutBlock[] = [];
  const BLOCK_PADDING = 20; // Padding around each block
  const BLOCK_SPACING = 60; // Space between blocks (increased)
  const HORIZONTAL_SPACING = 40; // Space between variants (increased)
  const CATEGORY_SPACING = 80; // Vertical space between categories (increased)
  const CATEGORY_LABEL_HEIGHT = 30;
  const MIN_COLUMN_WIDTH = 250; // Minimum column width
  const COMPONENT_GAP = 60; // Space between components (increased)
  
  let currentY = 50;
  let categoryIndex = 0;
  
  for (const category of categories) {
    const components = getComponentsByCategory(category);
    
    if (components.length === 0) continue;
    
    const categoryY = currentY;
    const componentStartY = currentY + CATEGORY_LABEL_HEIGHT + 120; // Much more space after title
    
    // Calculate the layout for this category
    let currentX = 50;
    let currentYForCategory = componentStartY;
    
    // Group components into rows based on horizontal space
    const rows: LayoutBlock[][] = [];
    let currentRow: LayoutBlock[] = [];
    let rowWidth = 0;
    let rowHeight = 0;
    
    for (const component of components) {
      const componentId = component.id;
      const variants = getVariantsByComponent(componentId);
      const variantCount = variants.length;
      
      // Get base size
      const baseSize = COMPONENT_SIZES[componentId] || { width: 200, height: 100 };
      
      // Calculate block dimensions
      // Width = base component + all variants with spacing
      // We always have at least 1 (the base component)
      const totalComponents = Math.max(1, variantCount + 1);
      const blockWidth = totalComponents * (baseSize.width + HORIZONTAL_SPACING) - HORIZONTAL_SPACING;
      const blockHeight = baseSize.height;
      
      const block: LayoutBlock = {
        id: componentId,
        componentId,
        x: currentX,
        y: currentYForCategory,
        width: blockWidth,
        height: blockHeight,
        category,
        variantIds: variants,
      };
      
      // Position block on current row (no wrapping within a category)
      block.x = currentX;
      block.y = currentYForCategory;
      
      currentRow.push(block);
      rowHeight = Math.max(rowHeight, block.height);
      
      // Update current position with proper spacing (component width + gap)
      // Add COMPONENT_GAP after each block to ensure proper spacing
      currentX = currentX + blockWidth + COMPONENT_GAP;
    }
    
    if (currentRow.length > 0) {
      rows.push(currentRow);
    }
    
    // All blocks have their Y positions already set correctly
    // Push them to the blocks array
    rows.forEach(row => {
      row.forEach(block => {
        blocks.push(block);
      });
    });
    
    // Find the bottom of this category
    const categoryBottom = rows.length > 0 
      ? Math.max(...rows.flat().map(b => b.y + b.height))
      : componentStartY;
    
    // Move to next category below the current one with extra spacing
    currentY = categoryBottom + CATEGORY_SPACING;
    categoryIndex++;
  }
  
  return {
    blocks,
    totalHeight: currentY,
  };
}

// Get position for a specific component's variants
export function getVariantPositions(
  block: LayoutBlock,
  baseSize: { width: number; height: number }
): Array<{ id: string; x: number; y: number }> {
  const HORIZONTAL_SPACING = 32;
  const positions: Array<{ id: string; x: number; y: number }> = [];
  
  // Base component position
  positions.push({ id: block.componentId, x: block.x, y: block.y });
  
  // Variant positions
  block.variantIds.forEach((variantId, index) => {
    positions.push({
      id: variantId,
      x: block.x + (index + 1) * (baseSize.width + HORIZONTAL_SPACING),
      y: block.y,
    });
  });
  
  return positions;
}

