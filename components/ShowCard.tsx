"use client"
import { Calendar, Clock, MapPin, ExternalLink } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface ShowCardProps {
  title: string;
  date: string;
  time: string;
  location: string;
  address: string;
  ticketLink: string;
}

const ShowCard = ({ title, date, time, location, address, ticketLink }: ShowCardProps) => {
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
    <Card className="group relative bg-card border border-border hover:border-primary transition-all duration-300 overflow-hidden">
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
          className="w-full bg-primary text-primary-foreground font-bold text-sm uppercase tracking-wider py-6 hover:bg-primary/90 transition-colors rounded-none"
        >
          <a href={ticketLink} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-2">
            Get Tickets
            <ExternalLink className="h-4 w-4" />
          </a>
        </Button>
      </CardContent>
    </Card>
  );
};

export default ShowCard;
