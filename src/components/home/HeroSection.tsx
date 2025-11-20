import React, { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import SplitType from 'split-type'; // npm install split-type

// Register Plugins
gsap.registerPlugin(ScrollTrigger);

// --- TYPES ---
interface EnhancedStatItem {
  number: string | number;
  label: string;
  suffix?: string;
}

// --- 1. GLITCH REVEAL (For Badge) ---
const GlitchReveal = ({ children, delay = 0, className = "" }: { children: React.ReactNode, delay?: number, className?: string }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const elementRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const tl = gsap.timeline({ scrollTrigger: { trigger: containerRef.current, start: "top 85%" } });
    tl.fromTo(elementRef.current, 
      { y: 100, opacity: 0, skewY: 10, filter: "blur(10px) drop-shadow(10px 0px 0px rgba(255,0,0,0.5)) drop-shadow(-10px 0px 0px rgba(0,255,255,0.5))" },
      { y: 0, opacity: 1, skewY: 0, filter: "blur(0px) drop-shadow(0px 0px 0px rgba(255,0,0,0)) drop-shadow(0px 0px 0px rgba(0,255,255,0))", duration: 1.2, ease: "power4.out", delay: delay }
    );
  }, [delay]);

  return (
    <div ref={containerRef} className={`overflow-hidden ${className}`}>
      <div ref={elementRef} className="transform-gpu will-change-transform">{children}</div>
    </div>
  );
};

// --- 2. SCRAMBLE TEXT (For Mastery) ---
const ScrambleText = ({ text }: { text: string }) => {
  const ref = useRef<HTMLSpanElement>(null);
  useGSAP(() => {
    const chars = "ABCXYZ012#!@&";
    const tl = gsap.timeline({ scrollTrigger: { trigger: ref.current, start: "top 80%" } });
    const obj = { val: 0 };
    tl.to(obj, {
      val: 1, duration: 1, ease: "none",
      onUpdate: () => {
        const len = Math.floor(obj.val * text.length);
        if(ref.current) ref.current.innerText = text.substring(0, len) + chars[Math.floor(Math.random() * chars.length)];
      },
      onComplete: () => { if(ref.current) ref.current.innerText = text; }
    });
  }, [text]);
  return <span ref={ref}>{text}</span>;
};

// --- 3. NEW: INTERACTIVE HERO TEXT (The Core Upgrade) ---
const InteractiveHeroText = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);

  useGSAP(() => {
    if (!titleRef.current || !subtitleRef.current) return;

    // A. MEDICAL REVEAL (Masked Stagger)
    const titleSplit = new SplitType(titleRef.current, { types: 'chars' });
    gsap.fromTo(titleSplit.chars, 
      { y: 150, rotate: 10, opacity: 0 },
      { y: 0, rotate: 0, opacity: 1, duration: 1.5, stagger: 0.05, ease: "power4.out", delay: 0.2 }
    );

    // B. MASTERY REVEAL (Zoom & Blur)
    gsap.fromTo(".mastery-text",
      { scale: 1.5, opacity: 0, filter: "blur(20px)" },
      { scale: 1, opacity: 1, filter: "blur(0px)", duration: 1.2, delay: 0.8, ease: "circ.out" }
    );

    // C. SUBTITLE PHYSICS (Magnetic Wave)
    const subtitleSplit = new SplitType(subtitleRef.current, { types: 'words' });
    
    // Entrance
    gsap.fromTo(subtitleSplit.words,
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.8, stagger: 0.02, delay: 1.2, ease: "power2.out" }
    );

    // Interactive Hover
    subtitleSplit.words?.forEach((word) => {
      word.style.position = 'relative';
      word.style.display = 'inline-block';
      word.style.cursor = 'default';
      
      word.addEventListener('mouseenter', () => {
        gsap.to(word, { y: -10, scale: 1.1, color: "#22d3ee", textShadow: "0 0 10px rgba(34,211,238,0.5)", duration: 0.3, ease: "back.out(2)" });
      });
      word.addEventListener('mouseleave', () => {
        gsap.to(word, { y: 0, scale: 1, color: "#9ca3af", textShadow: "none", duration: 0.5, ease: "power2.in" });
      });
    });

  }, { scope: containerRef });

  return (
    <div ref={containerRef} className="flex flex-col items-center text-center z-20 relative mb-8">
      {/* Masked Title */}
      <div className="relative overflow-hidden mb-2 py-2">
         <h1 ref={titleRef} className="text-7xl md:text-9xl font-black tracking-tighter text-white leading-[0.85] mix-blend-screen" style={{ clipPath: 'polygon(0 0, 100% 0, 100% 150%, 0% 150%)' }}>
           MEDICAL
         </h1>
      </div>

      {/* Glitch/Zoom Title */}
      <div className="overflow-visible">
        <h1 className="mastery-text text-7xl md:text-9xl font-black tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-fuchsia-500 via-white to-cyan-500 leading-[0.9] pb-4 will-change-transform">
            <ScrambleText text="MASTERY" />
        </h1>
      </div>

      {/* Interactive Subtitle */}
      <div className="mt-8 max-w-xl mx-auto">
        <p ref={subtitleRef} className="text-lg md:text-xl text-gray-400 font-medium leading-relaxed">
          Next-generation infrastructure for the world's most ambitious healthcare providers.
        </p>
      </div>
    </div>
  );
};

