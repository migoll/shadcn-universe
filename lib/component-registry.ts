/**
 * Component Registry
 * Central registry for all shadcn-ui components with their metadata
 */

export type ComponentCategory = 
  | "form" 
  | "data-display" 
  | "navigation" 
  | "overlay" 
  | "feedback" 
  | "layout" 
  | "advanced";

export interface PropDefinition {
  name: string;
  type: "string" | "number" | "boolean" | "enum" | "color" | "node";
  default?: any;
  options?: string[];
  description?: string;
}

export interface ComponentMetadata {
  id: string;
  name: string;
  displayName: string;
  category: ComponentCategory;
  description: string;
  props: PropDefinition[];
  defaultProps: Record<string, any>;
  exampleContent?: string;
  hasChildren?: boolean;
}

export const COMPONENT_REGISTRY: ComponentMetadata[] = [
  // FORM COMPONENTS
  {
    id: "button",
    name: "Button",
    displayName: "Button",
    category: "form",
    description: "A clickable button component",
    props: [
      { name: "variant", type: "enum", options: ["default", "destructive", "outline", "secondary", "ghost", "link"], default: "default" },
      { name: "size", type: "enum", options: ["default", "sm", "lg", "icon"], default: "default" },
      { name: "disabled", type: "boolean", default: false },
      { name: "children", type: "string", default: "Button" }
    ],
    defaultProps: { variant: "default", size: "default", children: "Button" },
    hasChildren: true,
    exampleContent: "Click me"
  },
  {
    id: "input",
    name: "Input",
    displayName: "Input",
    category: "form",
    description: "Text input field",
    props: [
      { name: "type", type: "enum", options: ["text", "email", "password", "number", "tel", "url"], default: "text" },
      { name: "placeholder", type: "string", default: "Enter text..." },
      { name: "disabled", type: "boolean", default: false }
    ],
    defaultProps: { type: "text", placeholder: "Enter text..." }
  },
  {
    id: "textarea",
    name: "Textarea",
    displayName: "Textarea",
    category: "form",
    description: "Multi-line text input",
    props: [
      { name: "placeholder", type: "string", default: "Type your message..." },
      { name: "disabled", type: "boolean", default: false },
      { name: "rows", type: "number", default: 4 }
    ],
    defaultProps: { placeholder: "Type your message...", rows: 4 }
  },
  {
    id: "checkbox",
    name: "Checkbox",
    displayName: "Checkbox",
    category: "form",
    description: "Checkbox input",
    props: [
      { name: "disabled", type: "boolean", default: false },
      { name: "checked", type: "boolean", default: false }
    ],
    defaultProps: { checked: false }
  },
  {
    id: "radio-group",
    name: "RadioGroup",
    displayName: "Radio Group",
    category: "form",
    description: "Radio button group",
    props: [
      { name: "disabled", type: "boolean", default: false }
    ],
    defaultProps: { disabled: false },
    hasChildren: true
  },
  {
    id: "switch",
    name: "Switch",
    displayName: "Switch",
    category: "form",
    description: "Toggle switch",
    props: [
      { name: "disabled", type: "boolean", default: false },
      { name: "checked", type: "boolean", default: false }
    ],
    defaultProps: { checked: false }
  },
  {
    id: "select",
    name: "Select",
    displayName: "Select",
    category: "form",
    description: "Dropdown select menu",
    props: [
      { name: "disabled", type: "boolean", default: false },
      { name: "placeholder", type: "string", default: "Select an option..." }
    ],
    defaultProps: { placeholder: "Select an option..." },
    hasChildren: true
  },
  {
    id: "slider",
    name: "Slider",
    displayName: "Slider",
    category: "form",
    description: "Range slider input",
    props: [
      { name: "disabled", type: "boolean", default: false },
      { name: "min", type: "number", default: 0 },
      { name: "max", type: "number", default: 100 },
      { name: "step", type: "number", default: 1 }
    ],
    defaultProps: { min: 0, max: 100, step: 1 }
  },
  {
    id: "label",
    name: "Label",
    displayName: "Label",
    category: "form",
    description: "Form label",
    props: [
      { name: "children", type: "string", default: "Label" }
    ],
    defaultProps: { children: "Label" },
    hasChildren: true
  },
  {
    id: "form",
    name: "Form",
    displayName: "Form",
    category: "form",
    description: "Form wrapper with validation",
    props: [],
    defaultProps: {},
    hasChildren: true
  },

  // DATA DISPLAY COMPONENTS
  {
    id: "card",
    name: "Card",
    displayName: "Card",
    category: "data-display",
    description: "Card container with header, content, and footer",
    props: [],
    defaultProps: {},
    hasChildren: true,
    exampleContent: "Card content"
  },
  {
    id: "badge",
    name: "Badge",
    displayName: "Badge",
    category: "data-display",
    description: "Small badge component",
    props: [
      { name: "variant", type: "enum", options: ["default", "secondary", "destructive", "outline"], default: "default" },
      { name: "children", type: "string", default: "Badge" }
    ],
    defaultProps: { variant: "default", children: "Badge" },
    hasChildren: true
  },
  {
    id: "avatar",
    name: "Avatar",
    displayName: "Avatar",
    category: "data-display",
    description: "User avatar component",
    props: [],
    defaultProps: {},
    hasChildren: true
  },
  {
    id: "separator",
    name: "Separator",
    displayName: "Separator",
    category: "data-display",
    description: "Visual divider",
    props: [
      { name: "orientation", type: "enum", options: ["horizontal", "vertical"], default: "horizontal" }
    ],
    defaultProps: { orientation: "horizontal" }
  },
  {
    id: "skeleton",
    name: "Skeleton",
    displayName: "Skeleton",
    category: "data-display",
    description: "Loading skeleton placeholder",
    props: [],
    defaultProps: {}
  },
  {
    id: "progress",
    name: "Progress",
    displayName: "Progress",
    category: "data-display",
    description: "Progress bar",
    props: [
      { name: "value", type: "number", default: 50 }
    ],
    defaultProps: { value: 50 }
  },
  {
    id: "table",
    name: "Table",
    displayName: "Table",
    category: "data-display",
    description: "Data table",
    props: [],
    defaultProps: {},
    hasChildren: true
  },
  {
    id: "tooltip",
    name: "Tooltip",
    displayName: "Tooltip",
    category: "data-display",
    description: "Hover tooltip",
    props: [
      { name: "content", type: "string", default: "Tooltip content" }
    ],
    defaultProps: { content: "Tooltip content" },
    hasChildren: true
  },

  // NAVIGATION COMPONENTS
  {
    id: "tabs",
    name: "Tabs",
    displayName: "Tabs",
    category: "navigation",
    description: "Tab navigation component",
    props: [],
    defaultProps: {},
    hasChildren: true
  },
  {
    id: "navigation-menu",
    name: "NavigationMenu",
    displayName: "Navigation Menu",
    category: "navigation",
    description: "Complex navigation menu",
    props: [],
    defaultProps: {},
    hasChildren: true
  },
  {
    id: "menubar",
    name: "Menubar",
    displayName: "Menubar",
    category: "navigation",
    description: "Application menubar",
    props: [],
    defaultProps: {},
    hasChildren: true
  },
  {
    id: "breadcrumb",
    name: "Breadcrumb",
    displayName: "Breadcrumb",
    category: "navigation",
    description: "Breadcrumb navigation",
    props: [],
    defaultProps: {},
    hasChildren: true
  },
  {
    id: "pagination",
    name: "Pagination",
    displayName: "Pagination",
    category: "navigation",
    description: "Pagination controls",
    props: [],
    defaultProps: {},
    hasChildren: true
  },
  {
    id: "command",
    name: "Command",
    displayName: "Command",
    category: "navigation",
    description: "Command palette / search",
    props: [],
    defaultProps: {},
    hasChildren: true
  },

  // OVERLAY COMPONENTS
  {
    id: "dialog",
    name: "Dialog",
    displayName: "Dialog",
    category: "overlay",
    description: "Modal dialog",
    props: [],
    defaultProps: {},
    hasChildren: true
  },
  {
    id: "alert-dialog",
    name: "AlertDialog",
    displayName: "Alert Dialog",
    category: "overlay",
    description: "Alert confirmation dialog",
    props: [],
    defaultProps: {},
    hasChildren: true
  },
  {
    id: "sheet",
    name: "Sheet",
    displayName: "Sheet",
    category: "overlay",
    description: "Slide-out sheet panel",
    props: [
      { name: "side", type: "enum", options: ["top", "right", "bottom", "left"], default: "right" }
    ],
    defaultProps: { side: "right" },
    hasChildren: true
  },
  {
    id: "drawer",
    name: "Drawer",
    displayName: "Drawer",
    category: "overlay",
    description: "Bottom drawer",
    props: [],
    defaultProps: {},
    hasChildren: true
  },
  {
    id: "popover",
    name: "Popover",
    displayName: "Popover",
    category: "overlay",
    description: "Popover overlay",
    props: [],
    defaultProps: {},
    hasChildren: true
  },
  {
    id: "dropdown-menu",
    name: "DropdownMenu",
    displayName: "Dropdown Menu",
    category: "overlay",
    description: "Dropdown menu",
    props: [],
    defaultProps: {},
    hasChildren: true
  },
  {
    id: "context-menu",
    name: "ContextMenu",
    displayName: "Context Menu",
    category: "overlay",
    description: "Right-click context menu",
    props: [],
    defaultProps: {},
    hasChildren: true
  },
  {
    id: "hover-card",
    name: "HoverCard",
    displayName: "Hover Card",
    category: "overlay",
    description: "Hover card overlay",
    props: [],
    defaultProps: {},
    hasChildren: true
  },

  // FEEDBACK COMPONENTS
  {
    id: "alert",
    name: "Alert",
    displayName: "Alert",
    category: "feedback",
    description: "Alert message",
    props: [
      { name: "variant", type: "enum", options: ["default", "destructive"], default: "default" }
    ],
    defaultProps: { variant: "default" },
    hasChildren: true
  },
  {
    id: "sonner",
    name: "Sonner",
    displayName: "Toast",
    category: "feedback",
    description: "Toast notification (Sonner)",
    props: [],
    defaultProps: {}
  },
  {
    id: "aspect-ratio",
    name: "AspectRatio",
    displayName: "Aspect Ratio",
    category: "feedback",
    description: "Aspect ratio container",
    props: [
      { name: "ratio", type: "number", default: 16/9 }
    ],
    defaultProps: { ratio: 16/9 },
    hasChildren: true
  },

  // LAYOUT COMPONENTS
  {
    id: "accordion",
    name: "Accordion",
    displayName: "Accordion",
    category: "layout",
    description: "Collapsible accordion",
    props: [
      { name: "type", type: "enum", options: ["single", "multiple"], default: "single" }
    ],
    defaultProps: { type: "single" },
    hasChildren: true
  },
  {
    id: "collapsible",
    name: "Collapsible",
    displayName: "Collapsible",
    category: "layout",
    description: "Collapsible container",
    props: [],
    defaultProps: {},
    hasChildren: true
  },
  {
    id: "scroll-area",
    name: "ScrollArea",
    displayName: "Scroll Area",
    category: "layout",
    description: "Custom scrollable area",
    props: [],
    defaultProps: {},
    hasChildren: true
  },
  {
    id: "resizable",
    name: "Resizable",
    displayName: "Resizable",
    category: "layout",
    description: "Resizable panels",
    props: [],
    defaultProps: {},
    hasChildren: true
  },

  // ADVANCED COMPONENTS
  {
    id: "calendar",
    name: "Calendar",
    displayName: "Calendar",
    category: "advanced",
    description: "Date picker calendar",
    props: [],
    defaultProps: {}
  },
  {
    id: "carousel",
    name: "Carousel",
    displayName: "Carousel",
    category: "advanced",
    description: "Image/content carousel",
    props: [],
    defaultProps: {},
    hasChildren: true
  },
  {
    id: "chart",
    name: "Chart",
    displayName: "Chart",
    category: "advanced",
    description: "Chart visualization",
    props: [],
    defaultProps: {},
    hasChildren: true
  }
];

export const getComponentById = (id: string): ComponentMetadata | undefined => {
  return COMPONENT_REGISTRY.find(comp => comp.id === id);
};

export const getComponentsByCategory = (category: ComponentCategory): ComponentMetadata[] => {
  return COMPONENT_REGISTRY.filter(comp => comp.category === category);
};

export const getAllCategories = (): ComponentCategory[] => {
  return ["form", "data-display", "navigation", "overlay", "feedback", "layout", "advanced"];
};

export const CATEGORY_DISPLAY_NAMES: Record<ComponentCategory, string> = {
  "form": "Form Components",
  "data-display": "Data Display",
  "navigation": "Navigation",
  "overlay": "Overlays",
  "feedback": "Feedback",
  "layout": "Layout",
  "advanced": "Advanced"
};

