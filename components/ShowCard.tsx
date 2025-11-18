"use client"
import { Clock, MapPin, ExternalLink } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useEffect, useRef, useState } from "react";

interface ShowCardProps {
  date: string;
  time: string;
  location: string;
  address: string;
  ticketLink: string;
  index?: number;
}

const ShowCard = ({ date, time, location, address, ticketLink, index = 0 }: ShowCardProps) => {
  const [isVisible, setIsVisible] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

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

    if (cardRef.current) {
      observer.observe(cardRef.current);
    }

    return () => {
      if (cardRef.current) {
        observer.unobserve(cardRef.current);
      }
    };
  }, []);

  const formatNumericDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      month: "2-digit",
      day: "2-digit",
    });
  };

  const formatWeekday = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      weekday: "short",
    });
  };

  const formatFullDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      weekday: "long",
      month: "long",
      day: "numeric",
    });
  };

  return (
    <Card 
      ref={cardRef}
      className={`group relative bg-card border border-border hover:border-primary transition-all duration-500 overflow-hidden hover:shadow-lg hover:shadow-primary/20 ${
        isVisible ? 'animate-fade-in-up opacity-100' : 'opacity-0'
      }`}
      style={{ animationDelay: `${index * 0.1}s` }}
    >
      <CardContent className="p-5 md:p-6 lg:p-8">
        <div className="flex flex-col gap-5 md:flex-row md:items-center md:gap-8">
          <div className="flex flex-col items-center justify-center text-center md:w-32 lg:w-40">
            <span className="text-5xl md:text-6xl lg:text-7xl font-black tracking-tight text-primary leading-none">
              {formatNumericDate(date)}
            </span>
            <span className="mt-2 text-[0.65rem] md:text-xs uppercase tracking-[0.35em] text-muted-foreground">
              {formatWeekday(date)}
            </span>
          </div>

          <div className="flex-1 space-y-3 md:space-y-4">
            <div className="text-xl lg:text-2xl font-semibold text-foreground tracking-tight">
              {formatFullDate(date)}
            </div>
            <div className="flex flex-wrap gap-x-6 gap-y-2 text-sm text-muted-foreground">
              <span className="flex items-center gap-2">
                <Clock className="h-4 w-4 text-primary" />
                <span className="text-foreground font-medium">{time}</span>
              </span>
              <span className="flex items-center gap-2">
                <MapPin className="h-4 w-4 text-primary" />
                <span className="text-foreground font-medium">{location}</span>
              </span>
            </div>
            <div className="text-[0.7rem] md:text-xs uppercase tracking-[0.2em] text-muted-foreground">
              {address}
            </div>
          </div>

          <div className="w-full md:w-auto md:flex-none">
            <Button 
              asChild 
              className="w-full bg-primary text-primary-foreground font-bold text-sm uppercase tracking-wider py-4 hover:bg-primary/90 transition-all duration-300 rounded-none hover:scale-[1.02] hover:shadow-md"
            >
              <a href={ticketLink} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-2">
                Get Tickets
                <ExternalLink className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
              </a>
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ShowCard;
