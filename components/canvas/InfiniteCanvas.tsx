'use client';

import React, { useCallback, useEffect, useMemo, useState } from 'react';
import ReactFlow, {
  Background,
  Controls,
  ControlButton,
  MiniMap,
  BackgroundVariant,
  useNodesState,
  useEdgesState,
  NodeTypes,
  OnInit,
} from 'reactflow';
import { useTheme } from 'next-themes';
import { Sun, Moon } from 'lucide-react';
import { ComponentNode } from './ComponentNode';
import { useCanvasStore } from '@/store/canvas-store';
import { useComponentStore } from '@/store/component-store';
import { COMPONENT_REGISTRY, getAllCategories, getComponentsByCategory, CATEGORY_DISPLAY_NAMES } from '@/lib/component-registry';
import { useEditorStore } from '@/store/editor-store';
import { toast } from 'sonner';
import { calculateLayout, getVariantPositions } from '@/lib/layout-calculator';

const CategoryLabelNode = ({ data }: any) => (
  <div className="text-2xl font-bold text-foreground uppercase tracking-wider pointer-events-none drop-shadow-lg">
    {data.label}
  </div>
);

const BlockNode = ({ data, selected }: any) => {
  return (
    <div 
      className="absolute border border-gray-200 bg-gray-50/30 pointer-events-none transition-opacity duration-200" 
      style={{ 
        width: data.width, 
        height: data.height,
        opacity: selected ? 0.8 : 0.2 
      }} 
    />
  );
};

const nodeTypes: NodeTypes = {
  componentNode: ComponentNode,
  categoryLabel: CategoryLabelNode,
  block: BlockNode,
};

