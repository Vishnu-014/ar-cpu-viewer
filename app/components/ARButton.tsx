'use client';

import { useState, useEffect } from 'react';
import { Camera, Smartphone, AlertCircle, Download } from 'lucide-react';

interface Props {
  modelPath: string;
}

export default function ARButton({ modelPath }: Props) {
  const [userAgent, setUserAgent] = useState('');
  const [currentUrl, setCurrentUrl] = useState('');

  useEffect(() => {
    setUserAgent(navigator.userAgent);
    setCurrentUrl(window.location.origin);
  }, []);

  const isIOS = /iPad|iPhone|iPod/.test(userAgent);
  const isAndroid = /Android/.test(userAgent);
  const isMobile = isIOS || isAndroid;

  const handleARClick = () => {
    const fullModelUrl = `${currentUrl}${modelPath}`;

    if (isIOS) {
      // iOS Quick Look AR
      // const link = document.createElement('a');
      // link.rel = 'ar';
      // link.href = modelPath;
      // link.download = '';

      // const img = document.createElement('img');
      // link.appendChild(img);

      // document.body.appendChild(link);
      // link.click();
      // document.body.removeChild(link);

      // console.log('iOS AR triggered with:', modelPath);
      const usdzPath = modelPath.replace('.glb', '.usdz');

      const link = document.createElement('a');
      link.rel = 'ar';
      link.href = usdzPath;

      const img = document.createElement('img');
      link.appendChild(img);

      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      console.log('iOS AR triggered with:', usdzPath);
    } else if (isAndroid) {
      // Android Scene Viewer
      const intentUrl = `intent://arvr.google.com/scene-viewer/1.0?file=${encodeURIComponent(
        fullModelUrl
      )}&mode=ar_preferred&title=CPU%20Model#Intent;scheme=https;package=com.google.android.googlequicksearchbox;action=android.intent.action.VIEW;S.browser_fallback_url=${encodeURIComponent(
        window.location.href
      )};end;`;

      window.location.href = intentUrl;

      console.log('Android AR triggered with:', intentUrl);

      // Fallback: Try Scene Viewer directly after 2 seconds
      setTimeout(() => {
        const sceneViewerUrl = `https://arvr.google.com/scene-viewer/1.0?file=${encodeURIComponent(
          fullModelUrl
        )}&mode=ar_preferred`;
        window.open(sceneViewerUrl, '_blank');
      }, 2000);
    } else {
      // Desktop fallback - show instructions
      alert(
        `AR is available on mobile devices.\n\nTo view in AR:\n1. Open this page on your smartphone\n2. Tap the "Open in AR" button\n3. Point your camera at a flat surface\n\nCurrent URL: ${window.location.href}`
      );
    }
  };

  const handleModelViewerAR = () => {
    // Alternative: Use model-viewer's AR capabilities
    const modelViewerUrl = `https://modelviewer.dev/editor/?gltfUrl=${encodeURIComponent(
      currentUrl + modelPath
    )}`;
    window.open(modelViewerUrl, '_blank');
  };

  return (
    <div className="space-y-3">
      {/* Primary AR Button */}
      <button
        onClick={handleARClick}
        className="w-full flex items-center justify-center gap-2 px-6 py-4 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 rounded-lg font-semibold transition shadow-lg shadow-blue-500/50 text-white"
      >
        <Camera className="w-5 h-5" />
        {isMobile ? 'View in AR' : 'Open in AR (Mobile Only)'}
      </button>

      {/* Alternative AR Button (Model Viewer) */}
      {!isMobile && (
        <button
          onClick={handleModelViewerAR}
          className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-gray-700/50 hover:bg-gray-700 rounded-lg text-sm transition text-white"
        >
          <Download className="w-4 h-4" />
          Open in Model Viewer
        </button>
      )}

      {/* Info Messages */}
      <div className="bg-blue-900/20 border border-blue-500/30 rounded-lg p-3">
        {isMobile ? (
          <div className="flex items-start gap-2 text-xs text-gray-300">
            <Smartphone className="w-4 h-4 text-blue-400 flex-shrink-0 mt-0.5" />
            <div>
              <p className="font-semibold text-blue-400 mb-1">
                {isIOS ? 'iOS Quick Look' : 'Android Scene Viewer'}
              </p>
              <p>
                Tap the button above to place this model in your space. Point
                your camera at a flat surface to begin.
              </p>
            </div>
          </div>
        ) : (
          <div className="flex items-start gap-2 text-xs text-gray-300">
            <AlertCircle className="w-4 h-4 text-yellow-400 flex-shrink-0 mt-0.5" />
            <div>
              <p className="font-semibold text-yellow-400 mb-1">Desktop Mode</p>
              <p>
                AR features work best on mobile devices. Scan the QR code below
                or open this page on your phone.
              </p>
            </div>
          </div>
        )}
      </div>

      {/* QR Code for Desktop */}
      {!isMobile && currentUrl && (
        <div className="bg-black/30 rounded-lg p-4">
          <p className="text-xs text-gray-400 mb-3 text-center">
            Scan to open on mobile:
          </p>
          <div className="flex justify-center mb-3">
            <div className="bg-white p-3 rounded-lg">
              <div className="w-40 h-40 bg-white relative">
                <img
                  src={`https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=${encodeURIComponent(
                    typeof window !== 'undefined'
                      ? window.location.href
                      : currentUrl
                  )}`}
                  alt="QR Code"
                  className="w-full h-full"
                  onError={(e) => {
                    // Fallback to Google Charts API
                    const target = e.target as HTMLImageElement;
                    target.src = `https://chart.googleapis.com/chart?cht=qr&chl=${encodeURIComponent(
                      window.location.href
                    )}&chs=300x300`;
                  }}
                />
              </div>
            </div>
          </div>

          {/* Manual URL */}
          <div className="mt-3">
            <p className="text-xs text-gray-400 mb-2">Or copy this URL:</p>
            <div className="flex gap-2">
              <input
                type="text"
                value={
                  typeof window !== 'undefined'
                    ? window.location.href
                    : currentUrl
                }
                readOnly
                className="flex-1 px-3 py-2 bg-gray-900 text-gray-300 text-xs rounded border border-gray-700 font-mono"
              />
              <button
                onClick={() => {
                  navigator.clipboard.writeText(window.location.href);
                  alert('URL copied to clipboard!');
                }}
                className="px-3 py-2 bg-blue-600 hover:bg-blue-700 text-white text-xs rounded transition"
              >
                Copy
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Technical Requirements */}
      <details className="bg-black/20 rounded-lg">
        <summary className="px-3 py-2 text-xs text-gray-400 cursor-pointer hover:text-gray-300">
          AR Requirements & Troubleshooting
        </summary>
        <div className="px-3 pb-3 text-xs text-gray-400 space-y-2">
          <div>
            <p className="font-semibold text-gray-300">iOS Requirements:</p>
            <ul className="list-disc list-inside pl-2 space-y-1">
              <li>iOS 12 or later</li>
              <li>ARKit-compatible device (iPhone 6S or later)</li>
              <li>Safari browser recommended</li>
            </ul>
          </div>
          <div>
            <p className="font-semibold text-gray-300">Android Requirements:</p>
            <ul className="list-disc list-inside pl-2 space-y-1">
              <li>Android 7.0 or later</li>
              <li>ARCore-compatible device</li>
              <li>Chrome browser recommended</li>
            </ul>
          </div>
          <div>
            <p className="font-semibold text-gray-300">Troubleshooting:</p>
            <ul className="list-disc list-inside pl-2 space-y-1">
              <li>Ensure good lighting conditions</li>
              <li>Grant camera permissions when prompted</li>
              <li>Try reloading the page if AR doesn't launch</li>
              <li>Use "Model Viewer" button as alternative</li>
            </ul>
          </div>
        </div>
      </details>
    </div>
  );
}
