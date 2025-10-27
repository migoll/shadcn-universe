import { create } from 'zustand';
import { Edge, Node, ReactFlowInstance, Viewport } from 'reactflow';

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
  duplicateNode: (nodeId: string) => void;
  centerOnNode: (nodeId: string, options?: { zoom?: number }) => void;
  addVariant: (
    componentId: string,
    mode: 'default' | 'duplicate',
    fromNodeId?: string
  ) => void;
}

export const useCanvasStore = create<CanvasState>((set, get) => ({
  nodes: [],
  edges: [],
  viewport: { x: 0, y: 0, zoom: 1 },
  selectedNodeId: null,
  rfInstance: null,

  setNodes: (nodes) => set({ nodes }),
  
  setEdges: (edges) => set({ edges }),
  
  setViewport: (viewport) => set({ viewport }),
  
  setRfInstance: (instance) => set({ rfInstance: instance }),
  
  selectNode: (nodeId) => set({ selectedNodeId: nodeId }),
  
  addNode: (node) => set((state) => ({ 
    nodes: [...state.nodes, node] 
  })),
  
  updateNode: (nodeId, updates) => set((state) => ({
    nodes: state.nodes.map((node) =>
      node.id === nodeId ? { ...node, ...updates } : node
    ),
  })),
  
  deleteNode: (nodeId) => set((state) => ({
    nodes: state.nodes.filter((node) => node.id !== nodeId),
    selectedNodeId: state.selectedNodeId === nodeId ? null : state.selectedNodeId,
  })),
  
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

    // Compute new id and position (64px gap like Figma)
    const variantIndex = groupNodes.filter((n) => n.id.startsWith(`${componentId}-variant-`)).length + 1;
    const newId = `${componentId}-variant-${variantIndex}`;
    const newNode: Node = {
      id: newId,
      type: 'componentNode',
      position: { x: lastNode.position.x + 64 + 350, y: baseNode.position.y },
      data: {
        componentId,
        props: { ...(sourceNode as any).data?.props },
        label: `${(baseNode as any).data?.label} • Variant ${variantIndex}`,
      },
    } as any;

    return { nodes: [...state.nodes, newNode] };
  }),
}));

