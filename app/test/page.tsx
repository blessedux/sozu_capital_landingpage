'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { BackgroundTextRevealSVG } from '../../components/background-text-reveal';
import { TestBackgroundAnimation } from '../../components/test-background-animation';
import { WaitlistForm } from '../../components/waitlist-form';

export default function TestPage() {
  const [isLoading, setIsLoading] = useState(true);
  const [splineLoaded, setSplineLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const [animationType, setAnimationType] = useState<'ripple' | 'wave' | 'particle' | 'gradient'>('ripple');
  const splineRef = useRef<any>(null);

  // Mobile detection
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768 || 'ontouchstart' in window);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Preloader simulation
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  // Scroll progress tracking (wheel + touch support)
  useEffect(() => {
    const maxScrollProgress = 1;
    const desktopScrollSpeed = 0.01;
    const mobileScrollSpeed = 0.008;

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
    let isScrolling = false;
    
    const handleTouchStart = (e: TouchEvent) => {
      touchStartY = e.touches[0].clientY;
      isScrolling = true;
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (!isScrolling) return;
      
      const touchCurrentY = e.touches[0].clientY;
      const deltaY = touchStartY - touchCurrentY;
      
      if (Math.abs(deltaY) > 5) {
        e.preventDefault();
        updateScrollProgress(deltaY, true);
        touchStartY = touchCurrentY;
      }
    };

    const handleTouchEnd = () => {
      isScrolling = false;
    };

    // Add event listeners
    window.addEventListener('wheel', handleWheel, { passive: true });
    window.addEventListener('touchstart', handleTouchStart, { passive: true });
    window.addEventListener('touchmove', handleTouchMove, { passive: false });
    window.addEventListener('touchend', handleTouchEnd, { passive: true });

    return () => {
      window.removeEventListener('wheel', handleWheel);
      window.removeEventListener('touchstart', handleTouchStart);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('touchend', handleTouchEnd);
    };
  }, []);

  // All haiku texts from the main landing page
  const testBackgroundTexts = [
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

  if (isLoading) {
    return (
      <div className="fixed inset-0 w-full h-full bg-black z-[9999] flex items-center justify-center">
        <div className="text-white text-2xl font-mono animate-pulse">
          Loading Test Environment...
        </div>
      </div>
    );
  }

  return (
    <div className="relative w-full h-screen overflow-hidden bg-black">
      {/* Scroll Progress Indicator */}
      <div className="fixed top-0 left-0 w-full h-1 bg-gray-800 z-[120]">
        <div
          className="h-full bg-gradient-to-r from-yellow-400 to-yellow-600 transition-all duration-150 ease-out"
          style={{ width: `${scrollProgress * 100}%` }}
        />
      </div>

      {/* Background Color Layer */}
      <div className="fixed inset-0 w-full h-full bg-black z-[90]" />

      {/* Test Background Animation */}
      <div className="fixed inset-0 w-full h-full z-[112]">
        <TestBackgroundAnimation
          texts={testBackgroundTexts}
          animationType={animationType}
          className="transition-all duration-300 ease-out"
          style={{
            opacity: 0.2 + (scrollProgress * 0.3)
          }}
        />
      </div>

      {/* Test Content Area */}
      <div className="fixed inset-0 w-full h-full z-[110] flex items-center justify-center">
        <div className="text-center text-white">
          <h1 className="text-4xl font-bold mb-4">Test Environment</h1>
          <p className="text-lg mb-8">Scroll Progress: {(scrollProgress * 100).toFixed(1)}%</p>
          
          {/* Animation Type Selector */}
          <div className="mb-8">
            <p className="text-sm text-gray-400 mb-4">Animation Type:</p>
            <div className="flex justify-center space-x-4">
              {(['ripple', 'wave', 'particle', 'gradient'] as const).map((type) => (
                <button
                  key={type}
                  onClick={() => setAnimationType(type)}
                  className={`px-4 py-2 rounded text-sm font-mono transition-colors ${
                    animationType === type
                      ? 'bg-yellow-400 text-black'
                      : 'bg-gray-800 text-white hover:bg-gray-700'
                  }`}
                >
                  {type.charAt(0).toUpperCase() + type.slice(1)}
                </button>
              ))}
            </div>
          </div>
          
          <div className="space-y-4">
            <div className="text-sm text-gray-400">
              Mobile: {isMobile ? 'Yes' : 'No'}
            </div>
            <div className="text-sm text-gray-400">
              Spline Loaded: {splineLoaded ? 'Yes' : 'No'}
            </div>
            <div className="text-sm text-gray-400">
              Current Animation: {animationType}
            </div>
          </div>
        </div>
      </div>

      {/* Test Waitlist Form */}
      <motion.div
        animate={{ opacity: scrollProgress }}
        transition={{ duration: 0.1, ease: "easeOut" }}
        style={{
          pointerEvents: 'none',
          zIndex: 100
        }}
        className="fixed inset-0 w-full h-full flex items-center justify-center"
      >
        <WaitlistForm isVisible={scrollProgress > 0.5} />
      </motion.div>

      {/* Navigation Back to Main */}
      <div className="fixed top-4 left-4 z-[130]">
        <a 
          href="/" 
          className="text-white hover:text-yellow-400 transition-colors duration-200 text-sm font-mono"
        >
          ← Back to Main
        </a>
      </div>
    </div>
  );
}
