import React, { useEffect } from 'react';
import { Toaster, sileo } from 'sileo';
import 'sileo/styles.css';

export default function SileoProvider() {
  useEffect(() => {
    // Adjuntamos la instancia correcta de sileo a window para que los scripts Vanilla JS
    // de Astro puedan usar exactamente la misma instancia que renderiza el Toaster
    (window as any).sileo = sileo;
  }, []);

  return <Toaster position="top-right" />;
}
