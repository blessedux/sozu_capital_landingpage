'use client'

import { useState, useEffect, useRef, useMemo } from 'react';
import { motion } from 'framer-motion';
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
  const splineRef = useRef<any>(null);
  // Text-related state removed for clean animation testing
  const [showWaitlistForm, setShowWaitlistForm] = useState(false);

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

    // Set a minimum preloader duration of 2 seconds to ensure it's visible
    const minTimeout = setTimeout(() => {
      // Only hide if Spline has loaded or there's an error
      if (splineLoaded || hasError) {
        setIsLoading(false);
      }
    }, 2000);

    return () => {
      clearTimeout(minTimeout);
      // Clean up script if component unmounts
      if (document.head.contains(script)) {
        document.head.removeChild(script);
      }
    };
  }, [splineLoaded, hasError]);

  const handleSplineLoad = () => {
    console.log('🎯 Spline scene loaded successfully!');
    setSplineLoaded(true);
    
    // Add a delay to ensure the Spline canvas is fully rendered
    setTimeout(() => {
      // Try multiple ways to get the Spline instance
      const splineElement = document.querySelector('spline-viewer') as any;
      console.log('🎯 Spline element found:', splineElement);
      
      if (splineElement) {
        console.log('🎯 Spline element properties:', {
          url: splineElement.url,
          loaded: splineElement.loaded,
          ready: splineElement.ready,
          application: !!splineElement.application,
          spline: !!splineElement.spline,
          _spline: !!splineElement._spline
        });
        
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
          console.log(`🎯 Canvas dimensions: ${canvas.width}x${canvas.height}`);
          console.log(`🎯 Canvas style:`, canvas.style.cssText);
          
          canvas.addEventListener('mouseenter', () => console.log('🎯 Canvas mouse enter'));
          canvas.addEventListener('mouseleave', () => console.log('🎯 Canvas mouse leave'));
          canvas.addEventListener('mousemove', (e: MouseEvent) => {
            console.log('🎯 Canvas mouse move:', e.clientX, e.clientY);
            // Check if Spline is responding to mouse events
            console.log('🎯 Canvas mouse event details:', {
              target: e.target,
              currentTarget: e.currentTarget,
              bubbles: e.bubbles,
              cancelable: e.cancelable
            });
          });
          canvas.addEventListener('click', (e: MouseEvent) => console.log('🎯 Canvas click:', e.clientX, e.clientY));
          
          // Also try to access Spline's internal event system
          if (splineRef.current) {
            console.log('🎯 Spline instance available:', splineRef.current);
            // Try to access Spline's event system
            if (splineRef.current.addEventListener) {
              console.log('🎯 Spline has addEventListener method');
            }
            if (splineRef.current.on) {
              console.log('🎯 Spline has on method');
            }
          }
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
    
    // Note: Preloader hiding is now handled by the main useEffect with minimum duration
  };

  // Fallback: Set spline loaded to true after 5 seconds regardless
  useEffect(() => {
    const fallbackTimeout = setTimeout(() => {
      if (!splineLoaded) {
        setSplineLoaded(true);
        // Preloader will be hidden by the main useEffect when splineLoaded becomes true
      }
    }, 5000);

    return () => clearTimeout(fallbackTimeout);
  }, [splineLoaded]);

  // Handle preloader hiding when Spline loads or error occurs
  useEffect(() => {
    if (splineLoaded || hasError) {
      // Add a small delay to ensure smooth transition
      const hideTimeout = setTimeout(() => {
        setIsLoading(false);
      }, 300); // Small delay for smooth transition

      return () => clearTimeout(hideTimeout);
    }
  }, [splineLoaded, hasError]);



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
  // console.log('🔍 Loading state:', isLoading, 'Spline loaded:', splineLoaded, 'Has error:', hasError);

  return (
    <div 
      className="relative w-full h-screen overflow-hidden"
      style={{ pointerEvents: 'none' }}
    >
      {/* SOZU CAPITAL Logo - Top Left */}
      {!isLoading && (
        <motion.div 
          className="fixed top-6 left-6 z-[130] cursor-pointer"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ 
            duration: 1.5, 
            ease: "easeOut",
            delay: 0.5
          }}
          onClick={() => console.log('🏠 Header icon clicked!')}
          onMouseEnter={() => console.log('🏠 Header icon mouse enter')}
          onMouseLeave={() => console.log('🏠 Header icon mouse leave')}
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
        <div 
          className="fixed inset-0 w-full h-full bg-black flex items-center justify-center"
          style={{ 
            zIndex: 9999,
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0
          }}
        >
          <div className="font-mono text-white text-3xl tracking-wider">
            {Array.from({ length: 6 }).map((_, i) => (
              <span
                key={i}
                className="inline-block opacity-30"
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

      {/* Background Color Layer */}
      <div className="fixed inset-0 w-full h-full bg-black z-[90]" />

      {/* Spline Scene */}
      <div 
        className="fixed inset-0 w-full h-full overflow-hidden z-[100]"
        style={{ 
          pointerEvents: 'auto'
        }}
        onMouseMove={(e) => {
          // Forward mouse events to haiku component via custom event
          console.log('📄 Spline container mouse move:', e.clientX, e.clientY);
          const customEvent = new CustomEvent('haiku-mousemove', {
            detail: { clientX: e.clientX, clientY: e.clientY }
          });
          document.dispatchEvent(customEvent);
        }}
        onClick={(e) => {
          // Forward click events to haiku component via custom event
          const customEvent = new CustomEvent('haiku-click', {
            detail: { clientX: e.clientX, clientY: e.clientY }
          });
          document.dispatchEvent(customEvent);
        }}
      >
        {!hasError ? (
          <div className="w-full h-full scale-150 origin-center">
            <spline-viewer 
              url="https://prod.spline.design/qJMdOHKop06FuXNN/scene.splinecode"
              style={{ 
                width: '100%', 
                height: '100%', 
                pointerEvents: 'auto',
                position: 'relative',
                zIndex: 1,
                background: 'transparent'
              }}
              onLoad={handleSplineLoad}
            />
          </div>
        ) : (
          <div className="w-full h-full bg-black"></div>
        )}
      </div>


      {/* Background Text Reveal Effect - positioned above Spline canvas */}
      <BackgroundTextRevealSVG 
        texts={backgroundTexts}
        className="opacity-20"
        style={{ 
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          zIndex: 105,
          pointerEvents: 'none' // Don't interfere with mouse events
        }}
      />

      {/* Minimal Waitlist Form */}
      <WaitlistForm isVisible={showWaitlistForm} />

    </div>
  );
}
