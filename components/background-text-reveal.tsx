'use client'

import { useState, useEffect, useRef, useCallback } from 'react';
import { motion } from 'motion/react';

interface BackgroundTextRevealSVGProps {
  texts: string[];
  className?: string;
}

interface Position {
  x: number;
  y: number;
}

interface HaikuVisibility {
  visible: boolean;
  timer: NodeJS.Timeout | null;
  pinned: boolean;
  pinnedTimer: NodeJS.Timeout | null;
  fadeOutStage: number; // 0 = normal, 1 = starting fade, 2 = fading, 3 = faded
}

export function BackgroundTextRevealSVG({ texts, className = '' }: BackgroundTextRevealSVGProps) {
  const svgRef = useRef<SVGSVGElement>(null);
  const [cursor, setCursor] = useState({ x: 0, y: 0 });
  const [haikuPositions, setHaikuPositions] = useState<Position[]>([]);
  const [haikuVisibility, setHaikuVisibility] = useState<HaikuVisibility[]>([]);
  const [ripplePosition, setRipplePosition] = useState({ cx: "50%", cy: "50%" });
  const [isInitialized, setIsInitialized] = useState(false);

  // Generate non-colliding positions for haikus
  const generateNonCollidingPositions = useCallback((count: number): Position[] => {
    const positions: Position[] = [];
    const centerRadius = 3; // 6% diameter circle in center - reduced for testing
    const minDistance = 8; // Minimum distance between haikus

    for (let i = 0; i < count; i++) {
      let attempts = 0;
      let position: Position;
      let valid = false;

      while (!valid && attempts < 100) {
        // For the first few haikus, position them closer to center for easier testing
        if (i < 3) {
          position = {
            x: Math.random() * 40 + 30, // 30% to 70% of viewport (closer to center)
            y: Math.random() * 40 + 30,
          };
        } else {
          position = {
            x: Math.random() * 80 + 10, // 10% to 90% of viewport
            y: Math.random() * 80 + 10,
          };
        }

        // Check if position is outside center circle
        const distanceFromCenter = Math.sqrt(
          Math.pow(position.x - 50, 2) + Math.pow(position.y - 50, 2)
        );

        if (distanceFromCenter > centerRadius) {
          // Check if position doesn't collide with existing positions
          valid = positions.every(existingPos => {
            const distance = Math.sqrt(
              Math.pow(position.x - existingPos.x, 2) + Math.pow(position.y - existingPos.y, 2)
            );
            return distance >= minDistance;
          });

          if (valid) {
            positions.push(position);
          }
        }

        attempts++;
      }
    }

    return positions;
  }, []);

  // Initialize haiku positions and visibility
  useEffect(() => {
    const positions = generateNonCollidingPositions(texts.length);
    setHaikuPositions(positions);
    setHaikuVisibility(positions.map(() => ({
      visible: false,
      timer: null,
      pinned: false,
      pinnedTimer: null,
      fadeOutStage: 0
    })));
  }, [texts.length, generateNonCollidingPositions]);

  // Handle mouse movement and haiku visibility
  const handleMouseMove = useCallback((e: MouseEvent) => {
    setCursor({ x: e.clientX, y: e.clientY });
    
    // Update ripple position
    if (svgRef.current) {
      const svgRect = svgRef.current.getBoundingClientRect();
      const cxPercentage = Math.max(0, Math.min(100, ((e.clientX - svgRect.left) / svgRect.width) * 100));
      const cyPercentage = Math.max(0, Math.min(100, ((e.clientY - svgRect.top) / svgRect.height) * 100));

      setRipplePosition({
        cx: `${cxPercentage}%`,
        cy: `${cyPercentage}%`,
      });
      setIsInitialized(true);
    }

    // Update haiku visibility based on cursor proximity
    setHaikuVisibility(prev => prev.map((visibility, index) => {
      const position = haikuPositions[index];
      if (!position) return visibility;

      const distance = Math.sqrt(
        Math.pow((e.clientX / window.innerWidth) * 100 - position.x, 2) +
        Math.pow((e.clientY / window.innerHeight) * 100 - position.y, 2)
      );

      const shouldBeVisible = distance < 8; // 8% radius for reveal

      if (shouldBeVisible) {
        // Clear existing timer when hovering - keep haiku visible
        if (visibility.timer) {
          clearTimeout(visibility.timer);
        }

        return {
          visible: true,
          timer: null, // No timer while hovering
          pinned: visibility.pinned,
          pinnedTimer: visibility.pinnedTimer,
          fadeOutStage: visibility.fadeOutStage
        };
      } else if (visibility.visible && !visibility.pinned) {
        // If cursor moved away and haiku is not pinned, start fade timer
        if (!visibility.timer) {
          return {
            ...visibility,
            timer: setTimeout(() => {
              setHaikuVisibility(prev => prev.map((v, i) => 
                i === index ? { ...v, visible: false, timer: null } : v
              ));
            }, 2000) // 2 seconds persistence after cursor leaves
          };
        }
      }

      return visibility;
    }));
  }, [haikuPositions]);

  // Handle click to pin haiku
  const handleClick = useCallback((e: MouseEvent) => {
    const clickX = (e.clientX / window.innerWidth) * 100;
    const clickY = (e.clientY / window.innerHeight) * 100;
    
    console.log('🎯 Click detected at:', clickX, clickY);
    
    haikuPositions.forEach((position, index) => {
      const distance = Math.sqrt(
        Math.pow(clickX - position.x, 2) + Math.pow(clickY - position.y, 2)
      );
      
      console.log(`🎯 Haiku ${index} at (${position.x}, ${position.y}), distance: ${distance.toFixed(2)}`);
      
      if (distance < 15) { // Within haiku area - increased radius for easier testing
        console.log(`🎯 Pinning haiku ${index} for 5 seconds`);
        setHaikuVisibility(prev => prev.map((visibility, i) => {
          if (i === index) {
            // Clear existing timers
            if (visibility.timer) clearTimeout(visibility.timer);
            if (visibility.pinnedTimer) clearTimeout(visibility.pinnedTimer);
            
            // Pin this haiku for 5 seconds
            console.log(`🎯 Setting haiku ${index} to pinned: true`);
            return {
              visible: true,
              timer: null,
              pinned: true,
              fadeOutStage: 0,
              pinnedTimer: setTimeout(() => {
                console.log(`🎯 Starting modular fade-out for haiku ${index}`);
                // Start the modular fade-out process
                setHaikuVisibility(prev => prev.map((v, idx) => 
                  idx === index ? { ...v, pinned: false, pinnedTimer: null, fadeOutStage: 1 } : v
                ));
                
                // Create staggered fade-out for each line
                const lines = texts[index].split('\n');
                lines.forEach((_, lineIndex) => {
                  setTimeout(() => {
                    setHaikuVisibility(prev => prev.map((v, idx) => 
                      idx === index ? { ...v, fadeOutStage: 2 } : v
                    ));
                  }, lineIndex * 200); // 200ms delay between each line
                });
                
                // Final fade-out after all lines have started fading
                setTimeout(() => {
                  setHaikuVisibility(prev => prev.map((v, idx) => 
                    idx === index ? { ...v, fadeOutStage: 3, visible: false } : v
                  ));
                }, lines.length * 200 + 1000); // 1 second after last line starts fading
              }, 5000) // 5 seconds for testing
            };
          }
          return visibility;
        }));
      }
    });
  }, [haikuPositions]);

  // Add event listeners
  useEffect(() => {
    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('click', handleClick);
    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('click', handleClick);
    };
  }, [handleMouseMove, handleClick]);

  // Cleanup timers on unmount
  useEffect(() => {
    return () => {
      haikuVisibility.forEach(visibility => {
        if (visibility.timer) {
          clearTimeout(visibility.timer);
        }
        if (visibility.pinnedTimer) {
          clearTimeout(visibility.pinnedTimer);
        }
      });
    };
  }, [haikuVisibility]);

  return (
    <svg
      ref={svgRef}
      className={`fixed inset-0 w-full h-full pointer-events-none z-[120] ${className}`}
      viewBox="0 0 100 100"
      preserveAspectRatio="none"
    >
      <defs>
        {/* Magical ripple gradient */}
        <motion.radialGradient
          id="magicalGradient"
          gradientUnits="userSpaceOnUse"
          r="25%"
          cx={ripplePosition.cx}
          cy={ripplePosition.cy}
          animate={isInitialized ? ripplePosition : { cx: "50%", cy: "50%" }}
          transition={{ duration: 0.3, ease: "circOut" }}
        >
          <stop offset="0%" stopColor="#ffffff" />
          <stop offset="30%" stopColor="#ffffff" />
          <stop offset="70%" stopColor="#f0f0f0" />
          <stop offset="100%" stopColor="#e0e0e0" />
        </motion.radialGradient>

        {/* Direct ripple mask for magical reveal - center is bright */}
        <motion.radialGradient
          id="directRippleMask"
          gradientUnits="userSpaceOnUse"
          r="30%"
          cx={ripplePosition.cx}
          cy={ripplePosition.cy}
          animate={isInitialized ? ripplePosition : { cx: "50%", cy: "50%" }}
          transition={{
            duration: 0.4,
            ease: "easeOut",
            type: "spring",
            stiffness: 150,
            damping: 20
          }}
        >
          <stop offset="0%" stopColor="white" />
          <stop offset="70%" stopColor="white" />
          <stop offset="100%" stopColor="black" />
        </motion.radialGradient>

        <mask id="magicalRevealMask">
          <rect
            x="0"
            y="0"
            width="100"
            height="100"
            fill="black"
          />
          <circle
            cx={ripplePosition.cx}
            cy={ripplePosition.cy}
            r="25%"
            fill="url(#directRippleMask)"
          />
        </mask>
      </defs>

      {/* Render haikus */}
      {texts.map((text, index) => {
        const position = haikuPositions[index];
        const visibility = haikuVisibility[index];
        
        if (!position || !visibility) return null;

        const lines = text.split('\n');
        const { x, y } = position;
        const isVisible = visibility.visible;
        const isPinned = visibility.pinned;
        const fadeOutStage = visibility.fadeOutStage;
        
        // Debug logging for all haikus
        if (isPinned || fadeOutStage > 0) {
          console.log(`🎯 HAIKU ${index} - visible: ${isVisible}, pinned: ${isPinned}, fadeOutStage: ${fadeOutStage}`);
        }

        return (
          <motion.g
            key={`haiku-${index}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: isVisible ? 1 : 0 }}
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
                fontWeight={isPinned ? "500" : "300"}
                letterSpacing="0.05em"
                fill={isPinned ? "#ffffff" : "#ffffff"}
                mask={isPinned ? undefined : "url(#magicalRevealMask)"}
                style={{ 
                  filter: isPinned ? "brightness(3) contrast(3) drop-shadow(0 0 15px #ffffff) drop-shadow(0 0 30px rgba(255,255,255,0.8))" : "none"
                }}
                animate={{ 
                  opacity: fadeOutStage === 3 ? 0 : (isVisible ? 1 : 0),
                  fill: fadeOutStage === 2 ? "#d4a574" : "#ffffff", // Warm brown with yellow undertone during fade-out
                  scale: fadeOutStage === 1 ? 1.05 : 1, // Slight scale up when starting fade
                  y: fadeOutStage === 2 ? lineIndex * 0.2 : 0 // Slight vertical drift during fade
                }}
                transition={{ 
                  duration: fadeOutStage === 2 ? 1.2 : 0.8, 
                  ease: fadeOutStage === 2 ? "easeIn" : "easeInOut",
                  delay: isPinned ? lineIndex * 0.1 : (fadeOutStage === 2 ? lineIndex * 0.2 : 0)
                }}
              >
                {line}
              </motion.text>
            ))}
          </motion.g>
        );
      })}
    </svg>
  );
}