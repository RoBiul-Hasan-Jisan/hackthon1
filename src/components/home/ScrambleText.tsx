import React, { useRef } from 'react';
import { gsap } from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const ScrambleText = ({ text, className = "" }: { text: string, className?: string }) => {
  const elementRef = useRef<HTMLSpanElement>(null);
  
  useGSAP(() => {
    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()";
    const duration = 1;
    
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: elementRef.current,
        start: "top 85%",
      }
    });

    const scrambleObj = { value: 0 };

    tl.to(scrambleObj, {
      value: 1,
      duration: duration,
      ease: "none",
      onUpdate: () => {
        const progress = scrambleObj.value;
        const length = text.length;
        const revealedLength = Math.floor(progress * length);
        
        let result = text.substring(0, revealedLength);
        
        for (let i = revealedLength; i < length; i++) {
            result += chars[Math.floor(Math.random() * chars.length)];
        }
        
        if (elementRef.current) {
          elementRef.current.innerText = result;
        }
      }
    });
  }, [text]);

  return <span ref={elementRef} className={`font-mono ${className}`}>{text}</span>;
};

export default ScrambleText;