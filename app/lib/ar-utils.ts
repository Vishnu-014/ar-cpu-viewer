export function isARSupported(): Promise<boolean> {
  if (!('xr' in navigator)) {
    return Promise.resolve(false);
  }

  return (navigator as any).xr
    ?.isSessionSupported('immersive-ar')
    .then((supported: boolean) => supported)
    .catch(() => false);
}

export function getModelViewerARUrl(modelPath: string): string {
  // For iOS Quick Look and Android Scene Viewer
  const fullUrl = `${window.location.origin}${modelPath}`;
  return fullUrl;
}

export async function startARSession(modelPath: string) {
  try {
    const session = await (navigator as any).xr.requestSession('immersive-ar', {
      requiredFeatures: ['hit-test', 'dom-overlay'],
      domOverlay: { root: document.body },
    });

    return session;
  } catch (error) {
    console.error('Failed to start AR session:', error);
    throw error;
  }
}
