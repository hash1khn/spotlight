import { Mail, Phone, Facebook, Instagram, Twitter } from "lucide-react";

const Footer = () => {
  return (
    <footer id="contact" className="bg-card border-t border-border py-12">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 max-w-6xl mx-auto">
          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-bold text-foreground mb-4">Contact Us</h3>
            <div className="space-y-3 text-muted-foreground">
              <a href="mailto:info@theshow.com" className="flex items-center gap-3 hover:text-foreground transition-colors">
                <Mail className="h-5 w-5 text-primary" />
                <span>info@theshow.com</span>
              </a>
              <a href="tel:+1234567890" className="flex items-center gap-3 hover:text-foreground transition-colors">
                <Phone className="h-5 w-5 text-primary" />
                <span>(123) 456-7890</span>
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-bold text-foreground mb-4">Quick Links</h3>
            <div className="space-y-2">
              <a href="#shows" className="block text-muted-foreground hover:text-foreground transition-colors">
                Upcoming Shows
              </a>
              <a href="#trailer" className="block text-muted-foreground hover:text-foreground transition-colors">
                Trailer
              </a>
              <a href="#" className="block text-muted-foreground hover:text-foreground transition-colors">
                About
              </a>
            </div>
          </div>

          {/* Social Media */}
          <div>
            <h3 className="text-lg font-bold text-foreground mb-4">Follow Us</h3>
            <div className="flex gap-4">
              <a 
                href="https://facebook.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center justify-center h-10 w-10 rounded-full bg-secondary hover:bg-primary hover:text-primary-foreground text-foreground transition-all"
              >
                <Facebook className="h-5 w-5" />
              </a>
              <a 
                href="https://instagram.com/didiwinlive" 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center justify-center h-10 w-10 rounded-full bg-secondary hover:bg-primary hover:text-primary-foreground text-foreground transition-all"
              >
                <Instagram className="h-5 w-5" />
              </a>
              <a 
                href="https://twitter.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center justify-center h-10 w-10 rounded-full bg-secondary hover:bg-primary hover:text-primary-foreground text-foreground transition-all"
              >
                <Twitter className="h-5 w-5" />
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-border mt-12 pt-8 text-center text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} The Show. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
