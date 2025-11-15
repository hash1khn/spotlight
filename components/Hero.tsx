"use client"
import Image from "next/image";
import heroImage from "@/assets/show-poster.jpg";

const Hero = () => {
  return (
    <section id="home" className="relative w-full overflow-hidden">
      <div className="relative w-full aspect-video">
        <Image 
          src={heroImage} 
          alt="Did I Win? Game Show" 
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-black/20" />
      </div>
    </section>
  );
};

export default Hero;
