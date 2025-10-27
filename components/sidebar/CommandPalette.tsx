'use client';

import React, { useEffect, useState } from 'react';
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/components/ui/command';
import { COMPONENT_REGISTRY } from '@/lib/component-registry';
import { useCanvasStore } from '@/store/canvas-store';

export const CommandPalette: React.FC = () => {
  const [open, setOpen] = useState(false);
  const centerOnNode = useCanvasStore((state) => state.centerOnNode);

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((open) => !open);
      }
    };

    document.addEventListener('keydown', down);
    return () => document.removeEventListener('keydown', down);
  }, []);

  const handleAddComponent = (componentId: string) => {
    centerOnNode(componentId, { zoom: 1.0 });
    setOpen(false);
  };

  return (
    <CommandDialog open={open} onOpenChange={setOpen}>
      <CommandInput placeholder="Search components..." />
      <CommandList>
        <CommandEmpty>No components found.</CommandEmpty>
        <CommandGroup heading="Components">
          {COMPONENT_REGISTRY.map((component) => (
            <CommandItem
              key={component.id}
              onSelect={() => handleAddComponent(component.id)}
            >
              <span className="font-medium">{component.displayName}</span>
              <span className="ml-2 text-sm text-gray-500">
                {component.description}
              </span>
            </CommandItem>
          ))}
        </CommandGroup>
      </CommandList>
    </CommandDialog>
  );
};