export const InfiniteCanvas: React.FC = () => {
  const { theme, setTheme, resolvedTheme } = useTheme();
  const [nodes, setNodes, onNodesChange] = useNodesState([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);
  const [showBlocks, setShowBlocks] = useState(false);
  
  const canvasNodes = useCanvasStore((state) => state.nodes);
  const setCanvasNodes = useCanvasStore((state) => state.setNodes);
  const protectedDeleteNode = useCanvasStore((state) => state.protectedDeleteNode);
  const duplicateNode = useCanvasStore((state) => state.duplicateNode);
  const setRfInstance = useCanvasStore((state) => state.setRfInstance);
  const undo = useCanvasStore((state) => state.undo);
  const redo = useCanvasStore((state) => state.redo);
  
  const addInstance = useComponentStore((state) => state.addInstance);
  const [isInitialized, setIsInitialized] = useState(false);

  // Initialize canvas with layout-based positioning - only once
  useEffect(() => {
    if (isInitialized) return;
    
    const categories = getAllCategories();
    const initialNodes: any[] = [];
    
    // Calculate layout for variants (initially empty)
    const getVariants = (componentId: string) => {
      return [];
    };
    
    const layout = calculateLayout(
      getAllCategories() as any,
      getComponentsByCategory as any,
      getVariants
    );
    
    // Add block nodes and category labels
    layout.blocks.forEach((block) => {
      const category = categories.find((cat) => block.category === cat);
      if (!category) return;
      
      // Find if we've already added the category label
      const hasCategoryLabel = initialNodes.find(
        (n) => n.id === `category-${category}` && n.type === 'categoryLabel'
      );
      
      if (!hasCategoryLabel) {
        const categoryNodes = layout.blocks.filter((b) => b.category === category);
        if (categoryNodes.length > 0) {
          const firstBlockInCategory = Math.min(...categoryNodes.map((b) => b.y)) - 120;
          
          initialNodes.push({
            id: `category-${category}`,
            type: 'categoryLabel',
            position: { x: 50, y: firstBlockInCategory },
            selectable: false,
            draggable: false,
            data: {
              label: CATEGORY_DISPLAY_NAMES[category],
            },
          });
        }
      }
    });
    
    // Add component nodes based on layout
    categories.forEach((category) => {
      const components = getComponentsByCategory(category);
      
      components.forEach((component) => {
        const block = layout.blocks.find((b) => b.componentId === component.id);
        if (!block) return;
        
        const nodeId = component.id;
        
        // Add block node
        initialNodes.push({
          id: `block-${nodeId}`,
          type: 'block',
          position: { x: block.x - 20, y: block.y - 20 },
          selectable: false,
          draggable: false,
          zIndex: -1,
          data: {
            width: block.width + 40,
            height: block.height + 40,
          },
        });
        
        // Add base component node
        const node = {
          id: nodeId,
          type: 'componentNode',
          position: { x: block.x, y: block.y },
          data: {
            componentId: component.id,
            props: { ...component.defaultProps },
            label: component.displayName,
            category: category,
          },
        };
        
        addInstance({
          id: nodeId,
          componentId: component.id,
          props: { ...component.defaultProps },
        });
        
        initialNodes.push(node);
      });
    });
    
    setNodes(initialNodes);
    setCanvasNodes(initialNodes);
    setIsInitialized(true);
  }, []);

  // Sync nodes with canvas store (but don't reinitialize)
  useEffect(() => {
    if (!isInitialized) return;
    setNodes(canvasNodes);
  }, [canvasNodes, setNodes, isInitialized]);

  // Handle keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      // Undo/Redo
      if ((event.metaKey || event.ctrlKey) && event.key === 'z' && !event.shiftKey) {
        event.preventDefault();
        undo();
      }
      if ((event.metaKey || event.ctrlKey) && event.key === 'z' && event.shiftKey) {
        event.preventDefault();
        redo();
      }
      
      const selectedNodeId = useCanvasStore.getState().selectedNodeId;
      
      if (!selectedNodeId) return;
      
      // Delete key - only delete if panel is NOT open
      const isPanelOpen = useEditorStore.getState().isPanelOpen;
      const canvasState = useCanvasStore.getState();
      if (!isPanelOpen && (event.key === 'Delete' || event.key === 'Backspace')) {
        event.preventDefault();
        const node = canvasState.nodes.find((n: any) => n.id === selectedNodeId);
        if (node) {
          const componentId = (node.data as any)?.componentId;
          const groupNodes = canvasState.nodes.filter((n: any) => n.data?.componentId === componentId);
          
          // Check if trying to delete last instance
          if (groupNodes.length === 1 && node.id === componentId) {
            toast.error('Cannot delete the only instance of a component');
          } else {
            protectedDeleteNode(selectedNodeId);
          }
        }
      }
      
      // Cmd/Ctrl + D to duplicate
      if ((event.metaKey || event.ctrlKey) && event.key === 'd') {
        event.preventDefault();
        duplicateNode(selectedNodeId);
      }
    };
    
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [protectedDeleteNode, duplicateNode, undo, redo]);

  const onNodesChangeHandler = useCallback(
    (changes: any) => {
      onNodesChange(changes);
      const updatedNodes = nodes;
      setCanvasNodes(updatedNodes);
    },
    [onNodesChange, nodes, setCanvasNodes]
  );

  return (
    <div className="w-full h-screen">
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChangeHandler}
        onEdgesChange={onEdgesChange}
        nodeTypes={nodeTypes}
        fitView
        minZoom={0.1}
        maxZoom={4}
        panOnDrag
        panOnScroll
        panOnScrollSpeed={1.2}
        selectionOnDrag
        nodesDraggable
        zoomOnScroll
        zoomOnPinch
        nodesConnectable={false}
        elementsSelectable
        defaultEdgeOptions={{}}
        elevateNodesOnSelect
        proOptions={{ hideAttribution: true }}
        translateExtent={[[Number.NEGATIVE_INFINITY, Number.NEGATIVE_INFINITY],[Number.POSITIVE_INFINITY, Number.POSITIVE_INFINITY]]}
        onInit={(instance) => setRfInstance(instance)}
      >
        <Background variant={BackgroundVariant.Dots} gap={20} size={1} />
        <Controls>
          <ControlButton
            title="Toggle theme"
            onClick={() => {
              const next = (resolvedTheme ?? theme) === 'dark' ? 'light' : 'dark';
              setTheme(next);
            }}
            className="text-foreground hover:bg-accent"
          >
            {(resolvedTheme ?? theme) === 'dark' ? (
              <Sun className="h-4 w-4 text-black" />
            ) : (
              <Moon className="h-4 w-4 text-foreground" />
            )}
          </ControlButton>
        </Controls>
        <MiniMap
          nodeColor={(node) => {
            if (node.type === 'categoryLabel') return 'transparent';
            if (node.type === 'block') return 'transparent';
            return '#e5e7eb';
          }}
          maskColor="rgba(0, 0, 0, 0.1)"
        />
      </ReactFlow>
    </div>
  );
};

