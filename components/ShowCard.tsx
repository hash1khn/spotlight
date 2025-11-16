"use client"
import { Calendar, Clock, MapPin, ExternalLink } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useEffect, useRef, useState } from "react";

interface ShowCardProps {
  title: string;
  date: string;
  time: string;
  location: string;
  address: string;
  ticketLink: string;
  index?: number;
}

const ShowCard = ({ title, date, time, location, address, ticketLink, index = 0 }: ShowCardProps) => {
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

  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = { 
      weekday: 'long', 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    };
    return new Date(dateString).toLocaleDateString('en-US', options);
  };

  return (
    <Card 
      ref={cardRef}
      className={`group relative bg-card border border-border hover:border-primary transition-all duration-500 overflow-hidden hover:shadow-lg hover:shadow-primary/20 ${
        isVisible ? 'animate-fade-in-up opacity-100' : 'opacity-0'
      }`}
      style={{ animationDelay: `${index * 0.1}s` }}
    >
      <CardContent className="p-8 space-y-6">
        <div>
          <h3 className="text-2xl md:text-3xl font-bold text-foreground mb-4 leading-tight">
            {title}
          </h3>
          <div className="w-12 h-0.5 bg-primary" />
        </div>
        
        <div className="space-y-3 text-muted-foreground">
          <div className="flex items-center gap-3">
            <Calendar className="h-4 w-4 text-primary flex-shrink-0" />
            <span className="text-foreground font-medium text-sm">{formatDate(date)}</span>
          </div>
          
          <div className="flex items-center gap-3">
            <Clock className="h-4 w-4 text-primary flex-shrink-0" />
            <span className="text-foreground font-medium text-sm">{time}</span>
          </div>
          
          <div className="flex items-start gap-3">
            <MapPin className="h-4 w-4 text-primary flex-shrink-0 mt-0.5" />
            <div className="flex-1">
              <div className="text-foreground font-medium text-sm">{location}</div>
              <div className="text-xs text-muted-foreground mt-0.5">{address}</div>
            </div>
          </div>
        </div>

        <Button 
          asChild 
          className="w-full bg-primary text-primary-foreground font-bold text-sm uppercase tracking-wider py-6 hover:bg-primary/90 transition-all duration-300 rounded-none hover:scale-[1.02] hover:shadow-md"
        >
          <a href={ticketLink} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-2">
            Get Tickets
            <ExternalLink className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
          </a>
        </Button>
      </CardContent>
    </Card>
  );
};

export default ShowCard;
