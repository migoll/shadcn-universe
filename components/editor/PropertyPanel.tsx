'use client';

import React from 'react';
import { X } from 'lucide-react';
import { useEditorStore } from '@/store/editor-store';
import { useComponentStore } from '@/store/component-store';
import { useCanvasStore } from '@/store/canvas-store';
import { getComponentById } from '@/lib/component-registry';
import { Button } from '@/components/ui/button';
import { PropEditor } from './PropEditor';
import { CodePreview } from './CodePreview';
import { cn } from '@/lib/utils';

export const PropertyPanel: React.FC = () => {
  const isPanelOpen = useEditorStore((state) => state.isPanelOpen);
  const selectedComponentId = useEditorStore((state) => state.selectedComponentId);
  const closePanel = useEditorStore((state) => state.closePanel);
  
  const getInstance = useComponentStore((state) => state.getInstance);
  const updateInstance = useComponentStore((state) => state.updateInstance);
  const updateNode = useCanvasStore((state) => state.updateNode);

  if (!isPanelOpen || !selectedComponentId) return null;

  const instance = getInstance(selectedComponentId);
  if (!instance) return null;

  const componentMetadata = getComponentById(instance.componentId);
  if (!componentMetadata) return null;

  const handlePropChange = (propName: string, value: any) => {
    const newProps = { ...instance.props, [propName]: value };
    updateInstance(selectedComponentId, newProps);
    
    // Update the node data as well
    updateNode(selectedComponentId, {
      data: {
        componentId: instance.componentId,
        props: newProps,
        label: componentMetadata.displayName,
      },
    });
  };

  const hasProps = (componentMetadata.props && componentMetadata.props.length > 0);

  return (
    <>
      {/* Backdrop */}
      <div
        className={cn(
          "fixed inset-0 bg-black/20 z-40 transition-opacity",
          isPanelOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        )}
        onClick={closePanel}
      />
      
      {/* Panel */}
      <div
        className={cn(
          "fixed right-0 top-0 h-full w-[450px] bg-white shadow-2xl z-50 transform transition-transform duration-300 ease-in-out flex flex-col",
          isPanelOpen ? "translate-x-0" : "translate-x-full"
        )}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b">
          <div>
            <h2 className="text-lg font-semibold">{componentMetadata.displayName}</h2>
            <p className="text-sm text-gray-500">{componentMetadata.description}</p>
          </div>
          <Button
            variant="ghost"
            size="icon"
            onClick={closePanel}
          >
            <X className="h-4 w-4" />
          </Button>
        </div>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto p-4 space-y-6">
          {/* Properties Section */}
          {hasProps && (
            <div>
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-sm font-semibold text-gray-700 uppercase tracking-wide">
                  Properties
                </h3>
                <div className="flex items-center gap-2">
                  <Button variant="outline" size="sm" onClick={() => {
                    // reset to defaults
                    const defaults = componentMetadata.defaultProps ?? {};
                    Object.keys(defaults).forEach((key) => handlePropChange(key, defaults[key]));
                  }}>Reset to defaults</Button>
                  <Button variant="ghost" size="icon" onClick={() => {
                    // simple revert one step: noop for now; history will handle in later step
                    window.dispatchEvent(new CustomEvent('editor:revert'));
                  }}>↩</Button>
                </div>
              </div>
              <div className="space-y-3">
                {componentMetadata.props.map((prop) => (
                  <PropEditor
                    key={prop.name}
                    prop={prop}
                    value={instance.props[prop.name] ?? prop.default}
                    onChange={(value) => handlePropChange(prop.name, value)}
                  />
                ))}
              </div>
            </div>
          )}

          {/* Code Export Section */}
          <div>
            <h3 className="text-sm font-semibold mb-3 text-gray-700 uppercase tracking-wide">
              Export Code
            </h3>
            <CodePreview
              componentMetadata={componentMetadata}
              props={instance.props}
            />
          </div>
        </div>
      </div>
    </>
  );
};

