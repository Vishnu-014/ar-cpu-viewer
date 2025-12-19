import { CPUModel } from '@/app/types/cpu';

export const cpuModels: CPUModel[] = [
  {
    id: 'cpu-cooler',
    name: 'CPU Cooler Assembly',
    manufacturer: 'Generic',
    description:
      'High-performance CPU cooling solution with heat pipes and fan',
    fullModelPath: '/models/cpu_cooler.glb',
    thumbnail: '/thumbnail/cooler.png',
    parts: [],
  },
  {
    id: 'motherboard',
    name: 'Motherboard',
    manufacturer: 'Generic',
    description: 'motherboard',
    fullModelPath: '/models/motherboard.glb',
    thumbnail: '/thumbnail/motherboard.png',
    parts: [],
  },
  {
    id: 'RetroPC.fbx',
    name: 'Retro PC',
    manufacturer: 'Generic',
    description: 'Retro PC',
    fullModelPath: '/models/RetroPC.glb',
    thumbnail: '/thumbnail/retro.png',
    parts: [],
  },
];

export function getCPUModel(id: string): CPUModel | undefined {
  return cpuModels.find((model) => model.id === id);
}

export function getAllCPUModels(): CPUModel[] {
  return cpuModels;
}
