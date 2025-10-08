'use client'

import { useState, useEffect, useRef, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
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
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const [splineAnimationState, setSplineAnimationState] = useState({
    isAnimating: false,
    currentAnimation: null as string | null,
    animationProgress: 0,
    lastAnimationComplete: null as { timestamp: number; data: any } | null
  });

  // All text and typewriter effects removed for clean animation testing

  // Spline animation event handlers
  const onSplineAnimationComplete = (eventData: any) => {
    setSplineAnimationState(prev => ({
      ...prev,
      isAnimating: false,
      currentAnimation: null,
      animationProgress: 1,
      lastAnimationComplete: {
        timestamp: Date.now(),
        data: eventData
      }
    }));
    
    // Trigger your custom logic here
    // For example, show waitlist form, trigger haiku effects, etc.
    handleAnimationComplete(eventData);
  };

  const onSplineStateChange = (eventData: any) => {
    setSplineAnimationState(prev => ({
      ...prev,
      isAnimating: eventData.isAnimating || false,
      currentAnimation: eventData.animationName || null,
      animationProgress: eventData.progress || 0
    }));
  };

  const handleAnimationComplete = (eventData: any) => {
    // Custom logic when animation completes
    // This is where you can trigger other effects, show UI elements, etc.
    
    // Example: Show waitlist form after animation completes
    // setShowWaitlistForm(true);
    
    // Example: Trigger haiku effects
    // triggerHaikuEffects();
    
    // Example: Update scroll behavior
    // setScrollProgress(1);
  };

  useEffect(() => {
    // Load the Spline viewer script
    const script = document.createElement('script');
    script.type = 'module';
    script.src = 'https://unpkg.com/@splinetool/viewer@1.10.74/build/spline-viewer.js';
    script.onload = () => {
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

  // Method 4: Polling approach for animation detection
  useEffect(() => {
    if (!splineLoaded) return;

    const pollAnimationState = () => {
      const splineElement = document.querySelector('spline-viewer') as any;
      if (splineElement && splineElement.application) {
        const app = splineElement.application;
        
        // Check if there are any active animations
        if (app.mixer && app.mixer._actions) {
          const activeActions = app.mixer._actions.filter((action: any) => action.isRunning());
          
          if (activeActions.length > 0) {
            // Animation is running
            setSplineAnimationState(prev => ({
              ...prev,
              isAnimating: true,
              currentAnimation: activeActions[0]._clip.name || 'Unknown',
              animationProgress: activeActions[0].time / activeActions[0]._clip.duration
            }));
          } else {
            // No animations running
            setSplineAnimationState(prev => ({
              ...prev,
              isAnimating: false,
              currentAnimation: null,
              animationProgress: 0
            }));
          }
        }
      }
    };

    // Poll every 100ms for animation state
    const pollInterval = setInterval(pollAnimationState, 100);

    return () => clearInterval(pollInterval);
  }, [splineLoaded]);

  const handleSplineLoad = () => {
    setSplineLoaded(true);
    
    // Wait for Spline to fully initialize, then set up event listeners
    setTimeout(() => {
      const splineElement = document.querySelector('spline-viewer') as any;
      if (splineElement) {
        // Method 1: Listen to Spline's internal events
        if (splineElement.addEventListener) {
          // Listen for animation events
          splineElement.addEventListener('animationcomplete', (event: any) => {
            // Trigger your custom logic here
            onSplineAnimationComplete(event.detail);
          });
          
          // Listen for state changes
          splineElement.addEventListener('statechange', (event: any) => {
            onSplineStateChange(event.detail);
          });
        }
        
        // Method 2: Access Spline's internal application
        if (splineElement.application) {
          const app = splineElement.application;
          splineRef.current = app;
          
          // Listen to Three.js scene events
          if (app.scene) {
            app.scene.addEventListener('animationcomplete', (event: any) => {
              onSplineAnimationComplete(event);
            });
          }
        }
        
        // Method 3: Monitor canvas for animation end events
        const canvas = splineElement.querySelector('canvas');
        if (canvas) {
          canvas.addEventListener('animationend', (event: any) => {
            onSplineAnimationComplete({ type: 'canvas', animationName: event.animationName });
          });
        }
      }
    }, 1000); // Wait 1 second for full initialization
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



  // Mobile detection
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768 || 'ontouchstart' in window);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Scroll progress tracking (wheel + touch support)
  useEffect(() => {
    const maxScrollProgress = 1;
    // Different scroll speeds for mobile vs desktop
    const desktopScrollSpeed = 0.01;
    const mobileScrollSpeed = 0.003; // Much slower on mobile for longer scroll distance

    const updateScrollProgress = (delta: number, isMobile: boolean) => {
      const scrollSpeed = isMobile ? mobileScrollSpeed : desktopScrollSpeed;
      setScrollProgress(prev => {
        const newProgress = prev + delta * scrollSpeed;
        const clampedProgress = Math.max(0, Math.min(maxScrollProgress, newProgress));
        return clampedProgress;
      });
    };

    // Desktop wheel events
    const handleWheel = (e: WheelEvent) => {
      updateScrollProgress(e.deltaY, false);
    };

    // Mobile touch events
    let touchStartY = 0;
    const handleTouchStart = (e: TouchEvent) => {
      touchStartY = e.touches[0].clientY;
    };

    const handleTouchMove = (e: TouchEvent) => {
      e.preventDefault(); // Prevent default scrolling
      const touchCurrentY = e.touches[0].clientY;
      const deltaY = touchStartY - touchCurrentY; // Inverted for natural feel
      updateScrollProgress(deltaY, true); // Pass true for mobile
      touchStartY = touchCurrentY;
    };

    // Add event listeners
    window.addEventListener('wheel', handleWheel, { passive: true });
    window.addEventListener('touchstart', handleTouchStart, { passive: true });
    window.addEventListener('touchmove', handleTouchMove, { passive: false });

    return () => {
      window.removeEventListener('wheel', handleWheel);
      window.removeEventListener('touchstart', handleTouchStart);
      window.removeEventListener('touchmove', handleTouchMove);
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

  return (
    <div 
      className="relative w-full h-screen overflow-hidden"
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
          onClick={() => {}}
          onMouseEnter={() => {}}
          onMouseLeave={() => {}}
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
        className="fixed inset-0 w-full h-full overflow-hidden z-[110] transition-all duration-300 ease-out"
        style={{ 
          pointerEvents: isMobile ? 'none' : 'auto', // Disable interactions on mobile
          opacity: 1 - (scrollProgress * 0.3), // Subtle fade as you scroll
          transform: `scale(${1 + scrollProgress * 0.05})` // Subtle zoom as you scroll
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
                zIndex: 10,
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
        className="transition-all duration-300 ease-out"
        style={{ 
          opacity: 0.2 + (scrollProgress * 0.3) // Becomes more visible as you scroll
        }}
      />

      {/* Waitlist Form - Always rendered, opacity directly tied to scroll progress */}
      <motion.div
        animate={{ opacity: scrollProgress }}
        transition={{ duration: 0.1, ease: "easeOut" }}
        style={{ 
          pointerEvents: 'none', // Don't block mouse events
          zIndex: 100 // Below Spline scene (z-[110])
        }}
      >
        <WaitlistForm isVisible={scrollProgress > 0.5} />
      </motion.div>
      

    </div>
  );
}
