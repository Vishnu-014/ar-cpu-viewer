export interface CPUPart {
  id: string;
  name: string;
  description: string;
  position: { x: number; y: number; z: number };
  rotation?: { x: number; y: number; z: number };
  color: string;
  modelPath?: string;
}

export interface CPUModel {
  id: string;
  name: string;
  manufacturer: string;
  description: string;
  parts: CPUPart[];
  fullModelPath: string;
  thumbnail: string;
}
