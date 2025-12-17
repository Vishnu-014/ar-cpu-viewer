import { CPUModel } from '@/app/types/cpu';

export const cpuModels: CPUModel[] = [
  {
    id: 'cpu-cooler',
    name: 'CPU Cooler Assembly',
    manufacturer: 'Generic',
    description:
      'High-performance CPU cooling solution with heat pipes and fan',
    fullModelPath: '/models/cpu_cooler.glb', // 👈 YOUR MODEL PATH HERE
    thumbnail: '/images/cpu-cooler.jpg',
    parts: [
      {
        id: 'fan',
        name: 'Cooling Fan',
        description: 'High-speed fan that pushes air through the heatsink fins',
        position: { x: 0, y: 1, z: 0 },
        color: '#333333',
      },
      {
        id: 'heatsink',
        name: 'Heatsink Fins',
        description: 'Aluminum fins that dissipate heat into the air',
        position: { x: 0, y: 0.5, z: 0 },
        color: '#c0c0c0',
      },
      {
        id: 'heatpipes',
        name: 'Heat Pipes',
        description: 'Copper tubes that transfer heat from base to fins',
        position: { x: 0, y: 0, z: 0 },
        color: '#b87333',
      },
      {
        id: 'base',
        name: 'Contact Base',
        description: 'Copper base plate that makes contact with CPU',
        position: { x: 0, y: -0.5, z: 0 },
        color: '#b87333',
      },
    ],
  },
  // You can add more models here later
];

export function getCPUModel(id: string): CPUModel | undefined {
  return cpuModels.find((model) => model.id === id);
}

export function getAllCPUModels(): CPUModel[] {
  return cpuModels;
}
