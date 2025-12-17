import { CPUModel } from '@/app/types/cpu';
import fs from 'fs';

const newModel: CPUModel = {
  id: 'new-cpu',
  name: 'New CPU Model',
  manufacturer: 'AMD',
  description: 'AMD',
  fullModelPath: '/models/new-cpu.glb',
  thumbnail: '/images/new-cpu.jpg',
  parts: [
    // Define parts here
  ],
};

// Add to cpu-data.ts
const data = fs.readFileSync('lib/cpu-data.ts', 'utf8');
// Append newModel to array
