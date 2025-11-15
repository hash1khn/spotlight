"use client"
import { Mail, Instagram } from "lucide-react";

const Footer = () => {
  return (
    <footer id="contact" className="bg-background border-t border-border py-12">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl mx-auto">
          <div className="text-center space-y-6">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.3em] text-muted-foreground mb-3">
                Contact
              </p>
              <a 
                href="mailto:didiwingameshow@gmail.com" 
                className="inline-flex items-center gap-3 text-foreground hover:text-primary transition-colors text-sm font-medium"
              >
                <Mail className="h-4 w-4" />
                <span>didiwingameshow@gmail.com</span>
              </a>
            </div>
            
            <div className="w-12 h-0.5 bg-border mx-auto" />
            
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.3em] text-muted-foreground mb-3">
                Follow
              </p>
              <a 
                href="https://www.instagram.com/didiwinlive" 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-flex items-center gap-3 text-foreground hover:text-primary transition-colors text-sm font-medium"
              >
                <Instagram className="h-4 w-4" />
                <span>@didiwinlive</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
