import { Ticket } from "lucide-react";

const Navbar = () => {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-sm border-b border-border">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center gap-2">
            <Ticket className="h-6 w-6 text-primary" />
            <span className="text-xl font-bold text-foreground">Did I Win?</span>
          </div>
          
          <div className="hidden md:flex items-center gap-8">
            <a href="#shows" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
              Shows
            </a>
            <a href="#trailer" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
              Trailer
            </a>
            <a href="#contact" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
              Contact
            </a>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
