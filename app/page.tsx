'use client'

import { useState, useEffect } from 'react';

export default function Home() {
  const [hasError, setHasError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [splineLoaded, setSplineLoaded] = useState(false);

  useEffect(() => {
    // Load the Spline viewer script
    const script = document.createElement('script');
    script.type = 'module';
    script.src = 'https://unpkg.com/@splinetool/viewer@1.10.74/build/spline-viewer.js';
    script.onload = () => {
      console.log('Spline viewer script loaded');
    };
    script.onerror = () => {
      console.error('Failed to load Spline viewer script');
      setHasError(true);
      setIsLoading(false);
    };
    document.head.appendChild(script);

        // Set a timeout to hide preloader after 2 seconds regardless of Spline status
        const timeout = setTimeout(() => {
          setIsLoading(false);
        }, 2000);

    return () => {
      clearTimeout(timeout);
      // Clean up script if component unmounts
      if (document.head.contains(script)) {
        document.head.removeChild(script);
      }
    };
  }, []);

  const handleSplineLoad = () => {
    setSplineLoaded(true);
    // Add a small delay to ensure smooth transition
    setTimeout(() => {
      setIsLoading(false);
    }, 500);
  };

  return (
    <div className="relative w-full h-screen overflow-hidden">
      {/* Preloader */}
      {isLoading && (
        <div className="absolute inset-0 w-full h-full bg-black flex items-center justify-center z-20">
          <div className="font-mono text-white text-3xl tracking-wider">
            {Array.from({ length: 6 }).map((_, i) => (
              <span
                key={i}
                className="inline-block opacity-30 transition-opacity duration-200"
                style={{
                  animation: `slashPulse 1s ease-in-out infinite`,
                  animationDelay: `${i * 0.1}s`,
                }}
              >
                /
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Spline Scene or Black Background */}
      <div className="absolute inset-0 w-full h-full overflow-hidden">
        {!hasError ? (
          <div className="w-full h-full scale-150 origin-center">
            <spline-viewer 
              url="https://prod.spline.design/qJMdOHKop06FuXNN/scene.splinecode"
              style={{ width: '100%', height: '100%' }}
              onLoad={handleSplineLoad}
            />
          </div>
        ) : (
          <div className="w-full h-full bg-black"></div>
        )}
      </div>
    </div>
  );
}
