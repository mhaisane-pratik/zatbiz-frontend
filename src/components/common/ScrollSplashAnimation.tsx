'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';

export default function ScrollSplashAnimation() {
  const containerRef = useRef<HTMLDivElement>(null);
  const stickyRef = useRef<HTMLDivElement>(null);
  
  // Image refs for direct DOM manipulation (high performance)
  const img1Ref = useRef<HTMLDivElement>(null);
  const img2Ref = useRef<HTMLDivElement>(null);
  const img3Ref = useRef<HTMLDivElement>(null);
  
  // Text group refs
  const text1Ref = useRef<HTMLDivElement>(null);
  const text2Ref = useRef<HTMLDivElement>(null);
  const text3Ref = useRef<HTMLDivElement>(null);

  // Background glow ref
  const glowRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current || !stickyRef.current) return;
      
      const container = containerRef.current;
      const rect = container.getBoundingClientRect();
      const containerTop = rect.top + window.scrollY;
      const containerHeight = container.offsetHeight;
      const windowHeight = window.innerHeight;
      
      // Calculate scroll progress through the container (0 to 1)
      const scrollRange = containerHeight - windowHeight;
      const relativeScroll = window.scrollY - containerTop;
      
      let progress = relativeScroll / scrollRange;
      progress = Math.max(0, Math.min(1, progress)); // Clamp between 0 and 1
      
      // Update image opacities
      // Image 1: Fades out from 1 to 0 between progress 0.0 and 0.4
      const opacity1 = Math.max(0, Math.min(1, 1 - progress / 0.35));
      
      // Image 2: Fades in from 0 to 1 between 0.15 and 0.45, then fades out to 0 between 0.55 and 0.85
      let opacity2 = 0;
      if (progress < 0.5) {
        opacity2 = Math.max(0, Math.min(1, (progress - 0.15) / 0.3));
      } else {
        opacity2 = Math.max(0, Math.min(1, 1 - (progress - 0.55) / 0.3));
      }
      
      // Image 3: Fades in from 0 to 1 between 0.65 and 0.95
      const opacity3 = Math.max(0, Math.min(1, (progress - 0.65) / 0.3));

      // Direct DOM style updates for performance (avoid react re-render lag)
      if (img1Ref.current) img1Ref.current.style.opacity = opacity1.toString();
      if (img2Ref.current) img2Ref.current.style.opacity = opacity2.toString();
      if (img3Ref.current) img3Ref.current.style.opacity = opacity3.toString();

      // Update text opacities and vertical shifts for a slide-up effect
      // Text 1: Active in [0.0, 0.35]
      let text1Opacity = 1;
      let text1Transform = 0;
      if (progress > 0.25) {
        text1Opacity = Math.max(0, 1 - (progress - 0.25) / 0.15);
        text1Transform = -30 * ((progress - 0.25) / 0.15);
      }
      if (text1Ref.current) {
        text1Ref.current.style.opacity = text1Opacity.toString();
        text1Ref.current.style.transform = `translateY(${text1Transform}px)`;
        text1Ref.current.style.pointerEvents = text1Opacity > 0.1 ? 'auto' : 'none';
      }

      // Text 2: Active in [0.35, 0.65]
      let text2Opacity = 0;
      let text2Transform = 30; // Start below
      if (progress > 0.25 && progress <= 0.55) {
        text2Opacity = Math.max(0, Math.min(1, (progress - 0.25) / 0.15));
        text2Transform = 30 - (30 * ((progress - 0.25) / 0.15));
      } else if (progress > 0.55) {
        text2Opacity = Math.max(0, 1 - (progress - 0.55) / 0.15);
        text2Transform = -30 * ((progress - 0.55) / 0.15);
      }
      if (text2Ref.current) {
        text2Ref.current.style.opacity = text2Opacity.toString();
        text2Ref.current.style.transform = `translateY(${text2Transform}px)`;
        text2Ref.current.style.pointerEvents = text2Opacity > 0.1 ? 'auto' : 'none';
      }

      // Text 3: Active in [0.65, 1.0]
      let text3Opacity = 0;
      let text3Transform = 30;
      if (progress > 0.6) {
        text3Opacity = Math.max(0, Math.min(1, (progress - 0.6) / 0.2));
        text3Transform = 30 - (30 * ((progress - 0.6) / 0.2));
      }
      if (text3Ref.current) {
        text3Ref.current.style.opacity = text3Opacity.toString();
        text3Ref.current.style.transform = `translateY(${text3Transform}px)`;
        text3Ref.current.style.pointerEvents = text3Opacity > 0.1 ? 'auto' : 'none';
      }

      // Background ambient glow shift (white -> rose/pink -> slate/white)
      if (glowRef.current) {
        // We'll interpolate a pink glow gradient base based on progress
        const intensity = Math.sin(progress * Math.PI); // Peaks at progress = 0.5
        glowRef.current.style.opacity = (intensity * 0.45).toString();
      }
    };

    window.addEventListener('scroll', handleScroll);
    window.addEventListener('resize', handleScroll);
    
    // Run once initially
    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
    };
  }, []);

  return (
    <div ref={containerRef} className="relative w-full h-[280vh] bg-slate-50/30">
      {/* Sticky container */}
      <div 
        ref={stickyRef} 
        className="sticky top-0 left-0 w-full h-screen overflow-hidden flex items-center justify-center bg-white border-y border-slate-100 transition-colors duration-500"
      >
        {/* Dynamic Rose/Pink ambient glow backdrop */}
        <div 
          ref={glowRef}
          className="absolute inset-0 bg-gradient-to-r from-rose-100/30 via-pink-100/40 to-indigo-100/30 transition-opacity duration-300 pointer-events-none"
          style={{ opacity: 0 }}
        />

        <div className="max-w-7xl w-full mx-auto px-6 md:px-12 lg:px-16 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center relative z-10">
          
          {/* Left Column: Sequential text showcase */}
          <div className="lg:col-span-5 relative h-[250px] md:h-[300px] flex items-center">
            
            {/* Slide 1 Text */}
            <div 
              ref={text1Ref} 
              className="absolute inset-0 flex flex-col justify-center transition-all duration-100 ease-out"
            >
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-rose-50 border border-rose-100 text-rose-600 rounded-full text-[10px] font-bold uppercase tracking-wider mb-4 w-fit">
                ✨ Stunning Brand Presence
              </div>
              <h2 className="text-3xl md:text-5xl font-black text-slate-900 leading-tight mb-4">
                Uncompromisingly<br />
                Beautiful Design.
              </h2>
              <p className="text-slate-500 text-sm font-semibold leading-relaxed max-w-md">
                Make your store stand out with eye-catching product showcases. Build premium shopping experiences that turn visitors into brand advocates.
              </p>
            </div>

            {/* Slide 2 Text */}
            <div 
              ref={text2Ref} 
              className="absolute inset-0 flex flex-col justify-center transition-all duration-100 ease-out opacity-0 pointer-events-none"
            >
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-pink-50 border border-pink-100 text-pink-650 rounded-full text-[10px] font-bold uppercase tracking-wider mb-4 w-fit">
                💦 Fluid Interactions
              </div>
              <h2 className="text-3xl md:text-5xl font-black text-slate-900 leading-tight mb-4">
                Smooth Splash<br />
                Animations.
              </h2>
              <p className="text-slate-500 text-sm font-semibold leading-relaxed max-w-md">
                Delight your customers with organic, responsive micro-animations. Connect them emotionally to your product details as they browse.
              </p>
            </div>

            {/* Slide 3 Text */}
            <div 
              ref={text3Ref} 
              className="absolute inset-0 flex flex-col justify-center transition-all duration-100 ease-out opacity-0 pointer-events-none"
            >
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-indigo-50 border border-indigo-100 text-indigo-650 rounded-full text-[10px] font-bold uppercase tracking-wider mb-4 w-fit">
                🚀 High-Growth eCommerce
              </div>
              <h2 className="text-3xl md:text-5xl font-black text-slate-900 leading-tight mb-4">
                Tailored for<br />
                Modern Brands.
              </h2>
              <p className="text-slate-500 text-sm font-semibold leading-relaxed max-w-md mb-6">
                Ready to take your business to the next level? Get started with ZatBiz and launch fully-functional, beautiful stores in minutes.
              </p>
              <button 
                onClick={() => {
                  document.getElementById('footer-cta')?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="px-5 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-full text-xs font-bold w-fit shadow-md shadow-indigo-600/10 transition-transform active:scale-[0.98]"
              >
                Create Your Account
              </button>
            </div>

          </div>

          {/* Right Column: Visual cross-fading frames */}
          <div className="lg:col-span-7 flex justify-center items-center relative h-[300px] md:h-[500px] w-full">
            {/* Ambient shadow backplate */}
            <div className="absolute w-[80%] h-[80%] rounded-[32px] bg-gradient-to-tr from-pink-500/5 to-indigo-500/5 blur-3xl -z-10" />

            {/* Frame 1 Container */}
            <div 
              ref={img1Ref}
              className="absolute inset-0 w-full h-full flex items-center justify-center transition-opacity duration-75 ease-out"
            >
              <div className="relative w-full h-full max-w-[550px] max-h-[310px] md:max-h-[350px] rounded-3xl overflow-hidden shadow-2xl border border-white/40 ring-1 ring-slate-100">
                <Image 
                  src="/media__1782712894721.jpg" 
                  alt="ZatBiz Splash Frame 1"
                  fill
                  sizes="(max-width: 768px) 100vw, 550px"
                  className="object-cover"
                  priority
                />
              </div>
            </div>

            {/* Frame 2 Container */}
            <div 
              ref={img2Ref}
              className="absolute inset-0 w-full h-full flex items-center justify-center transition-opacity duration-75 ease-out opacity-0"
            >
              <div className="relative w-full h-full max-w-[550px] max-h-[310px] md:max-h-[350px] rounded-3xl overflow-hidden shadow-2xl border border-white/40 ring-1 ring-slate-100">
                <Image 
                  src="/media__1782712894727.jpg" 
                  alt="ZatBiz Splash Frame 2"
                  fill
                  sizes="(max-width: 768px) 100vw, 550px"
                  className="object-cover"
                />
              </div>
            </div>

            {/* Frame 3 Container */}
            <div 
              ref={img3Ref}
              className="absolute inset-0 w-full h-full flex items-center justify-center transition-opacity duration-75 ease-out opacity-0"
            >
              <div className="relative w-full h-full max-w-[550px] max-h-[310px] md:max-h-[350px] rounded-3xl overflow-hidden shadow-2xl border border-white/40 ring-1 ring-slate-100">
                <Image 
                  src="/media__1782712894729.jpg" 
                  alt="ZatBiz Splash Frame 3"
                  fill
                  sizes="(max-width: 768px) 100vw, 550px"
                  className="object-cover"
                />
              </div>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
}
