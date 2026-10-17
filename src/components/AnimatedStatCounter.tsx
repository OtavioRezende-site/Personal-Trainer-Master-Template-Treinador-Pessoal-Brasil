import React, { useEffect, useRef, useState } from 'react';
import { useInView, animate } from 'motion/react';

interface AnimatedStatCounterProps {
  numberStr: string;
  label: string;
}

export const AnimatedStatCounter: React.FC<AnimatedStatCounterProps> = ({ numberStr, label }) => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: false, margin: '-40px' });
  const [displayValue, setDisplayValue] = useState('0');

  useEffect(() => {
    if (!isInView) {
      setDisplayValue('0');
      return;
    }

    // Check if it's "12+"
    if (numberStr.includes('12')) {
      const controls = animate(0, 12, {
        duration: 1.8,
        ease: [0.16, 1, 0.3, 1],
        onUpdate: (latest) => {
          setDisplayValue(`${Math.round(latest)}+`);
        },
      });
      return () => controls.stop();
    }

    // Check if it's "100%"
    if (numberStr.includes('100')) {
      const controls = animate(0, 100, {
        duration: 2.0,
        ease: [0.16, 1, 0.3, 1],
        onUpdate: (latest) => {
          setDisplayValue(`${Math.round(latest)}%`);
        },
      });
      return () => controls.stop();
    }

    // If it's "Zero" or other word
    if (numberStr.toLowerCase() === 'zero' || numberStr === '0') {
      const words = ['3', '2', '1', 'Zero'];
      let step = 0;
      setDisplayValue('0');
      const interval = setInterval(() => {
        step++;
        if (step < words.length) {
          setDisplayValue(words[step]);
        } else {
          setDisplayValue('Zero');
          clearInterval(interval);
        }
      }, 350);
      return () => clearInterval(interval);
    }

    // Generic numeric parser fallback
    const numericMatch = numberStr.match(/\d+/);
    if (numericMatch) {
      const target = parseInt(numericMatch[0], 10);
      const suffix = numberStr.replace(/\d+/, '');
      const controls = animate(0, target, {
        duration: 1.8,
        ease: [0.16, 1, 0.3, 1],
        onUpdate: (latest) => {
          setDisplayValue(`${Math.round(latest)}${suffix}`);
        },
      });
      return () => controls.stop();
    }

    setDisplayValue(numberStr);
  }, [isInView, numberStr]);

  return (
    <div ref={ref} className="flex flex-col group select-none">
      <div className="flex items-baseline gap-1">
        <span className="text-3xl md:text-5xl font-black text-[#F5F4F0] group-hover:text-[#CCFF00] transition-colors font-mono tabular-nums tracking-tight">
          {displayValue}
        </span>
      </div>
      <span className="text-xs sm:text-sm text-[#9E9C96] group-hover:text-[#F5F4F0] transition-colors mt-1.5 font-medium">
        {label}
      </span>
    </div>
  );
};
