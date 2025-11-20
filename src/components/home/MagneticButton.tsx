import React, { useRef } from 'react';
import { gsap } from 'gsap';
import { useGSAP } from '@gsap/react';

interface MagneticButtonProps {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
  variant?: 'primary' | 'secondary';
}

const MagneticButton = ({ children, className = "", onClick, variant = 'primary' }: MagneticButtonProps) => {
  const buttonRef = useRef<HTMLButtonElement>(null);
  const textRef = useRef<HTMLSpanElement>(null);

  useGSAP(() => {
    const button = buttonRef.current;
    const text = textRef.current;
    if (!button || !text) return;

    // High-performance quickTo for smooth mouse following
    const xTo = gsap.quickTo(button, "x", { duration: 1, ease: "elastic.out(1, 0.3)" });
    const yTo = gsap.quickTo(button, "y", { duration: 1, ease: "elastic.out(1, 0.3)" });
    const xToText = gsap.quickTo(text, "x", { duration: 1, ease: "elastic.out(1, 0.3)" });
    const yToText = gsap.quickTo(text, "y", { duration: 1, ease: "elastic.out(1, 0.3)" });

    const handleMouseMove = (e: React.MouseEvent) => {
      const { clientX, clientY } = e;
      const { height, width, left, top } = button.getBoundingClientRect();
      const x = clientX - (left + width / 2);
      const y = clientY - (top + height / 2);

      // Move button and text at different speeds for parallax depth
      xTo(x * 0.3); 
      yTo(y * 0.3);
      xToText(x * 0.1);
      yToText(y * 0.1);
    };

    const handleMouseLeave = () => {
      xTo(0); yTo(0);
      xToText(0); yToText(0);
    };

    button.addEventListener("mousemove", handleMouseMove as any);
    button.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      button.removeEventListener("mousemove", handleMouseMove as any);
      button.removeEventListener("mouseleave", handleMouseLeave);
    };
  });

  const baseStyles = "relative px-8 py-4 rounded-full font-bold uppercase tracking-widest transition-all overflow-hidden group";
  const variants = {
    primary: "bg-white text-black border border-transparent hover:scale-105",
    secondary: "bg-transparent text-white border border-white/20 hover:bg-white/10 hover:border-cyan-400/50"
  };

  return (
    <button
      ref={buttonRef}
      onClick={onClick}
      className={`${baseStyles} ${variants[variant]} ${className}`}
    >
      {/* Gradient Hover Effect */}
      <div className="absolute inset-0 bg-gradient-to-r from-fuchsia-500/0 via-fuchsia-500/20 to-fuchsia-500/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      
      {/* FIXED LINE BELOW: Removed 'block', kept 'flex' */}
      <span ref={textRef} className="relative z-10 pointer-events-none flex items-center gap-2">
        {children}
      </span>
    </button>
  );
};

export default MagneticButton;