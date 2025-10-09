'use client';

import { useState, useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';

interface TestBackgroundAnimationProps {
  texts: string[];
  className?: string;
  style?: React.CSSProperties;
  animationType?: 'ripple' | 'wave' | 'particle' | 'gradient';
}

interface Position {
  x: number;
  y: number;
}

interface AnimationState {
  visible: boolean;
  pinned: boolean;
  animationProgress: number;
  customData?: any;
}

export function TestBackgroundAnimation({
  texts,
  className = '',
  style = {},
  animationType = 'ripple'
}: TestBackgroundAnimationProps) {
  const [isClient, setIsClient] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [positions, setPositions] = useState<Position[]>([]);
  const [animationStates, setAnimationStates] = useState<AnimationState[]>([]);
  const [cursor, setCursor] = useState({ x: 0, y: 0 });

  // Initialize client-side state
  useEffect(() => {
    setIsClient(true);
    
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768 || 'ontouchstart' in window);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Generate positions for texts
  const generatePositions = useCallback((count: number): Position[] => {
    const positions: Position[] = [];
    const minDistance = 15; // Minimum distance between texts
    
    for (let i = 0; i < count; i++) {
      let attempts = 0;
      let newPosition: Position;
      
      do {
        newPosition = {
          x: Math.random() * 80 + 10, // 10% to 90%
          y: Math.random() * 80 + 10  // 10% to 90%
        };
        attempts++;
      } while (
        attempts < 100 && 
        positions.some(pos => 
          Math.sqrt(
            Math.pow(pos.x - newPosition.x, 2) + 
            Math.pow(pos.y - newPosition.y, 2)
          ) < minDistance
        )
      );
      
      positions.push(newPosition);
    }
    
    return positions;
  }, []);

  // Initialize positions and animation states
  useEffect(() => {
    if (!isClient) return;
    
    const newPositions = generatePositions(texts.length);
    setPositions(newPositions);
    
    setAnimationStates(texts.map(() => ({
      visible: false,
      pinned: false,
      animationProgress: 0
    })));
  }, [texts, generatePositions, isClient]);

  // Handle mouse/touch interactions
  const handleInteraction = useCallback((clientX: number, clientY: number) => {
    if (!isClient || positions.length === 0) return;
    
    const rect = document.documentElement.getBoundingClientRect();
    const x = ((clientX - rect.left) / rect.width) * 100;
    const y = ((clientY - rect.top) / rect.height) * 100;
    
    setCursor({ x, y });
    
    // Find closest text and trigger animation
    let closestIndex = 0;
    let closestDistance = Infinity;
    
    positions.forEach((pos, index) => {
      const distance = Math.sqrt(
        Math.pow(pos.x - x, 2) + Math.pow(pos.y - y, 2)
      );
      if (distance < closestDistance) {
        closestDistance = distance;
        closestIndex = index;
      }
    });
    
    // Trigger animation for closest text
    if (closestDistance < 20) { // Within 20% of screen
      setAnimationStates(prev => prev.map((state, index) => 
        index === closestIndex 
          ? { ...state, visible: true, pinned: true, animationProgress: 1 }
          : { ...state, visible: false, pinned: false, animationProgress: 0 }
      ));
    }
  }, [isClient, positions]);

  // Add event listeners
  useEffect(() => {
    if (!isClient) return;
    
    const handleMouseMove = (e: MouseEvent) => {
      handleInteraction(e.clientX, e.clientY);
    };
    
    const handleTouch = (e: TouchEvent) => {
      if (e.touches[0]) {
        handleInteraction(e.touches[0].clientX, e.touches[0].clientY);
      }
    };
    
    if (isMobile) {
      document.addEventListener('touchstart', handleTouch, { passive: true });
    } else {
      document.addEventListener('mousemove', handleMouseMove, { passive: true });
    }
    
    return () => {
      if (isMobile) {
        document.removeEventListener('touchstart', handleTouch);
      } else {
        document.removeEventListener('mousemove', handleMouseMove);
      }
    };
  }, [isClient, isMobile, handleInteraction]);

  if (!isClient) {
    return <div className={className} style={style} />;
  }

  const renderAnimation = () => {
    switch (animationType) {
      case 'wave':
        return (
          <motion.div
            className="absolute inset-0"
            animate={{
              background: [
                'radial-gradient(circle at 20% 50%, rgba(255,255,255,0.1) 0%, transparent 50%)',
                'radial-gradient(circle at 80% 50%, rgba(255,255,255,0.1) 0%, transparent 50%)',
                'radial-gradient(circle at 20% 50%, rgba(255,255,255,0.1) 0%, transparent 50%)'
              ]
            }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          />
        );
      
      case 'particle':
        return (
          <div className="absolute inset-0">
            {Array.from({ length: 20 }).map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-1 h-1 bg-white rounded-full"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                }}
                animate={{
                  y: [0, -20, 0],
                  opacity: [0.3, 1, 0.3],
                }}
                transition={{
                  duration: 2 + Math.random() * 2,
                  repeat: Infinity,
                  delay: Math.random() * 2,
                }}
              />
            ))}
          </div>
        );
      
      case 'gradient':
        return (
          <motion.div
            className="absolute inset-0"
            animate={{
              background: [
                'linear-gradient(45deg, rgba(255,255,255,0.05) 0%, transparent 50%)',
                'linear-gradient(135deg, rgba(255,255,255,0.05) 0%, transparent 50%)',
                'linear-gradient(225deg, rgba(255,255,255,0.05) 0%, transparent 50%)',
                'linear-gradient(315deg, rgba(255,255,255,0.05) 0%, transparent 50%)',
                'linear-gradient(45deg, rgba(255,255,255,0.05) 0%, transparent 50%)'
              ]
            }}
            transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
          />
        );
      
      default: // ripple
        return (
          <motion.div
            className="absolute inset-0"
            style={{
              background: `radial-gradient(circle at ${cursor.x}% ${cursor.y}%, rgba(255,255,255,0.1) 0%, transparent 50%)`
            }}
            animate={{
              background: [
                `radial-gradient(circle at ${cursor.x}% ${cursor.y}%, rgba(255,255,255,0.1) 0%, transparent 50%)`,
                `radial-gradient(circle at ${cursor.x}% ${cursor.y}%, rgba(255,255,255,0.2) 0%, transparent 70%)`,
                `radial-gradient(circle at ${cursor.x}% ${cursor.y}%, rgba(255,255,255,0.1) 0%, transparent 50%)`
              ]
            }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          />
        );
    }
  };

  return (
    <div className={`relative w-full h-full ${className}`} style={style}>
      {/* Background Animation Layer */}
      {renderAnimation()}
      
      {/* Text Layer */}
      <svg
        className="absolute inset-0 w-full h-full"
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
      >
        {texts.map((text, index) => {
          const position = positions[index];
          const animationState = animationStates[index];
          
          if (!position || !animationState) return null;
          
          const lines = text.split('\n');
          const { x, y } = position;
          const { visible, pinned, animationProgress } = animationState;
          
          return (
            <motion.g
              key={`test-text-${index}`}
              initial={{ opacity: 0 }}
              animate={{ 
                opacity: visible ? 1 : 0,
                scale: pinned ? 1.1 : 1
              }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
            >
              {lines.map((line, lineIndex) => (
                <motion.text
                  key={lineIndex}
                  x={`${x}%`}
                  y={`${y + (lineIndex * 1.8)}%`}
                  textAnchor="middle"
                  dominantBaseline="middle"
                  fontSize="1.4"
                  fontFamily="monospace"
                  fontWeight={pinned ? "500" : "300"}
                  letterSpacing="0.05em"
                  fill="#ffffff"
                  style={{
                    filter: pinned 
                      ? "brightness(3) contrast(3) drop-shadow(0 0 15px #ffffff) drop-shadow(0 0 30px rgba(255,255,255,0.8))"
                      : "none"
                  }}
                  animate={{
                    opacity: visible ? 1 : 0,
                    fill: pinned ? "#ffffff" : "#888888"
                  }}
                  transition={{ duration: 0.3, ease: "easeInOut" }}
                >
                  {line}
                </motion.text>
              ))}
            </motion.g>
          );
        })}
      </svg>
    </div>
  );
}
