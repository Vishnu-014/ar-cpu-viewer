'use client';

import { useState } from 'react';
import { CPUPart } from '@/app/types/cpu';
import { Tag, Info, X, Video } from 'lucide-react';

interface Props {
  parts: CPUPart[];
  selectedPart: CPUPart | null;
  onSelectPart: (part: CPUPart) => void;
  cpuId: string;
  cpu: any;
}

export default function PartInfo({
  parts,
  selectedPart,
  onSelectPart,
  cpuId,
  cpu
}: Props) {

  const [showImage, setShowImage] = useState(false);
  const [showVideo, setShowVideo] = useState(false);
  const [imageSrc, setImageSrc] = useState<string | null>(null);

  /* ✅ OPEN IMAGE */
  const openImage = () => {
    setImageSrc(cpu.exploreImage);
    setShowImage(true);
  };

  /* ✅ OPEN VIDEO */
  const openVideo = () => {
    setShowVideo(true);
  };

  return (
    <div className="space-y-4">

      {/* 🔹 EXPLORE BUTTONS */}
      {!selectedPart && (
        <div className="space-y-2">
          <button
            onClick={openImage}
            className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
          >
            Explore CPU Model
          </button>

          {/* ✅ NEW VIDEO BUTTON */}
          <button
            onClick={openVideo}
            className="w-full bg-purple-600 text-white py-2 rounded hover:bg-purple-700 transition flex items-center justify-center gap-2"
          >
            <Video size={18} /> Explore CPU Video
          </button>
        </div>
      )}

      {/* 🔹 IMAGE MODAL */}
      {showImage && imageSrc && (
        <div
          className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center"
          onClick={() => setShowImage(false)}
        >
          <div
            className="relative bg-black p-4 rounded-xl max-w-2xl w-full"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setShowImage(false)}
              className="absolute top-3 right-3 text-white"
            >
              <X />
            </button>

            <img
              src={imageSrc}
              className="w-full rounded-lg object-contain"
              alt="CPU Model"
            />
          </div>
        </div>
      )}

      {/* 🔹 VIDEO MODAL */}
      {showVideo && (
        <div
          className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center"
          onClick={() => setShowVideo(false)}
        >
          <div
            className="relative bg-black p-4 rounded-xl max-w-3xl w-full"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setShowVideo(false)}
              className="absolute top-3 right-3 text-white"
            >
              <X />
            </button>

            <video
              src={cpu.exploreVideo}
              controls
              autoPlay
              className="w-full rounded-lg"
            />
          </div>
        </div>
      )}

      {/* 🔹 SELECTED PART INFO */}
      {selectedPart ? (
        <div className="bg-blue-900/30 p-6 rounded-xl border border-blue-500/30">
          <h2 className="text-xl font-bold text-white mb-2">
            {selectedPart.name}
          </h2>
          <p className="text-gray-300">{selectedPart.description}</p>
        </div>
      ) : (
        <div className="bg-blue-900/20 p-6 rounded-xl text-center">
          <Info className="mx-auto text-blue-400" />
          <p className="text-gray-400 mt-2">
            Select a component to view details
          </p>
        </div>
      )}

      {/* 🔹 COMPONENT LIST */}
      <div className="bg-black/30 p-6 rounded-xl border border-blue-500/30">
        <h3 className="text-white font-bold mb-3 flex gap-2">
          <Tag className="text-blue-400" /> Components
        </h3>

        {parts.map((part) => (
          <button
            key={part.id}
            onClick={() => onSelectPart(part)}
            className="w-full text-left p-3 mb-2 rounded bg-gray-800/60 hover:bg-gray-700 transition"
          >
            <span className="text-white">{part.name}</span>
          </button>
        ))}
      </div>

    </div>
  );
}