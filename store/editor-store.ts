import { create } from 'zustand';

export type ExportFramework = 'react' | 'vue';
export type ExportStyling = 'tailwind' | 'css';

interface EditorState {
  isPanelOpen: boolean;
  selectedComponentId: string | null;
  exportFramework: ExportFramework;
  exportStyling: ExportStyling;
  
  openPanel: (componentId: string) => void;
  closePanel: () => void;
  setExportFramework: (framework: ExportFramework) => void;
  setExportStyling: (styling: ExportStyling) => void;
}

export const useEditorStore = create<EditorState>((set) => ({
  isPanelOpen: false,
  selectedComponentId: null,
  exportFramework: 'react',
  exportStyling: 'tailwind',
  
  openPanel: (componentId) => set({ 
    isPanelOpen: true, 
    selectedComponentId: componentId 
  }),
  
  closePanel: () => set({ 
    isPanelOpen: false, 
    selectedComponentId: null 
  }),
  
  setExportFramework: (framework) => set({ exportFramework: framework }),
  
  setExportStyling: (styling) => set({ exportStyling: styling }),
}));

