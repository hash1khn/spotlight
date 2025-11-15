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
    <Card className="bg-card border-border hover:border-primary/50 transition-all duration-300 hover:shadow-lg hover:shadow-primary/10">
      <CardContent className="p-6 space-y-4">
        <h3 className="text-2xl font-bold text-foreground">{title}</h3>
        
        <div className="space-y-3 text-muted-foreground">
          <div className="flex items-start gap-3">
            <Calendar className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
            <span className="text-foreground">{formatDate(date)}</span>
          </div>
          
          <div className="flex items-start gap-3">
            <Clock className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
            <span>{time}</span>
          </div>
          
          <div className="flex items-start gap-3">
            <MapPin className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
            <div>
              <div className="text-foreground font-medium">{location}</div>
              <div className="text-sm">{address}</div>
            </div>
          </div>
        </div>

        <Button 
          asChild 
          className="w-full bg-primary text-primary-foreground hover:bg-primary/90 mt-4"
        >
          <a href={ticketLink} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-2">
            Buy Tickets
            <ExternalLink className="h-4 w-4" />
          </a>
        </Button>
      </CardContent>
    </Card>
  );
};

export default ShowCard;
