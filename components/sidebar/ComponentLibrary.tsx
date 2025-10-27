'use client';

import React, { useState } from 'react';
import { Search, ChevronRight, ChevronDown } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Button } from '@/components/ui/button';
import { 
  COMPONENT_REGISTRY, 
  getAllCategories, 
  getComponentsByCategory,
  CATEGORY_DISPLAY_NAMES,
  ComponentCategory 
} from '@/lib/component-registry';
import { useCanvasStore } from '@/store/canvas-store';
import { cn } from '@/lib/utils';

export const ComponentLibrary: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedCategories, setExpandedCategories] = useState<Set<ComponentCategory>>(
    new Set(getAllCategories())
  );
  
  const centerOnNode = useCanvasStore((state) => state.centerOnNode);

  const toggleCategory = (category: ComponentCategory) => {
    const newExpanded = new Set(expandedCategories);
    if (newExpanded.has(category)) {
      newExpanded.delete(category);
    } else {
      newExpanded.add(category);
    }
    setExpandedCategories(newExpanded);
  };

  const handleNavigateToComponent = (componentId: string) => {
    centerOnNode(componentId, { zoom: 1.0 });
  };

  const filteredComponents = COMPONENT_REGISTRY.filter((component) =>
    component.displayName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    component.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const categories = getAllCategories();

  return (
    <div className="w-64 h-screen bg-background border-r border-border flex flex-col">
      {/* Header */}
      <div className="p-4 border-b border-border">
        <h2 className="text-xl font-semibold mb-3 text-foreground">Components</h2>
        <div className="relative">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search components..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-8"
          />
        </div>
      </div>

      {/* Component List */}
      <ScrollArea className="flex-1 min-h-0">
        <div className="p-2">
          {searchQuery ? (
            // Show filtered results
            <div className="space-y-1">
              {filteredComponents.map((component) => (
                <Button
                  key={component.id}
                  variant="ghost"
                  className="w-full justify-start text-base"
                  onClick={() => handleNavigateToComponent(component.id)}
                >
                  <span className="truncate">{component.displayName}</span>
                </Button>
              ))}
            </div>
          ) : (
            // Show by category
            categories.map((category) => {
              const components = getComponentsByCategory(category);
              const isExpanded = expandedCategories.has(category);
              
              return (
                <div key={category} className="mb-2">
                  <button
                    onClick={() => toggleCategory(category)}
                    className="w-full flex items-center justify-between px-2 py-1.5 hover:bg-accent hover:text-accent-foreground rounded text-base font-medium text-foreground"
                  >
                    <span>{CATEGORY_DISPLAY_NAMES[category]}</span>
                    {isExpanded ? (
                      <ChevronDown className="h-4 w-4" />
                    ) : (
                      <ChevronRight className="h-4 w-4" />
                    )}
                  </button>
                  
                  {isExpanded && (
                    <div className="ml-2 mt-1 space-y-0.5">
                      {components.map((component) => (
                        <Button
                          key={component.id}
                          variant="ghost"
                          size="sm"
                          className="w-full justify-start text-sm font-normal"
                          onClick={() => handleNavigateToComponent(component.id)}
                        >
                          {component.displayName}
                        </Button>
                      ))}
                    </div>
                  )}
                </div>
              );
            })
          )}
        </div>
      </ScrollArea>
    </div>
  );
};

