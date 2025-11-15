import { useMemo } from "react";

const VideoSection = () => {
  const videoId = "qWmIMvj2vsQ";
  
  // Generate lighter glitter positions
  const glitterParticles = useMemo(() => {
    return Array.from({ length: 25 }, (_, i) => {
      const seed = i * 0.618; // Golden ratio for better distribution
      return {
        left: (Math.sin(seed) * 0.5 + 0.5) * 100,
        top: (Math.cos(seed * 1.3) * 0.5 + 0.5) * 100,
        size: (Math.sin(seed * 2) * 0.5 + 0.5) * 2.5 + 1.5,
        delay: (Math.sin(seed * 3) * 0.5 + 0.5) * 3,
        duration: (Math.sin(seed * 4) * 0.5 + 0.5) * 1.5 + 1.5,
        glow: (Math.sin(seed * 5) * 0.5 + 0.5) * 3 + 2,
      };
    });
  }, []);

  const sparkleParticles = useMemo(() => {
    return Array.from({ length: 12 }, (_, i) => {
      const seed = i * 0.732; // Different seed for variety
      return {
        left: (Math.cos(seed) * 0.5 + 0.5) * 100,
        top: (Math.sin(seed * 1.7) * 0.5 + 0.5) * 100,
        delay: (Math.cos(seed * 2) * 0.5 + 0.5) * 4,
        duration: (Math.cos(seed * 3) * 0.5 + 0.5) * 2 + 2,
      };
    });
  }, []);
  
  return (
    <section id="trailer" className="relative py-20 overflow-hidden">
      {/* Minimal gradient background */}
      <div className="absolute inset-0 bg-gradient-to-b from-secondary/20 via-secondary/15 to-secondary/10" />
      
      {/* Subtle glitter particles */}
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

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <div className="inline-block mb-6">
              <span className="text-primary text-xs font-bold uppercase tracking-[0.3em]">Watch</span>
            </div>
            <h2 className="text-6xl md:text-7xl lg:text-8xl font-bold text-foreground mb-8 tracking-tighter">
              Trailer
            </h2>
            <div className="w-24 h-0.5 bg-primary mx-auto mb-8" />
            <p className="text-lg md:text-xl text-muted-foreground">
              Get a glimpse of what awaits you
            </p>
          </div>

          <div className="relative w-full border border-border overflow-hidden" style={{ paddingBottom: '56.25%' }}>
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