// --- 4. 3D TILT CARD ---
const TiltCard: React.FC<{ stat: EnhancedStatItem; index: number }> = ({ stat, index }) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const card = cardRef.current;
    if (!card) return;

    const xTo = gsap.quickTo(card, "rotationY", { duration: 0.5, ease: "power3" });
    const yTo = gsap.quickTo(card, "rotationX", { duration: 0.5, ease: "power3" });

    const handleMouseMove = (e: MouseEvent) => {
      const rect = card.getBoundingClientRect();
      const xPct = (e.clientX - rect.left) / rect.width - 0.5;
      const yPct = (e.clientY - rect.top) / rect.height - 0.5;
      xTo(xPct * 20); yTo(-yPct * 20);
    };

    const handleLeave = () => { xTo(0); yTo(0); };

    card.addEventListener("mousemove", handleMouseMove);
    card.addEventListener("mouseleave", handleLeave);

    gsap.fromTo(card, 
      { y: 100, opacity: 0 },
      { y: 0, opacity: 1, duration: 1, delay: 1.5 + (index * 0.1), ease: "expo.out", scrollTrigger: { trigger: card, start: "top 95%" } }
    );

    return () => {
      card.removeEventListener("mousemove", handleMouseMove);
      card.removeEventListener("mouseleave", handleLeave);
    };
  }, []);

  return (
    <div style={{ perspective: 1000 }} className="w-full h-full">
      <div ref={cardRef} className="relative h-full overflow-hidden bg-black/60 backdrop-blur-xl border border-white/10 p-8 transform-style-3d transition-colors duration-500 group hover:border-fuchsia-500/50 hover:bg-white/5">
        <div className="absolute inset-0 bg-gradient-to-br from-fuchsia-600/20 to-cyan-600/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        <div ref={contentRef} className="relative z-10 flex flex-col items-center justify-center translate-z-20">
            <div className="text-5xl md:text-6xl font-black mb-2 tracking-tighter text-white group-hover:scale-110 transition-transform duration-300">
              {stat.number}<span className="text-fuchsia-500 text-3xl align-top">{stat.suffix}</span>
            </div>
            <div className="text-xs font-bold uppercase tracking-[0.3em] text-gray-500 group-hover:text-cyan-400 transition-colors">{stat.label}</div>
        </div>
        <div className="absolute top-0 left-0 w-3 h-3 border-t border-l border-white/30 group-hover:border-fuchsia-500 transition-colors" />
        <div className="absolute bottom-0 right-0 w-3 h-3 border-b border-r border-white/30 group-hover:border-cyan-500 transition-colors" />
      </div>
    </div>
  );
};

