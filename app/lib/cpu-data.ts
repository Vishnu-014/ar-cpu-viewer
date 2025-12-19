import { CPUModel } from '@/app/types/cpu';

export const cpuModels: CPUModel[] = [
  {
    id: 'cpu-cooler',
    name: 'CPU Cooler Assembly',
    manufacturer: 'Generic',
    description:
      'High-performance CPU cooling solution with heat pipes and fan',
    fullModelPath: '/models/cpu_cooler.glb',
    thumbnail: '/images/cpu-cooler.jpg',
    parts: [],
  },
  {
    id: 'motherboard',
    name: 'Motherboard',
    manufacturer: 'Generic',
    description: 'motherboard',
    fullModelPath: '/models/motherboard_components.glb',
    thumbnail: '/images/cpu-cooler.jpg',
    parts: [],
  },
  {
    id: 'RetroPC.fbx',
    name: 'RetroPC.fbx',
    manufacturer: 'Generic',
    description: 'RetroPC.fbx',
    fullModelPath: '/models/RetroPC.glb',
    thumbnail: '/images/cpu-cooler.jpg',
    parts: [],
  },
];

export function getCPUModel(id: string): CPUModel | undefined {
  return cpuModels.find((model) => model.id === id);
}

export function getAllCPUModels(): CPUModel[] {
  return cpuModels;
}
