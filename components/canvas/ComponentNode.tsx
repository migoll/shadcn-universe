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
    <div className="group">
      {/* Drag handle bar */}
      <div
        className={cn(
          'drag-handle inline-flex items-center gap-2 px-2 py-1 rounded border',
          selected ? 'border-blue-500 bg-blue-50 text-blue-700' : 'border-transparent bg-transparent text-gray-500'
        )}
        onClick={(e) => e.stopPropagation()}
      >
        <span className="text-[10px] uppercase tracking-wide font-semibold">{data.label}</span>
        {/* Hover + button */}
        <button
          className="ml-2 hidden group-hover:inline-flex items-center justify-center w-4 h-4 rounded bg-purple-600 text-white text-[10px]"
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
      </div>

      {/* Tiny menu for Default/Duplicate */}
      <div
        id={`variant-menu-${id}`}
        className="hidden absolute z-50 mt-1 rounded border bg-white shadow"
        onMouseLeave={(e) => (e.currentTarget.classList.add('hidden'))}
      >
        <button
          className="block w-full px-2 py-1 text-xs hover:bg-gray-100"
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
          className="block w-full px-2 py-1 text-xs hover:bg-gray-100"
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

      {/* Interactive content */}
      <div className="mt-2 cursor-pointer" onClick={handleClick}>
        <ComponentRenderer componentId={data.componentId} props={data.props} />
      </div>
    </div>
  );
};

