'use client';

import { CPUPart } from '@/app/types/cpu';
import { Tag, Info } from 'lucide-react';

interface Props {
  parts: CPUPart[];
  selectedPart: CPUPart | null;
  onSelectPart: (part: CPUPart) => void;
}

export default function PartInfo({ parts, selectedPart, onSelectPart }: Props) {
  return (
    <div className="space-y-4">
      {/* Selected Part Detail */}
      {selectedPart ? (
        <div className="bg-gradient-to-br from-blue-900/40 to-purple-900/40 backdrop-blur rounded-xl border border-blue-500/30 p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-3 bg-blue-500/20 rounded-lg">
              <Tag className="w-6 h-6 text-blue-400" />
            </div>
            <h2 className="text-xl font-bold text-white">
              {selectedPart.name}
            </h2>
          </div>
          <p className="text-gray-300 leading-relaxed">
            {selectedPart.description}
          </p>
          <div className="mt-4 pt-4 border-t border-blue-500/30">
            <div className="flex items-center gap-2 text-sm text-gray-400">
              <div
                className="w-4 h-4 rounded border border-white/30"
                style={{ backgroundColor: selectedPart.color }}
              />
              <span>Color identifier</span>
            </div>
          </div>
        </div>
      ) : (
        <div className="bg-blue-900/20 backdrop-blur rounded-xl border border-blue-500/30 p-6 text-center">
          <div className="w-12 h-12 bg-blue-400/20 rounded-lg mx-auto mb-3 flex items-center justify-center">
            <Info className="w-6 h-6 text-blue-400" />
          </div>
          <p className="text-gray-400">
            Click on the model or select a part below
          </p>
        </div>
      )}

      {/* Parts List */}
      <div className="bg-black/30 backdrop-blur rounded-xl border border-blue-500/30 p-6">
        <h3 className="text-lg font-bold mb-4 flex items-center gap-2 text-white">
          <Tag className="w-5 h-5 text-blue-400" />
          Components
        </h3>
        <div className="space-y-2">
          {parts.map((part) => (
            <button
              key={part.id}
              onClick={() => onSelectPart(part)}
              className={`w-full text-left p-3 rounded-lg transition ${
                selectedPart?.id === part.id
                  ? 'bg-blue-600/50 border border-blue-400'
                  : 'bg-gray-800/50 hover:bg-gray-700/50 border border-transparent'
              }`}
            >
              <div className="flex items-center gap-3">
                <div
                  className="w-3 h-3 rounded-full border border-white/30 flex-shrink-0"
                  style={{ backgroundColor: part.color }}
                />
                <span className="text-sm font-medium text-white">
                  {part.name}
                </span>
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
