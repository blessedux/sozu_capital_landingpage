'use client'

import { useState, useEffect, useRef, useMemo } from 'react';

// Declare custom element for TypeScript
declare global {
  namespace JSX {
    interface IntrinsicElements {
      'spline-viewer': {
        url: string;
        style: React.CSSProperties;
        onLoad?: () => void;
      };
    }
  }
}

export default function Home() {
  const [hasError, setHasError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [splineLoaded, setSplineLoaded] = useState(false);
  const [allLines, setAllLines] = useState<string[]>([]);
  const [currentLineText, setCurrentLineText] = useState('');
  const [currentLineIndex, setCurrentLineIndex] = useState(0);
  const [showBlessedux, setShowBlessedux] = useState(false);
  const [blesseduxVisible, setBlesseduxVisible] = useState(false);
  const typewriterRef = useRef({ charIndex: 0, intervalId: null as NodeJS.Timeout | null });

  const lines = useMemo(() => [
    "sozu capital is currently under construction....",
    "свобода важнее денег"
  ], []);

  useEffect(() => {
    // Typewriter effect - start after loading is done, regardless of Spline
    if (!isLoading) {
      // Reset typewriter state
      setCurrentLineIndex(0);
      setCurrentLineText('');
      setAllLines([]);
      setShowBlessedux(false);
      setBlesseduxVisible(false);
      typewriterRef.current = { charIndex: 0, intervalId: null };

      let lineIndex = 0;
      let charIndex = 0;

      const typeNextChar = () => {
        if (lineIndex < lines.length) {
          const targetLineText = lines[lineIndex];
          
          if (charIndex < targetLineText.length) {
            // Still typing current line
            setCurrentLineText(targetLineText.substring(0, charIndex + 1));
            charIndex++;
          } else {
            // Current line is complete
            setAllLines(prev => [...prev, targetLineText]);
            setCurrentLineText('');
            
            // Move to next line
            lineIndex++;
            charIndex = 0;
            
            // If there are more lines, start typing the next one after a delay
            if (lineIndex < lines.length) {
              setTimeout(() => {
                typewriterRef.current.intervalId = setInterval(typeNextChar, 100);
              }, 2000);
            } else {
              // All lines done, show blessedux link with fade-in
              setTimeout(() => {
                setShowBlessedux(true);
                // Add a small delay for smooth fade-in
                setTimeout(() => {
                  setBlesseduxVisible(true);
                }, 100);
              }, 1000);
            }
          }
        }
      };

      // Start typing the first line
      typewriterRef.current.intervalId = setInterval(typeNextChar, 100);

      return () => {
        if (typewriterRef.current.intervalId) {
          clearInterval(typewriterRef.current.intervalId);
        }
      };
    }
  }, [isLoading, lines]);

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

  // Fallback: Set spline loaded to true after 5 seconds regardless
  useEffect(() => {
    const fallbackTimeout = setTimeout(() => {
      if (!splineLoaded) {
        setSplineLoaded(true);
        setIsLoading(false);
      }
    }, 5000);

    return () => clearTimeout(fallbackTimeout);
  }, [splineLoaded]);

  return (
    <div className="relative w-full h-screen overflow-hidden">
      {/* SOZU CAPITAL Logo - Top Left */}
      <div className="absolute top-6 left-6 z-50">
        <img 
          src="/android-chrome-192x192.png" 
          alt="SOZU CAPITAL" 
          className="w-12 h-12 md:w-16 md:h-16"
        />
      </div>
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

          {/* Typewriter Text - Bottom Center */}
          {!isLoading && (
            <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-center z-50 pointer-events-none w-full max-w-4xl px-4">
              <div className="font-mono text-white text-lg md:text-xl leading-relaxed bg-black/30 backdrop-blur-sm px-6 py-3 rounded-lg">
                {/* Reserve space for all lines to prevent vertical movement */}
                {lines.map((_, index) => (
                  <div key={index} className="mb-2 break-words min-h-[1.5rem]">
                    {/* Show completed line if it exists */}
                    {allLines[index] && (
                      <span>{allLines[index]}</span>
                    )}
                    {/* Show current typing line if it's this line */}
                    {index === allLines.length && currentLineText && (
                      <span>
                        {currentLineText}
                        <span className="animate-pulse">|</span>
                      </span>
                    )}
                  </div>
                ))}
              </div>
              
              {/* Reserve space for blessedux button to prevent layout shift */}
              <div className="mt-4 text-center min-h-[2rem]">
                {/* Show blessedux link - Third line with smooth fade-in */}
                {showBlessedux && (
                  <div className={`transition-opacity duration-1000 ${blesseduxVisible ? 'opacity-100' : 'opacity-0'}`}>
                    <a 
                      href="https://blessedux.com" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-purple-400 hover:text-purple-300 transition-colors duration-300 font-mono text-sm bg-black/20 backdrop-blur-sm px-3 py-1 rounded pointer-events-auto"
                    >
                      blessedux
                    </a>
                  </div>
                )}
              </div>
            </div>
          )}
    </div>
  );
}
