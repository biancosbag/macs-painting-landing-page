import { MapPin } from "lucide-react";

const areas = [
  "Mount Airy", "Ardmore", "Chestnut Hill", "Manayunk", "Wayne",
  "Rosemont", "Villanova", "Philadelphia", "King of Prussia", "Bryn Mawr",
  "Berwyn", "Delaware County", "Valley Forge", "Malvern", "Media"
];

export const ServiceAreas = () => {
  return (
    <section className="py-16 bg-secondary">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <div className="flex items-center justify-center mb-4">
            <MapPin className="h-8 w-8 text-accent mr-2" />
            <h2 className="text-3xl md:text-4xl font-bold text-foreground">
              Proudly Serving Philadelphia and Nearby Areas
            </h2>
          </div>
          <p className="text-xl text-muted-foreground">
            Your local, trusted painting professionals
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="bg-card rounded-lg p-8 shadow-md">
            <h3 className="text-2xl font-bold text-primary mb-4 text-center">
              Philadelphia and Nearby Areas Service Areas
            </h3>
            <p className="text-sm text-muted-foreground mb-6 text-center">
              Bucks, Montgomery, Chester, Delaware Counties
            </p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {areas.map((city, index) => (
                <div key={index} className="text-foreground">
                  • {city}
                </div>
              ))}
            </div>
          </div>
        </div>

        <p className="text-center mt-8 text-muted-foreground">
          Don't see your town? <a href="tel:+12675163306" className="text-primary font-semibold hover:underline">Call us</a> - we may still serve your area!
        </p>
      </div>
    </section>
  );
};
