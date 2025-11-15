import ShowCard from "./ShowCard";
import showsData from "@/data/shows.json";

const UpcomingShows = () => {
  return (
    <section id="shows" className="py-20 bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            Upcoming Shows
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Don't miss out on these incredible performances. Get your tickets today!
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
          {showsData.map((show) => (
            <ShowCard
              key={show.id}
              title={show.title}
              date={show.date}
              time={show.time}
              location={show.location}
              address={show.address}
              ticketLink={show.ticketLink}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default UpcomingShows;
