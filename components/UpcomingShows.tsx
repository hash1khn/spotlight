"use client"
import ShowCard from "./ShowCard";
import showsData from "@/data/shows.json";
import { useEffect, useRef, useState } from "react";

const UpcomingShows = () => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
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

  return (
    <section ref={sectionRef} id="shows" className="relative py-32 bg-background overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className={`text-center mb-20 transition-all duration-700 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`}>
          <div className="inline-block mb-6">
            <span className="text-primary text-xs font-bold uppercase tracking-[0.3em]">Live Performances</span>
          </div>
          <h2 className="text-6xl md:text-7xl lg:text-8xl font-bold text-foreground mb-8 tracking-tighter">
            Upcoming Shows
          </h2>
          <div className="w-24 h-0.5 bg-primary mx-auto mb-8" />
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            {"Don't miss out on these incredible performances. Get your tickets today."}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
          {showsData.map((show, index) => (
            <ShowCard
              key={show.id}
              title={show.title}
              date={show.date}
              time={show.time}
              location={show.location}
              address={show.address}
              ticketLink={show.ticketLink}
              index={index}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default UpcomingShows;