// --- 5. LIQUID BACKGROUND ---
const LiquidBackground = () => {
  const blob1 = useRef(null);
  const blob2 = useRef(null);

  useGSAP(() => {
    gsap.to(blob1.current, { x: "random(-100, 100)", y: "random(-100, 100)", scale: "random(0.8, 1.2)", duration: "random(3, 5)", repeat: -1, yoyo: true, ease: "sine.inOut" });
    gsap.to(blob2.current, { x: "random(-100, 100)", y: "random(-100, 100)", scale: "random(0.8, 1.2)", duration: "random(3, 5)", repeat: -1, yoyo: true, ease: "sine.inOut", delay: 1 });
  });

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
       <div ref={blob1} className="absolute top-1/4 left-1/4 w-[50vw] h-[50vw] bg-fuchsia-600/20 rounded-full blur-[120px] mix-blend-screen" />
       <div ref={blob2} className="absolute bottom-1/4 right-1/4 w-[50vw] h-[50vw] bg-cyan-600/20 rounded-full blur-[120px] mix-blend-screen" />
       <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 brightness-100 contrast-150" />
    </div>
  );
};

// --- MAIN HERO SECTION ---
export const HeroSection: React.FC = () => {
  const containerRef = useRef<HTMLElement>(null);
  const buttonGroupRef = useRef<HTMLDivElement>(null);

  const stats: EnhancedStatItem[] = [
    { number: '500', label: 'Providers', suffix: '+' },
    { number: '98', label: 'Uptime', suffix: '%' },
    { number: '24', label: 'Support', suffix: '/7' },
    { number: '10k', label: 'Patients', suffix: '' }
  ];

  useGSAP(() => {
    gsap.fromTo(buttonGroupRef.current, 
      { y: 50, opacity: 0 },
      { y: 0, opacity: 1, duration: 1, delay: 1.8, ease: "elastic.out(1, 0.5)" } // Delayed to match text
    );
  }, { scope: containerRef });

  return (
    <section ref={containerRef} className="relative min-h-screen flex flex-col justify-center items-center bg-[#050505] text-white overflow-hidden selection:bg-cyan-500 selection:text-black">
      
      <LiquidBackground />

      <div className="relative z-10 max-w-7xl mx-auto px-6 w-full flex flex-col items-center pt-20">
        
        {/* Badge */}
        <div className="mb-6 overflow-hidden">
          <GlitchReveal delay={0}>
            <div className="px-3 py-1 border border-white/20 rounded-full bg-white/5 backdrop-blur-md flex items-center gap-2">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse shadow-[0_0_10px_#22c55e]" />
              <span className="text-[10px] font-mono uppercase tracking-widest text-gray-300">System Operational</span>
            </div>
          </GlitchReveal>
        </div>

        {/* REPLACED: Old Text with New Interactive Component */}
        <InteractiveHeroText />

        {/* Buttons */}
        <div ref={buttonGroupRef} className="flex flex-col sm:flex-row gap-4 mt-8 mb-20 opacity-0">
           <button className="group relative px-8 py-4 bg-white text-black font-bold uppercase tracking-widest overflow-hidden rounded-none hover:scale-[1.02] transition-transform duration-200">
              <div className="absolute inset-0 bg-cyan-400 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-in-out" />
              <span className="relative z-10 flex items-center gap-2">
                Start Now <span className="text-xl leading-none">→</span>
              </span>
           </button>
           <button className="px-8 py-4 border border-white/20 text-white font-bold uppercase tracking-widest hover:bg-white/10 hover:border-white/50 transition-all rounded-none">
              View Demo
           </button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 w-full max-w-6xl border-t border-white/10 pt-16">
          {stats.map((stat, i) => (
            <div key={i} className="h-40">
              <TiltCard stat={stat} index={i} />
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};