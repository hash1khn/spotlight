import heroImage from "@/assets/show-poster.jpg";

const Hero = () => {
  return (
    <section className="relative w-full overflow-hidden pt-16">
      <div className="w-full">
        <img 
          src={heroImage} 
          alt="Did I Win? Game Show" 
          className="w-full h-auto object-cover"
        />
      </div>
    </section>
  );
};

export default Hero;
