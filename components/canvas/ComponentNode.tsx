'use client';

import React from 'react';
import { Handle, Position, NodeProps } from 'reactflow';
import { ComponentRenderer } from './ComponentRenderer';
import { useCanvasStore } from '@/store/canvas-store';
import { useEditorStore } from '@/store/editor-store';
import { cn } from '@/lib/utils';

export interface ComponentNodeData {
  componentId: string;
  props: Record<string, any>;
  label: string;
}

export const ComponentNode: React.FC<NodeProps<ComponentNodeData>> = ({ id, data, selected }) => {
  const selectNode = useCanvasStore((state) => state.selectNode);
  const openPanel = useEditorStore((state) => state.openPanel);
  const addVariant = useCanvasStore((state) => state.addVariant);

  const handleClick = () => {
    selectNode(id);
    openPanel(id);
  };

  return (
    <div className="group relative">
      {/* Floating label - left aligned on top */}
      <div
        className={cn(
          'absolute -top-8 left-0 text-sm uppercase tracking-wide font-semibold text-foreground/50 mb-2',
        )}
      >
        {data.label.replace(' • Variant 1', '').replace(' • Variant 2', '').replace(' • Variant 3', '').replace(' • Variant 4', '').replace(' • Variant 5', '')}
      </div>
      
      {/* Hover + button - positioned to the right of component */}
      <button
        className="absolute -right-3 top-1/2 -translate-y-1/2 hidden group-hover:inline-flex items-center justify-center w-6 h-6 rounded-full bg-purple-600 text-white text-sm z-10 shadow-lg"
        title="Add variant"
        onClick={(e) => {
          e.stopPropagation();
          const menu = document.getElementById(`variant-menu-${id}`);
          if (menu) {
            menu.classList.remove('hidden');
          }
        }}
      >
        +
      </button>

      {/* Dropdown menu for Default/Duplicate - positioned to right of component */}
      <div
        id={`variant-menu-${id}`}
        className="hidden absolute -right-2 top-1/2 -translate-y-1/2 z-50 bg-background border border-border rounded shadow-lg"
        onMouseLeave={(e) => (e.currentTarget.classList.add('hidden'))}
      >
        <button
          className="block w-full px-3 py-2 text-sm text-foreground hover:bg-accent hover:text-accent-foreground border-b border-border first:rounded-t last:rounded-b first:border-b-0"
          onClick={(e) => {
            e.stopPropagation();
            addVariant(data.componentId, 'default', id);
            const menu = document.getElementById(`variant-menu-${id}`);
            if (menu) menu.classList.add('hidden');
          }}
        >
          Default
        </button>
        <button
          className="block w-full px-3 py-2 text-sm text-foreground hover:bg-accent hover:text-accent-foreground rounded-b"
          onClick={(e) => {
            e.stopPropagation();
            addVariant(data.componentId, 'duplicate', id);
            const menu = document.getElementById(`variant-menu-${id}`);
            if (menu) menu.classList.add('hidden');
          }}
        >
          Duplicate
        </button>
      </div>

      {/* Interactive content with drag handle */}
      <div className="relative">
        <div className="drag-handle absolute inset-0 cursor-move" />
        <div className="cursor-pointer" onClick={handleClick}>
          <ComponentRenderer componentId={data.componentId} props={data.props} />
        </div>
      </div>
    </div>
  );
};

