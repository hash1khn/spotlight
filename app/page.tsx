import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import UpcomingShows from "@/components/UpcomingShows";
import VideoSection from "@/components/VideoSection";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      <div className="relative">
        <Navbar />
        <Hero />
      </div>
      <UpcomingShows />
      <VideoSection />
      <Footer />
    </div>
  );
}

