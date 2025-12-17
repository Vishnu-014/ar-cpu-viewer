'use client';

import { useState, useEffect } from 'react';

interface Props {
  url: string;
  size?: number;
}

export default function QRCodeGenerator({ url, size = 200 }: Props) {
  const [qrDataUrl, setQrDataUrl] = useState<string>('');
  const [error, setError] = useState(false);

  useEffect(() => {
    if (!url) return;

    // Method 1: Using QR Server API
    const qrApiUrl = `https://api.qrserver.com/v1/create-qr-code/?size=${size}x${size}&data=${encodeURIComponent(
      url
    )}&format=png`;

    // Test if image loads
    const img = new Image();
    img.onload = () => {
      setQrDataUrl(qrApiUrl);
      setError(false);
    };
    img.onerror = () => {
      // Fallback to another QR API
      const fallbackUrl = `https://chart.googleapis.com/chart?cht=qr&chl=${encodeURIComponent(
        url
      )}&chs=${size}x${size}`;
      setQrDataUrl(fallbackUrl);
    };
    img.src = qrApiUrl;
  }, [url, size]);

  if (error) {
    return (
      <div className="bg-gray-800 p-4 rounded-lg text-center">
        <p className="text-xs text-gray-400 mb-2">QR Code Unavailable</p>
        <p className="text-xs text-gray-500">Copy URL manually:</p>
        <input
          type="text"
          value={url}
          readOnly
          className="w-full mt-2 px-2 py-1 bg-gray-900 text-gray-300 text-xs rounded border border-gray-700"
          onClick={(e) => {
            e.currentTarget.select();
            navigator.clipboard.writeText(url);
          }}
        />
      </div>
    );
  }

  return (
    <div className="bg-white p-3 rounded-lg inline-block">
      {qrDataUrl ? (
        <img
          src={qrDataUrl}
          alt="QR Code to view on mobile"
          className="w-full h-full"
          style={{ width: size, height: size }}
          onError={() => setError(true)}
        />
      ) : (
        <div
          className="bg-gray-200 animate-pulse flex items-center justify-center"
          style={{ width: size, height: size }}
        >
          <span className="text-gray-400 text-xs">Loading...</span>
        </div>
      )}
    </div>
  );
}
