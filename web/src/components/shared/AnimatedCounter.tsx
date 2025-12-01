import { useRef, useEffect, useState } from 'react';

interface AnimatedCounterProps {
  value: number;
  duration?: number;
  suffix?: string;
  className?: string;
}

const AnimatedCounter = ({ value, duration = 2000, suffix = '', className = '' }: AnimatedCounterProps) => {
  const [count, setCount] = useState(0);
  const [hasStarted, setHasStarted] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const frameRef = useRef<number>();

  useEffect(() => {
    const element = ref.current;
    if (!element || hasStarted) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setHasStarted(true);
          
          const startTime = Date.now();
          const animate = () => {
            const now = Date.now();
            const elapsed = now - startTime;
            const progress = Math.min(elapsed / duration, 1);
            
            // Easing function for smooth animation
            const easeOutQuart = 1 - Math.pow(1 - progress, 4);
            const current = Math.floor(value * easeOutQuart);
            
            setCount(current);
            
            if (progress < 1) {
              frameRef.current = requestAnimationFrame(animate);
            }
          };
          
          frameRef.current = requestAnimationFrame(animate);
          observer.unobserve(element); // Stop observing once animation starts
        }
      },
      { threshold: 0.3 } // Increased threshold to be more reliable
    );

    observer.observe(element);

    return () => {
      if (element) {
        observer.unobserve(element);
      }
      if (frameRef.current) {
        cancelAnimationFrame(frameRef.current);
      }
    };
  }, [value, duration]); // Removed hasStarted from dependencies

  return (
    <div ref={ref} className={className}>
      {count}{suffix}
    </div>
  );
};

export default AnimatedCounter;