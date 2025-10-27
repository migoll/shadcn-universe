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
import { COMPONENT_REGISTRY, getAllCategories, getComponentsByCategory } from '@/lib/component-registry';

const nodeTypes: NodeTypes = {
  componentNode: ComponentNode,
};

export const InfiniteCanvas: React.FC = () => {
  const { theme, setTheme, resolvedTheme } = useTheme();
  const [nodes, setNodes, onNodesChange] = useNodesState([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);
  
  const canvasNodes = useCanvasStore((state) => state.nodes);
  const setCanvasNodes = useCanvasStore((state) => state.setNodes);
  const deleteNode = useCanvasStore((state) => state.deleteNode);
  const duplicateNode = useCanvasStore((state) => state.duplicateNode);
  const setRfInstance = useCanvasStore((state) => state.setRfInstance);
  
  const addInstance = useComponentStore((state) => state.addInstance);

  // Initialize canvas with one base node per component, arranged in horizontal bands per category
  useEffect(() => {
    const categories = getAllCategories();
    const initialNodes: any[] = [];
    
    let yOffset = 50;
    
    categories.forEach((category) => {
      const components = getComponentsByCategory(category);
      let xOffset = 50;
      
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
          },
        };
        
        // Add to component store (base instance)
        addInstance({
          id: nodeId,
          componentId: component.id,
          props: { ...component.defaultProps },
        });
        
        initialNodes.push(node);
        
        xOffset += 450; // horizontal spacing between components in the band
      });
      
      // Move to next horizontal band for next category
      yOffset += 350;
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
      const selectedNodeId = useCanvasStore.getState().selectedNodeId;
      
      if (!selectedNodeId) return;
      
      // Delete key
      if (event.key === 'Delete' || event.key === 'Backspace') {
        event.preventDefault();
        deleteNode(selectedNodeId);
      }
      
      // Cmd/Ctrl + D to duplicate
      if ((event.metaKey || event.ctrlKey) && event.key === 'd') {
        event.preventDefault();
        duplicateNode(selectedNodeId);
      }
    };
    
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [deleteNode, duplicateNode]);

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
        selectionOnDrag
        nodesDraggable
        nodesConnectable={false}
        elementsSelectable
        defaultEdgeOptions={{}}
        elevateNodesOnSelect
        proOptions={{ hideAttribution: true }}
        translateExtent={[[Number.NEGATIVE_INFINITY, Number.NEGATIVE_INFINITY],[Number.POSITIVE_INFINITY, Number.POSITIVE_INFINITY]]}
        domNodeId="rf-canvas"
        onInit={(instance) => setRfInstance(instance)}
        dragHandle={'.drag-handle'}
      >
        <Background variant={BackgroundVariant.Dots} gap={20} size={1} />
        <Controls>
          <ControlButton
            title="Toggle theme"
            onClick={() => {
              const next = (resolvedTheme ?? theme) === 'dark' ? 'light' : 'dark';
              setTheme(next);
            }}
          >
            {(resolvedTheme ?? theme) === 'dark' ? (
              <Sun className="h-4 w-4" />
            ) : (
              <Moon className="h-4 w-4" />
            )}
          </ControlButton>
        </Controls>
        <MiniMap
          nodeColor={(node) => {
            return '#e5e7eb';
          }}
          maskColor="rgba(0, 0, 0, 0.1)"
        />
      </ReactFlow>
    </div>
  );
};

