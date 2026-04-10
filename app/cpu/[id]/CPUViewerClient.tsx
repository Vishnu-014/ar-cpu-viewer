'use client';

import { useState } from 'react';
import { CPUModel, CPUPart } from '@/app/types/cpu';
import CPUViewer from '@/app/components/CPUViewer';
import ARButton from '@/app/components/ARButton';
import PartInfo from '@/app/components/PartInfo';
import { Eye, EyeOff, ZoomIn, ZoomOut, Info, Home } from 'lucide-react';

interface Props {
  cpu: CPUModel;
  cpuId: string;
}

export default function CPUViewerClient({ cpu, cpuId }: Props) {
  const [selectedPart, setSelectedPart] = useState<CPUPart | null>(null);
  const [showLabels, setShowLabels] = useState(true);
  const [zoom, setZoom] = useState(0.1);

  const handleZoomIn = () => {
    setZoom(Math.min(50, zoom + 1));
  };

  const handleZoomOut = () => {
    setZoom(Math.max(0.001, zoom - 0.05));
  };

  const handleReset = () => {
    setZoom(0.1);
  };

  return (
    <main className="max-w-7xl mx-auto px-4 py-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-white mb-2">{cpu.name}</h1>
        <p className="text-gray-400">
          {cpu.manufacturer} • {cpu.parts.length} Components
        </p>
        <p className="text-gray-300 mt-2">{cpu.description}</p>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* 3D Viewer */}
        <div className="lg:col-span-2 space-y-4">
          <div className="bg-black/30 backdrop-blur rounded-xl border border-blue-500/30 overflow-hidden">
            <CPUViewer
              modelPath={cpu.fullModelPath}
              parts={cpu.parts}
              showLabels={showLabels}
              onPartClick={setSelectedPart}
              selectedPart={selectedPart}
              zoom={zoom}
              onZoomChange={setZoom}
            />

            {/* Controls */}
            <div className="p-4 bg-blue-900/20 border-t border-blue-500/30 space-y-4">
              <div className="flex items-center justify-between flex-wrap gap-3">
                <div className="flex gap-2">
                  

                  <button
                    onClick={() => setZoom(0.05)}
                    className="px-3 py-2 bg-purple-600/50 hover:bg-purple-600 rounded-lg transition text-white text-xs"
                  >
                    🌍 Far
                  </button>

                  <button
                    onClick={() => setZoom(0.5)}
                    className="px-3 py-2 bg-green-600/50 hover:bg-green-600 rounded-lg transition text-white text-xs"
                  >
                    👁️ Normal
                  </button>

                  <button
                    onClick={() => setZoom(5)}
                    className="px-3 py-2 bg-orange-600/50 hover:bg-orange-600 rounded-lg transition text-white text-xs"
                  >
                    🔍 Close
                  </button>
                </div>

                <div className="flex gap-2">
                  <button
                    onClick={handleZoomOut}
                    className="p-2 bg-gray-700/50 hover:bg-gray-700 rounded-lg transition text-white"
                  >
                    <ZoomOut size={16} />
                  </button>

                  <button
                    onClick={handleReset}
                    className="px-3 py-2 bg-gray-700/50 hover:bg-gray-700 rounded-lg transition text-white text-sm"
                  >
                    {zoom.toFixed(2)}x
                  </button>

                  <button
                    onClick={handleZoomIn}
                    className="p-2 bg-gray-700/50 hover:bg-gray-700 rounded-lg transition text-white"
                  >
                    <ZoomIn size={16} />
                  </button>

                  <button
                    onClick={handleReset}
                    className="p-2 bg-gray-700/50 hover:bg-gray-700 rounded-lg transition text-white"
                  >
                    <Home size={16} />
                  </button>
                </div>
              </div>

              <ARButton modelPath={cpu.fullModelPath} />
            </div>
          </div>

          {/* Instructions */}
          <div className="bg-blue-900/20 backdrop-blur rounded-xl border border-blue-500/30 p-6">
            <div className="flex items-start gap-3">
              <Info className="w-5 h-5 text-blue-400 mt-1" />
              <div className="text-sm text-gray-300">
                <p className="font-semibold text-blue-400 mb-2">
                  Desktop Controls:
                </p>
                <ul className="space-y-1 mb-3">
                  <li>• Left Click + Drag: Rotate</li>
                  <li>• Right Click + Drag: Pan</li>
                  <li>• Mouse Wheel: Zoom</li>
                  <li>• Click model: Select part</li>
                </ul>
                <p className="font-semibold text-blue-400 mb-2">
                  AR Mode (Mobile):
                </p>
                <ul className="space-y-1">
                  <li>• Open on phone</li>
                  <li>• Tap “View in AR”</li>
                  <li>• Allow camera</li>
                  <li>• Place on surface</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Info Panel */}
        <PartInfo
          parts={cpu.parts}
          selectedPart={selectedPart}
          onSelectPart={(part) => setSelectedPart(part)}
          cpuId={cpuId}
          cpu={cpu}
        />
      </div>
    </main>
  );
}
