'use client';

import React, { useCallback, useEffect } from 'react';
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

const CategoryLabelNode = ({ data }: any) => (
  <div className="text-lg font-bold text-foreground/80 uppercase tracking-wider pointer-events-none">
    {data.label}
  </div>
);

const nodeTypes: NodeTypes = {
  componentNode: ComponentNode,
  categoryLabel: CategoryLabelNode,
};

export const InfiniteCanvas: React.FC = () => {
  const { theme, setTheme, resolvedTheme } = useTheme();
  const [nodes, setNodes, onNodesChange] = useNodesState([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);
  
  const canvasNodes = useCanvasStore((state) => state.nodes);
  const setCanvasNodes = useCanvasStore((state) => state.setNodes);
  const protectedDeleteNode = useCanvasStore((state) => state.protectedDeleteNode);
  const duplicateNode = useCanvasStore((state) => state.duplicateNode);
  const setRfInstance = useCanvasStore((state) => state.setRfInstance);
  const undo = useCanvasStore((state) => state.undo);
  const redo = useCanvasStore((state) => state.redo);
  
  const addInstance = useComponentStore((state) => state.addInstance);

  // Initialize canvas with one base node per component, arranged in horizontal bands per category
  useEffect(() => {
    const categories = getAllCategories();
    const initialNodes: any[] = [];
    
    let yOffset = 50;
    
    categories.forEach((category) => {
      const components = getComponentsByCategory(category);
      let xOffset = 50;
      const categoryLabelY = yOffset - 20;
      
      // Add category label node
      const labelNode = {
        id: `category-${category}`,
        type: 'categoryLabel',
        position: { x: xOffset, y: categoryLabelY },
        selectable: false,
        draggable: false,
        data: {
          label: CATEGORY_DISPLAY_NAMES[category],
        },
      };
      initialNodes.push(labelNode);
      
      components.forEach((component) => {
        const nodeId = component.id; // stable id per component base
        
        const node = {
          id: nodeId,
          type: 'componentNode',
          position: { x: xOffset, y: yOffset },
          data: {
            componentId: component.id,
            props: { ...component.defaultProps },
            label: component.displayName,
            category: category,
          },
        };
        
        // Add to component store (base instance)
        addInstance({
          id: nodeId,
          componentId: component.id,
          props: { ...component.defaultProps },
        });
        
        initialNodes.push(node);
        
        xOffset += 200; // horizontal spacing between components in the band
      });
      
      // Move to next horizontal band for next category with more space for label
      yOffset += 250;
    });
    
    setNodes(initialNodes);
    setCanvasNodes(initialNodes);
  }, []);

  // Sync nodes with canvas store
  useEffect(() => {
    setNodes(canvasNodes);
  }, [canvasNodes, setNodes]);

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
            return '#e5e7eb';
          }}
          maskColor="rgba(0, 0, 0, 0.1)"
        />
      </ReactFlow>
    </div>
  );
};

