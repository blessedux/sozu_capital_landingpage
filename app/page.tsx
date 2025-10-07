'use client'

import { useState, useEffect, useRef, useMemo } from 'react';
import { motion } from 'motion/react';
import { WaitlistForm } from '../components/waitlist-form';
import { BackgroundTextRevealSVG } from '../components/background-text-reveal';

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
  // Text-related state removed for clean animation testing
  const [showWaitlistForm, setShowWaitlistForm] = useState(false);
  // typewriterRef removed - no longer needed
  const splineRef = useRef<any>(null);

  // All text and typewriter effects removed for clean animation testing

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
    console.log('🎯 Spline loaded successfully!');
    setSplineLoaded(true);
    
    // Add a delay to ensure the Spline canvas is fully rendered
    setTimeout(() => {
      // Try multiple ways to get the Spline instance
      const splineElement = document.querySelector('spline-viewer') as any;
      console.log('🎯 Spline element found:', splineElement);
      
      if (splineElement) {
        // Try different ways to access the Spline instance
        if (splineElement.spline) {
          splineRef.current = splineElement.spline;
          console.log('🎯 Spline instance found via .spline');
        } else if (splineElement._spline) {
          splineRef.current = splineElement._spline;
          console.log('🎯 Spline instance found via ._spline');
        } else if (splineElement.application) {
          splineRef.current = splineElement.application;
          console.log('🎯 Spline instance found via .application');
        } else {
          // Try to access it directly
          splineRef.current = splineElement;
          console.log('🎯 Using spline element directly');
        }
        
        // Function to attach event listeners to canvas
        const attachCanvasEvents = (canvas: HTMLCanvasElement, source: string) => {
          console.log(`🎯 Canvas found in ${source}, adding event listeners`);
          canvas.addEventListener('mouseenter', () => console.log('🎯 Canvas mouse enter'));
          canvas.addEventListener('mouseleave', () => console.log('🎯 Canvas mouse leave'));
          canvas.addEventListener('mousemove', (e: MouseEvent) => console.log('🎯 Canvas mouse move:', e.clientX, e.clientY));
          canvas.addEventListener('click', (e: MouseEvent) => console.log('🎯 Canvas click:', e.clientX, e.clientY));
        };

        // Try to find the canvas with multiple attempts
        let canvas = splineElement.querySelector('canvas');
        
        // Also try to find canvas in shadow DOM
        if (!canvas) {
          const shadowRoot = splineElement.shadowRoot;
          if (shadowRoot) {
            canvas = shadowRoot.querySelector('canvas');
            if (canvas) {
              console.log('🎯 Canvas found in shadow DOM!');
              attachCanvasEvents(canvas, 'shadow DOM');
            }
          }
        } else {
          attachCanvasEvents(canvas, 'regular DOM');
        }
        
        if (!canvas) {
          // Try again after a short delay
          setTimeout(() => {
            canvas = splineElement.querySelector('canvas');
            if (!canvas) {
              const shadowRoot = splineElement.shadowRoot;
              if (shadowRoot) {
                canvas = shadowRoot.querySelector('canvas');
                if (canvas) {
                  attachCanvasEvents(canvas, 'shadow DOM (second attempt)');
                }
              }
            } else {
              attachCanvasEvents(canvas, 'regular DOM (second attempt)');
            }
            
            if (!canvas) {
              console.log('🎯 No canvas found even on second attempt');
            }
          }, 1000);
        }
      } else {
        console.log('🎯 No spline element found');
      }
    }, 1000); // Wait 1 second for full rendering
    
    // Add a small delay to ensure smooth transition
    setTimeout(() => {
      setIsLoading(false);
    }, 500);
  };

  // Fallback: Set spline loaded to true after 5 seconds regardless
  useEffect(() => {
    const fallbackTimeout = setTimeout(() => {
      if (!splineLoaded) {
        console.log('🎯 Fallback: Setting spline loaded to true');
        setSplineLoaded(true);
        setIsLoading(false);
      }
    }, 5000);

    return () => clearTimeout(fallbackTimeout);
  }, [splineLoaded]);

  // Add periodic debugging to check Spline status
  useEffect(() => {
    const debugInterval = setInterval(() => {
      const splineElement = document.querySelector('spline-viewer');
      const canvas = document.querySelector('spline-viewer canvas');
      console.log('🔍 Debug check - Spline element:', !!splineElement, 'Canvas:', !!canvas);
      
      if (splineElement && !canvas) {
        // Try to find canvas in shadow DOM
        const shadowRoot = splineElement.shadowRoot;
        if (shadowRoot) {
          const shadowCanvas = shadowRoot.querySelector('canvas');
          console.log('🔍 Shadow DOM canvas:', !!shadowCanvas);
          if (shadowCanvas) {
            console.log('🔍 Canvas found in shadow DOM!');
          }
        } else {
          console.log('🔍 No shadow DOM found');
        }
      }
      
      if (splineElement && canvas) {
        console.log('🔍 Both Spline and canvas found, checking event listeners');
        // Check if canvas has event listeners
        console.log('🔍 Canvas has addEventListener: Yes');
      }
    }, 3000); // Check every 3 seconds

    return () => clearInterval(debugInterval);
  }, []);

  // Wheel-based waitlist form trigger (viewport stays fixed)
  useEffect(() => {
    let scrollProgress = 0;
    const maxScrollProgress = 1;

    const handleWheel = (e: WheelEvent) => {
      // Calculate scroll progress based on wheel delta
      const delta = e.deltaY;
      const scrollSpeed = 0.005; // Slower speed for better control
      
      scrollProgress += delta * scrollSpeed;
      scrollProgress = Math.max(0, Math.min(maxScrollProgress, scrollProgress));
      
      // Scroll progress tracking (internal only)
      
      // Show waitlist form only at 99-100% progress
      if (scrollProgress >= 0.99) {
        setShowWaitlistForm(true);
        console.log('📋 Waitlist form should be visible');
      } else {
        setShowWaitlistForm(false);
      }
    };

    // Add wheel event listener (no preventDefault to keep viewport fixed)
    window.addEventListener('wheel', handleWheel, { passive: true });

    return () => {
      window.removeEventListener('wheel', handleWheel);
    };
  }, []);

  // Background haiku content
  const backgroundTexts = [
    'Code, not empty vows\nA peer-to-peer world now blooms\nSovereign standard',
    'Arbitrage anchor\nJunior tranche absorbs the shock\nResilient by design',
    'Not a dying dollar\nBread and energy define\nTrue and stable worth',
    'Their tax has no reach\nTheir printing press now is mute\nWe built a new world',
    'A public ledger?\nYour life is not for their eyes\nPrivate by default',
    'The vault does not sleep\nIt works and grows for the net\nYield builds the bedrock',
    'Tap your screen and send\nLike passing paper, but strong\nYour value now flows',
    'Not here to protest\nWe build a better system\nThe ultimate leave',
    'No lobbyist hand\nJust service, a product\'s worth\nReal capitalism',
    'Beyond the border\nOne stable core for billions\nA neutral new ground',
    'Money should be like\nWater that flows, peer to peer\nFor the hustler\'s hands',
    'Digital cash flows\nUncensored, private, and strong\nThe future is here'
  ];

  // Debug loading state (commented out for production)
  // console.log('🔍 Loading state:', isLoading);

  return (
    <div 
      className="relative w-full h-screen overflow-hidden"
      onMouseMove={(e) => {
        // Main page mouse tracking (commented out for production)
        // console.log('📄 Main page mouse move:', e.clientX, e.clientY);
      }}
      onClick={(e) => {
        // Main page click tracking (commented out for production)
        // console.log('📄 Main page click:', e.clientX, e.clientY);
      }}
    >
      {/* SOZU CAPITAL Logo - Top Left */}
      {!isLoading && (
        <motion.div 
          className="fixed top-6 left-6 z-[110]"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ 
            duration: 1.5, 
            ease: "easeOut",
            delay: 0.5 
          }}
        >
          <a 
            href="https://www.x.com/sozucapital" 
            target="_blank" 
            rel="noopener noreferrer"
            className="block hover:opacity-80 transition-opacity duration-300"
          >
            <img 
              src="/sozucapital_logo_tb.png" 
              alt="SOZU CAPITAL" 
              className="w-12 h-12 md:w-16 md:h-16"
            />
          </a>
        </motion.div>
      )}
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
      <div 
        className="fixed inset-0 w-full h-full overflow-hidden z-[100]"
        style={{ 
          pointerEvents: 'auto'
        }}
        onMouseEnter={() => {
          // Spline container mouse enter (commented out for production)
          // console.log('🖱️ Spline container mouse enter');
        }}
        onMouseLeave={() => {
          // Spline container mouse leave (commented out for production)
          // console.log('🖱️ Spline container mouse leave');
        }}
        onMouseMove={(e) => {
          // Reduced logging - we know canvas is in shadow DOM
          // console.log('🖱️ Spline container mouse move:', e.clientX, e.clientY);
        }}
        onClick={(e) => {
          // Spline container click (commented out for production)
          // console.log('🖱️ Spline container click:', e.clientX, e.clientY);
        }}
      >
        {!hasError ? (
          <div 
            className="w-full h-full scale-150 origin-center"
            onMouseEnter={() => {
              // Spline wrapper mouse enter (commented out for production)
              // console.log('🖱️ Spline wrapper mouse enter');
            }}
            onMouseLeave={() => {
              // Spline wrapper mouse leave (commented out for production)
              // console.log('🖱️ Spline wrapper mouse leave');
            }}
            onMouseMove={(e) => {
              // Reduced logging - we know canvas is in shadow DOM
              // console.log('🖱️ Spline wrapper mouse move:', e.clientX, e.clientY);
            }}
            onClick={(e) => {
              // Spline wrapper click (commented out for production)
              // console.log('🖱️ Spline wrapper click:', e.clientX, e.clientY);
            }}
          >
            <spline-viewer 
              url="https://prod.spline.design/qJMdOHKop06FuXNN/scene.splinecode"
              style={{ 
                width: '100%', 
                height: '100%', 
                pointerEvents: 'auto',
                position: 'relative',
                zIndex: 1
              }}
              onLoad={handleSplineLoad}
            />
          </div>
        ) : (
          <div className="w-full h-full bg-black"></div>
        )}
      </div>

      {/* Background Text Reveal Effect - positioned below Spline canvas */}
      <BackgroundTextRevealSVG 
        texts={backgroundTexts}
        className="opacity-20"
      />

      {/* Minimal Waitlist Form */}
      <WaitlistForm isVisible={showWaitlistForm} />

    </div>
  );
}
