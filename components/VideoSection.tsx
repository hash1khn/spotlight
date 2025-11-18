"use client"
import { useMemo, useEffect, useRef, useState } from "react";

const VideoSection = () => {
  const videoId = "qWmIMvj2vsQ";
  const [isVisible, setIsVisible] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  
  useEffect(() => {
    setIsMounted(true);
    
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
          }
        });
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  // Helper function to round values to prevent hydration mismatches
  const round = (value: number, decimals: number = 2) => {
    return Math.round(value * Math.pow(10, decimals)) / Math.pow(10, decimals);
  };

  // Generate lighter glitter positions - only on client to avoid hydration mismatch
  const glitterParticles = useMemo(() => {
    if (!isMounted) return [];
    return Array.from({ length: 25 }, (_, i) => {
      const seed = i * 0.618; // Golden ratio for better distribution
      return {
        left: round((Math.sin(seed) * 0.5 + 0.5) * 100, 2),
        top: round((Math.cos(seed * 1.3) * 0.5 + 0.5) * 100, 2),
        size: round((Math.sin(seed * 2) * 0.5 + 0.5) * 2.5 + 1.5, 2),
        delay: round((Math.sin(seed * 3) * 0.5 + 0.5) * 3, 2),
        duration: round((Math.sin(seed * 4) * 0.5 + 0.5) * 1.5 + 1.5, 2),
        glow: round((Math.sin(seed * 5) * 0.5 + 0.5) * 3 + 2, 2),
      };
    });
  }, [isMounted]);

  const sparkleParticles = useMemo(() => {
    if (!isMounted) return [];
    return Array.from({ length: 12 }, (_, i) => {
      const seed = i * 0.732; // Different seed for variety
      return {
        left: round((Math.cos(seed) * 0.5 + 0.5) * 100, 2),
        top: round((Math.sin(seed * 1.7) * 0.5 + 0.5) * 100, 2),
        delay: round((Math.cos(seed * 2) * 0.5 + 0.5) * 4, 2),
        duration: round((Math.cos(seed * 3) * 0.5 + 0.5) * 2 + 2, 2),
      };
    });
  }, [isMounted]);
  
  return (
    <section ref={sectionRef} id="trailer" className="relative py-20 overflow-hidden">
      {/* Minimal gradient background */}
      <div className="absolute inset-0 bg-gradient-to-b from-secondary/20 via-secondary/15 to-secondary/10" />
      
      {/* Subtle glitter particles - only render on client */}
      {isMounted && (
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {glitterParticles.map((particle, i) => (
            <div
              key={i}
              className="absolute bg-white/20 animate-glitter"
              style={{
                left: `${particle.left}%`,
                top: `${particle.top}%`,
                width: `${particle.size}px`,
                height: `${particle.size}px`,
                animationDelay: `${particle.delay}s`,
                animationDuration: `${particle.duration}s`,
                boxShadow: `0 0 ${particle.glow}px rgba(255, 192, 203, 0.3)`,
              }}
            />
          ))}
          {sparkleParticles.map((particle, i) => (
            <div
              key={`sparkle-${i}`}
              className="absolute animate-sparkle"
              style={{
                left: `${particle.left}%`,
                top: `${particle.top}%`,
                animationDelay: `${particle.delay}s`,
                animationDuration: `${particle.duration}s`,
              }}
            >
              <div
                className="w-0.5 h-0.5 bg-white/30"
                style={{
                  boxShadow: `0 0 2px rgba(255, 192, 203, 0.4)`,
                }}
              />
            </div>
          ))}
        </div>
      )}

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className={`max-w-5xl mx-auto transition-all duration-700 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`}>
          <div className={`relative w-full border border-border overflow-hidden transition-all duration-700 ${
            isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
          }`} style={{ paddingBottom: '56.25%', transitionDelay: '0.2s' }}>
            <iframe
              className="absolute top-0 left-0 w-full h-full"
              src={`https://www.youtube.com/embed/${videoId}`}
              title="Show Trailer"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default VideoSection;
