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
  {
    id: 'insta360_link_2_4k_ai_webcam.glb',
    name: 'Insta 360',
    manufacturer: 'Generic',
    description: 'insta360_link_2_4k_ai_webcam.glb',
    fullModelPath: '/models/insta360_link_2_4k_ai_webcam.glb',
    thumbnail: '/thumbnail/insta.jpeg',
    parts: [],
  },
  {
    id: 'keyboard_ugreen_k371.glb',
    name: 'Keyboard',
    manufacturer: 'Generic',
    description: 'Keyboard',
    fullModelPath: '/models/keyboard_ugreen_k371.glb',
    thumbnail: '/thumbnail/key.jpeg',
    parts: [],
  },
  {
    id: 'lowpoly_audio_speaker.glb',
    name: 'Speaker',
    manufacturer: 'Generic',
    description: 'Speaker',
    fullModelPath: '/models/lowpoly_audio_speaker.glb',
    thumbnail: '/thumbnail/speaker.jpeg',
    parts: [],
  },
  {
    id: 'male_hdmi_connector.glb',
    name: 'HDMI',
    manufacturer: 'Generic',
    description: 'HDMI',
    fullModelPath: '/models/male_hdmi_connector.glb',
    thumbnail: '/thumbnail/hdmi.png',
    parts: [],
  },
  {
    id: 'msi_b550_gaming_plus.glb',
    name: 'MSI',
    manufacturer: 'Generic',
    description: 'MSI',
    fullModelPath: '/models/msi_b550_gaming_plus.glb',
    thumbnail: '/thumbnail/msi.jpeg',
    parts: [],
  },
];

export function getCPUModel(id: string): CPUModel | undefined {
  return cpuModels.find((model) => model.id === id);
}

export function getAllCPUModels(): CPUModel[] {
  return cpuModels;
}
