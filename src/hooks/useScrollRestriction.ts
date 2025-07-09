import { useEffect, useRef } from 'react';

interface UseScrollRestrictionProps {
  maxAllowedScroll: number;
  isUnlocked: boolean;
}

export const useScrollRestriction = ({ maxAllowedScroll, isUnlocked }: UseScrollRestrictionProps) => {
  const lastValidScrollRef = useRef(0);
  const isBlockingRef = useRef(false);

  useEffect(() => {
    const handleScroll = (event: Event) => {
      const currentScroll = window.scrollY;
      
      // If Part 2 is unlocked, allow free scrolling
      if (isUnlocked) {
        lastValidScrollRef.current = currentScroll;
        return;
      }

      // Check if user is trying to scroll beyond the limit
      if (currentScroll > maxAllowedScroll) {
        // Prevent the scroll and reset to max allowed position
        event.preventDefault();
        isBlockingRef.current = true;
        
        // Smooth scroll back to the boundary
        window.scrollTo({
          top: maxAllowedScroll,
          behavior: 'smooth'
        });
        
        // Reset blocking flag after animation
        setTimeout(() => {
          isBlockingRef.current = false;
        }, 500);
      } else {
        lastValidScrollRef.current = currentScroll;
      }
    };

    const handleWheel = (event: WheelEvent) => {
      if (isUnlocked) return;
      
      const currentScroll = window.scrollY;
      const scrollingDown = event.deltaY > 0;
      
      // Block wheel events that would scroll past the limit
      if (scrollingDown && currentScroll >= maxAllowedScroll - 50) {
        event.preventDefault();
        isBlockingRef.current = true;
        
        // Add a little bounce effect
        window.scrollTo({
          top: maxAllowedScroll,
          behavior: 'smooth'
        });
        
        setTimeout(() => {
          isBlockingRef.current = false;
        }, 300);
      }
    };

    const handleKeydown = (event: KeyboardEvent) => {
      if (isUnlocked) return;
      
      const currentScroll = window.scrollY;
      const scrollKeys = ['ArrowDown', 'PageDown', 'End', 'Space'];
      
      // Block keyboard scrolling past the limit
      if (scrollKeys.includes(event.key) && currentScroll >= maxAllowedScroll - 50) {
        event.preventDefault();
      }
    };

    // Add event listeners
    window.addEventListener('scroll', handleScroll, { passive: false });
    window.addEventListener('wheel', handleWheel, { passive: false });
    window.addEventListener('keydown', handleKeydown, { passive: false });

    // Cleanup
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('wheel', handleWheel);
      window.removeEventListener('keydown', handleKeydown);
    };
  }, [maxAllowedScroll, isUnlocked]);

  return {
    isBlocking: isBlockingRef.current,
    lastValidScroll: lastValidScrollRef.current
  };
}; 