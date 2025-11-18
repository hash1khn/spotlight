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
          <h2 className="text-6xl md:text-7xl lg:text-8xl font-bold text-foreground mb-8 tracking-tighter">
            Upcoming Shows
          </h2>
          <div className="w-24 h-0.5 bg-primary mx-auto mb-8" />
        </div>

        <div className="max-w-4xl mx-auto flex flex-col gap-6">
          {showsData.map((show, index) => (
            <ShowCard
              key={show.id}
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
