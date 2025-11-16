"use client"
import { Mail, Instagram } from "lucide-react";
import { useEffect, useRef, useState } from "react";

const Footer = () => {
  const [isVisible, setIsVisible] = useState(false);
  const footerRef = useRef<HTMLElement>(null);

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

    if (footerRef.current) {
      observer.observe(footerRef.current);
    }

    return () => {
      if (footerRef.current) {
        observer.unobserve(footerRef.current);
      }
    };
  }, []);

  return (
    <footer ref={footerRef} id="contact" className="bg-background border-t border-border py-12">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl mx-auto">
          <div className={`text-center space-y-6 transition-all duration-700 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}>
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.3em] text-muted-foreground mb-3">
                Contact
              </p>
              <a 
                href="mailto:didiwingameshow@gmail.com" 
                className="inline-flex items-center gap-3 text-foreground hover:text-primary transition-all duration-300 text-sm font-medium hover:scale-105"
              >
                <Mail className="h-4 w-4 transition-transform duration-300 group-hover:scale-110" />
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
                className="inline-flex items-center gap-3 text-foreground hover:text-primary transition-all duration-300 text-sm font-medium hover:scale-105"
              >
                <Instagram className="h-4 w-4 transition-transform duration-300 group-hover:scale-110" />
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
