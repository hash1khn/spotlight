"use client"
import Image from "next/image";
import heroImage from "@/assets/Game Show H.jpg";

const Hero = () => {
  return (
    <section id="home" className="relative w-full overflow-hidden">
      <div className="relative w-full aspect-video">
        <Image 
          src={heroImage} 
          alt="Did I Win? Game Show" 
          fill
          className="object-cover animate-fade-in"
          priority
          sizes="(max-width: 768px) 100vw, 100vw"
        />
        <div className="absolute inset-0 bg-black/20 opacity-0 animate-fade-in" style={{ animationDelay: '0.2s' }} />
      </div>
    </section>
  );
};

export default Hero;
