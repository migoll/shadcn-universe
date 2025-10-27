'use client';

import React from 'react';
import { PropDefinition } from '@/lib/component-registry';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Slider } from '@/components/ui/slider';

interface PropEditorProps {
  prop: PropDefinition;
  value: any;
  onChange: (value: any) => void;
}

export const PropEditor: React.FC<PropEditorProps> = ({ prop, value, onChange }) => {
  const renderEditor = () => {
    switch (prop.type) {
      case 'string':
        return (
          <Input
            value={value || ''}
            onChange={(e) => onChange(e.target.value)}
            placeholder={prop.description}
          />
        );
      
      case 'number':
        return (
          <div className="space-y-2">
            <Input
              type="number"
              value={value ?? prop.default ?? 0}
              onChange={(e) => onChange(Number(e.target.value))}
            />
            <Slider
              value={[value ?? prop.default ?? 0]}
              onValueChange={(vals) => onChange(vals[0])}
              min={0}
              max={100}
              step={1}
              className="w-full"
            />
          </div>
        );
      
      case 'boolean':
        return (
          <div className="flex items-center space-x-2">
            <Switch
              checked={value ?? false}
              onCheckedChange={onChange}
              id={`switch-${prop.name}`}
            />
            <Label htmlFor={`switch-${prop.name}`} className="text-sm">
              {value ? 'Enabled' : 'Disabled'}
            </Label>
          </div>
        );
      
      case 'enum':
        return (
          <Select value={value || prop.default} onValueChange={onChange}>
            <SelectTrigger>
              <SelectValue placeholder={`Select ${prop.name}`} />
            </SelectTrigger>
            <SelectContent>
              {prop.options?.map((option) => (
                <SelectItem key={option} value={option}>
                  {option}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        );
      
      case 'color':
        return (
          <div className="flex gap-2">
            <Input
              type="color"
              value={value || '#000000'}
              onChange={(e) => onChange(e.target.value)}
              className="w-16 h-10 p-1"
            />
            <Input
              type="text"
              value={value || '#000000'}
              onChange={(e) => onChange(e.target.value)}
              placeholder="#000000"
            />
          </div>
        );
      
      default:
        return (
          <Input
            value={value || ''}
            onChange={(e) => onChange(e.target.value)}
          />
        );
    }
  };

  return (
    <div className="space-y-2">
      <Label className="text-sm font-medium capitalize">
        {prop.name.replace(/([A-Z])/g, ' $1').trim()}
      </Label>
      {renderEditor()}
      {prop.description && (
        <p className="text-xs text-gray-500">{prop.description}</p>
      )}
    </div>
  );
};

