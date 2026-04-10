import { CPUModel } from '@/app/types/cpu';
import fs from 'fs';


// Add to cpu-data.ts
const data = fs.readFileSync('lib/cpu-data.ts', 'utf8');
// Append newModel to array
