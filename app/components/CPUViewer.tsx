'use client';

import { Canvas } from '@react-three/fiber';
import { OrbitControls, PerspectiveCamera, useGLTF, Html, Environment } from '@react-three/drei';
import { Suspense, useRef } from 'react';
import { CPUPart } from '@/app/types/cpu';
import type { GLTF } from 'three-stdlib';

interface Props {
  modelPath: string;
  parts: CPUPart[];
  showLabels: boolean;
  onPartClick: (part: CPUPart | null) => void;
  selectedPart: CPUPart | null;
  zoom: number;
  onZoomChange: (zoom: number) => void;
}

function Model({ url, onPartClick, parts }: any) {
  const gltf = useGLTF(url) as GLTF;
  
  return (
    <primitive 
      object={gltf.scene} 
      scale={0.8}
      position={[0, 0, 0]}
      onClick={(e: any) => {
        e.stopPropagation();
        const clickedName = e.object.name?.toLowerCase();
        const matchedPart = parts.find((p: CPUPart) => 
          clickedName?.includes(p.id) || p.name.toLowerCase().includes(clickedName)
        );
        onPartClick(matchedPart || null);
      }}
    />
  );
}

function LoadingFallback() {
  return (
    <Html center>
      <div className="bg-black/80 text-white px-4 py-2 rounded-lg">
        Loading 3D Model...
      </div>
    </Html>
  );
}

export default function CPUViewer({ 
  modelPath, 
  parts, 
  showLabels, 
  onPartClick, 
  selectedPart,
  zoom,
  onZoomChange 
}: Props) {
  const controlsRef = useRef<any>(null);

  const handleWheel = (e: WheelEvent) => {
    const delta = e.deltaY * -0.01;
    const newZoom = Math.max(0.001, Math.min(50, zoom + delta));
    onZoomChange(newZoom);
  };

  return (
    <div 
      className="w-full h-[600px] bg-gradient-to-b from-gray-800 to-gray-900 rounded-xl overflow-hidden border border-blue-500/30"
      onWheel={(e) => handleWheel(e.nativeEvent)}
    >
      <Canvas>
        <PerspectiveCamera 
          makeDefault 
          position={[0, 5, 15 / zoom]} 
          fov={60}
        />
        <OrbitControls 
          ref={controlsRef}
          enableDamping 
          dampingFactor={0.05}
          minDistance={0.1}
          maxDistance={200}
          enableZoom={true}
          zoomSpeed={2}
          enablePan={true}
          panSpeed={1}
          target={[0, 0, 0]}
        />
        
        <ambientLight intensity={0.6} />
        <directionalLight position={[10, 10, 5]} intensity={1.2} />
        <directionalLight position={[-10, -10, -5]} intensity={0.4} />
        <pointLight position={[0, 5, 0]} intensity={0.5} />
        
        <Environment preset="city" />
        
        <Suspense fallback={<LoadingFallback />}>
          <Model url={modelPath} onPartClick={onPartClick} parts={parts} />
        </Suspense>
        
        <gridHelper args={[10, 10, '#444444', '#222222']} />
      </Canvas>
    </div>
  );
}