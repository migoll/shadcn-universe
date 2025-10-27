'use client';

import React, { useState } from 'react';
import { Copy, Check } from 'lucide-react';
import { ComponentMetadata } from '@/lib/component-registry';
import { useEditorStore } from '@/store/editor-store';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { generateReactCode } from '@/components/exporters/ReactExporter';
import { generateVueCode } from '@/components/exporters/VueExporter';

interface CodePreviewProps {
  componentMetadata: ComponentMetadata;
  props: Record<string, any>;
}

export const CodePreview: React.FC<CodePreviewProps> = ({ componentMetadata, props }) => {
  const [copied, setCopied] = useState(false);
  const exportFramework = useEditorStore((state) => state.exportFramework);
  const exportStyling = useEditorStore((state) => state.exportStyling);
  const setExportFramework = useEditorStore((state) => state.setExportFramework);
  const setExportStyling = useEditorStore((state) => state.setExportStyling);

  const generateCode = () => {
    if (exportFramework === 'react') {
      return generateReactCode(componentMetadata, props, exportStyling);
    } else if (exportFramework === 'vue') {
      return generateVueCode(componentMetadata, props, exportStyling);
    }
    return '';
  };

  const code = generateCode();

  const handleCopy = async () => {
    await navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-3">
      {/* Framework and Styling Selectors */}
      <div className="grid grid-cols-2 gap-2">
        <div>
          <label className="text-xs font-medium mb-1 block">Framework</label>
          <Select value={exportFramework} onValueChange={(val: any) => setExportFramework(val)}>
            <SelectTrigger className="h-9">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="react">React</SelectItem>
              <SelectItem value="vue">Vue</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        <div>
          <label className="text-xs font-medium mb-1 block">Styling</label>
          <Select value={exportStyling} onValueChange={(val: any) => setExportStyling(val)}>
            <SelectTrigger className="h-9">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="tailwind">Tailwind</SelectItem>
              <SelectItem value="css">CSS</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Code Display */}
      <div className="relative">
        <pre className="bg-gray-900 text-gray-100 p-4 rounded-lg text-xs overflow-x-auto max-h-[300px] overflow-y-auto">
          <code>{code}</code>
        </pre>
        <Button
          size="sm"
          variant="secondary"
          className="absolute top-2 right-2"
          onClick={handleCopy}
        >
          {copied ? (
            <>
              <Check className="h-3 w-3 mr-1" />
              Copied
            </>
          ) : (
            <>
              <Copy className="h-3 w-3 mr-1" />
              Copy
            </>
          )}
        </Button>
      </div>
    </div>
  );
};

