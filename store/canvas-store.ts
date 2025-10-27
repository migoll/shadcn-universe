import { create } from 'zustand';
import { Edge, Node, ReactFlowInstance, Viewport } from 'reactflow';
import { subscribeWithSelector } from 'zustand/middleware';
import { COMPONENT_REGISTRY } from '@/lib/component-registry';
import { getVariantPositions } from '@/lib/layout-calculator';

interface CanvasState {
  nodes: Node[];
  edges: Edge[];
  viewport: Viewport;
  selectedNodeId: string | null;
  rfInstance: ReactFlowInstance | null;
  
  setNodes: (nodes: Node[]) => void;
  setEdges: (edges: Edge[]) => void;
  setViewport: (viewport: Viewport) => void;
  setRfInstance: (instance: ReactFlowInstance) => void;
  selectNode: (nodeId: string | null) => void;
  addNode: (node: Node) => void;
  updateNode: (nodeId: string, updates: Partial<Node>) => void;
  deleteNode: (nodeId: string) => void;
  protectedDeleteNode: (nodeId: string) => void;
  duplicateNode: (nodeId: string) => void;
  centerOnNode: (nodeId: string, options?: { zoom?: number }) => void;
  addVariant: (
    componentId: string,
    mode: 'default' | 'duplicate',
    fromNodeId?: string
  ) => void;
  
  // History
  history: Node[][];
  historyIndex: number;
  pushHistory: () => void;
  undo: () => void;
  redo: () => void;
}

export const useCanvasStore = create<CanvasState>()(
  subscribeWithSelector((set, get) => ({
  nodes: [],
  edges: [],
  viewport: { x: 0, y: 0, zoom: 1 },
  selectedNodeId: null,
  rfInstance: null,
  
  // History
  history: [],
  historyIndex: -1,
  
  pushHistory: () => set((state) => {
    const newHistory = state.history.slice(0, state.historyIndex + 1);
    newHistory.push(JSON.parse(JSON.stringify(state.nodes)));
    return {
      history: newHistory,
      historyIndex: newHistory.length - 1
    };
  }),
  
  undo: () => set((state) => {
    if (state.historyIndex > 0) {
      return {
        nodes: JSON.parse(JSON.stringify(state.history[state.historyIndex - 1])),
        historyIndex: state.historyIndex - 1
      };
    }
    return state;
  }),
  
  redo: () => set((state) => {
    if (state.historyIndex < state.history.length - 1) {
      return {
        nodes: JSON.parse(JSON.stringify(state.history[state.historyIndex + 1])),
        historyIndex: state.historyIndex + 1
      };
    }
    return state;
  }),

  setNodes: (nodes) => set({ nodes }),
  
  setEdges: (edges) => set({ edges }),
  
  setViewport: (viewport) => set({ viewport }),
  
  setRfInstance: (instance) => set({ rfInstance: instance }),
  
  selectNode: (nodeId) => set({ selectedNodeId: nodeId }),
  
  addNode: (node) => set((state) => ({ 
    nodes: [...state.nodes, node] 
  })),
  
  updateNode: (nodeId, updates) => set((state) => {
    const newNodes = state.nodes.map((node) =>
      node.id === nodeId ? { ...node, ...updates } : node
    );
    // Push to history
    state.pushHistory();
    return { nodes: newNodes };
  }),
  
  deleteNode: (nodeId) => set((state) => ({
    nodes: state.nodes.filter((node) => node.id !== nodeId),
    selectedNodeId: state.selectedNodeId === nodeId ? null : state.selectedNodeId,
  })),
  
  protectedDeleteNode: (nodeId) => set((state) => {
    const node = state.nodes.find(n => n.id === nodeId);
    if (!node) return state;
    
    // Find component group
    const componentId = (node.data as any)?.componentId;
    const groupNodes = state.nodes.filter(
      (n: any) => n.data?.componentId === componentId
    );
    
    // If this is the ONLY instance (base node without variants), prevent deletion
    if (groupNodes.length === 1 && node.id === componentId) {
      // Return it to defaults instead
      const componentMetadata = COMPONENT_REGISTRY.find(c => c.id === componentId);
      if (componentMetadata) {
        const newNodes = state.nodes.map(n => 
          n.id === nodeId 
            ? { ...n, data: { ...n.data, props: { ...componentMetadata.defaultProps } } }
            : n
        );
        return { nodes: newNodes };
      }
      // If no metadata found, just prevent deletion
      return state;
    }
    
    // Otherwise delete normally
    return {
      nodes: state.nodes.filter((node) => node.id !== nodeId),
      selectedNodeId: state.selectedNodeId === nodeId ? null : state.selectedNodeId,
    };
  }),
  
  duplicateNode: (nodeId) => set((state) => {
    const nodeToDuplicate = state.nodes.find((node) => node.id === nodeId);
    if (!nodeToDuplicate) return state;
    
    const newNode: Node = {
      ...nodeToDuplicate,
      id: `${nodeToDuplicate.id}-copy-${Date.now()}`,
      position: {
        x: nodeToDuplicate.position.x + 50,
        y: nodeToDuplicate.position.y + 50,
      },
    };
    
    return { nodes: [...state.nodes, newNode] };
  }),

  centerOnNode: (nodeId, options) => {
    const { rfInstance, nodes } = get();
    if (!rfInstance) return;
    const node = nodes.find((n) => n.id === nodeId);
    if (!node) return;
    const zoom = options?.zoom ?? 1.0;
    // Center on node's position + half of its approximate size
    rfInstance.setCenter(node.position.x + 150, node.position.y + 80, {
      zoom,
      duration: 500,
    });
  },

  addVariant: (componentId, mode, fromNodeId) => set((state) => {
    // Group nodes by componentId in their data
    const groupNodes = state.nodes.filter(
      (n: any) => n.data?.componentId === componentId
    );
    if (groupNodes.length === 0) return state;

    // Base is the node whose id equals componentId
    const baseNode = groupNodes.find((n) => n.id === componentId) ?? groupNodes[0];
    const lastNode = groupNodes.reduce((acc, n) => (n.position.x > acc.position.x ? n : acc), baseNode);

    const sourceNode = mode === 'duplicate'
      ? (state.nodes.find((n) => n.id === (fromNodeId ?? lastNode.id)) ?? baseNode)
      : baseNode;

    // Compute new id and position (32px gap)
    const variantIndex = groupNodes.filter((n) => n.id.startsWith(`${componentId}-variant-`)).length + 1;
    const newId = `${componentId}-variant-${variantIndex}`;
    
    // Use the layout calculator to get proper positioning
    const componentMetadata = COMPONENT_REGISTRY.find(c => c.id === componentId);
    const estimatedWidth = componentMetadata ? 200 : 180; // Default component width
    
    const newNode: Node = {
      id: newId,
      type: 'componentNode',
      position: { 
        x: lastNode.position.x + estimatedWidth + 32, 
        y: baseNode.position.y 
      },
      data: {
        componentId,
        props: { ...(sourceNode as any).data?.props },
        label: `${(baseNode as any).data?.label} • Variant ${variantIndex}`,
      },
    } as any;

    const newNodes = [...state.nodes, newNode];
    // Push to history
    state.pushHistory();
    return { nodes: newNodes };
  }),
})));

