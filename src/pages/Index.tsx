import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import UpcomingShows from "@/components/UpcomingShows";
import VideoSection from "@/components/VideoSection";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <Hero />
      <UpcomingShows />
      <VideoSection />
      <Footer />
    </div>
  );
};

export default Index;
