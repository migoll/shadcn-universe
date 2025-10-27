import { create } from 'zustand';

export interface ComponentInstance {
  id: string;
  componentId: string;
  props: Record<string, any>;
}

interface ComponentState {
  instances: ComponentInstance[];
  
  addInstance: (instance: ComponentInstance) => void;
  updateInstance: (id: string, props: Record<string, any>) => void;
  deleteInstance: (id: string) => void;
  getInstance: (id: string) => ComponentInstance | undefined;
}

export const useComponentStore = create<ComponentState>((set, get) => ({
  instances: [],
  
  addInstance: (instance) => set((state) => ({
    instances: [...state.instances, instance]
  })),
  
  updateInstance: (id, props) => set((state) => ({
    instances: state.instances.map((inst) =>
      inst.id === id ? { ...inst, props: { ...inst.props, ...props } } : inst
    ),
  })),
  
  deleteInstance: (id) => set((state) => ({
    instances: state.instances.filter((inst) => inst.id !== id)
  })),
  
  getInstance: (id) => {
    return get().instances.find((inst) => inst.id === id);
  },
}));

