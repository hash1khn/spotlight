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
          className="object-cover"
          priority
          sizes="(max-width: 768px) 100vw, 100vw"
        />
        <div className="absolute inset-0 bg-black/20" />
      </div>
    </section>
  );
};

export default Hero;
