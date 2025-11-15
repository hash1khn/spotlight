"use client";

import { useState, useEffect } from "react";

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 w-full transition-colors duration-300 ${
        scrolled ? "bg-background/90 backdrop-blur-md" : "bg-transparent"
      }`}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-center h-20">
          <div className="flex items-center gap-12 md:gap-16">
            <a
              href="#home"
              className="text-xs font-bold text-white uppercase tracking-[0.2em] hover:text-primary transition-colors"
            >
              Home
            </a>
            <a
              href="#shows"
              className="text-xs font-bold text-white uppercase tracking-[0.2em] hover:text-primary transition-colors"
            >
              Shows
            </a>
            <a
              href="#trailer"
              className="text-xs font-bold text-white uppercase tracking-[0.2em] hover:text-primary transition-colors"
            >
              Trailer
            </a>
            <a
              href="#contact"
              className="text-xs font-bold text-white uppercase tracking-[0.2em] hover:text-primary transition-colors"
            >
              Contact
            </a>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
