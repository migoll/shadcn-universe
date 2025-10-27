'use client';

import { InfiniteCanvas } from '@/components/canvas/InfiniteCanvas';
import { PropertyPanel } from '@/components/editor/PropertyPanel';
import { ComponentLibrary } from '@/components/sidebar/ComponentLibrary';
import { CommandPalette } from '@/components/sidebar/CommandPalette';

export default function Home() {
  return (
    <div className="relative w-full h-screen overflow-hidden flex">
      <ComponentLibrary />
      <div className="flex-1 relative">
        <InfiniteCanvas />
        <PropertyPanel />
        <CommandPalette />
      </div>
    </div>
  );
}
