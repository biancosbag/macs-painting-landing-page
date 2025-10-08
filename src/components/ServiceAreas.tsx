import { MapPin } from "lucide-react";

const areas = {
  PA: [
    "Doylestown", "Newtown", "Yardley", "Richboro", "Warrington",
    "King of Prussia", "Wayne", "Paoli", "West Chester", "Media"
  ],
  NJ: [
    "Moorestown", "Haddonfield", "Cherry Hill", "Marlton", "Mount Laurel",
    "Voorhees", "Collingswood", "Medford"
  ]
};

export const ServiceAreas = () => {
  return (
    <section className="py-16 bg-secondary">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <div className="flex items-center justify-center mb-4">
            <MapPin className="h-8 w-8 text-accent mr-2" />
            <h2 className="text-3xl md:text-4xl font-bold text-foreground">
              Proudly Serving PA & NJ
            </h2>
          </div>
          <p className="text-xl text-muted-foreground">
            Your local, trusted painting professionals
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          <div className="bg-card rounded-lg p-8 shadow-md">
            <h3 className="text-2xl font-bold text-primary mb-4">
              Pennsylvania
            </h3>
            <p className="text-sm text-muted-foreground mb-4">
              Bucks, Montgomery, Chester, Delaware Counties
            </p>
            <div className="grid grid-cols-2 gap-3">
              {areas.PA.map((city, index) => (
                <div key={index} className="text-foreground">
                  • {city}
                </div>
              ))}
            </div>
          </div>

          <div className="bg-card rounded-lg p-8 shadow-md">
            <h3 className="text-2xl font-bold text-primary mb-4">
              New Jersey
            </h3>
            <p className="text-sm text-muted-foreground mb-4">
              Burlington, Camden, Gloucester Counties
            </p>
            <div className="grid grid-cols-2 gap-3">
              {areas.NJ.map((city, index) => (
                <div key={index} className="text-foreground">
                  • {city}
                </div>
              ))}
            </div>
          </div>
        </div>

        <p className="text-center mt-8 text-muted-foreground">
          Don't see your town? <span className="text-primary font-semibold">Call us</span> - we may still serve your area!
        </p>
      </div>
    </section>
  );
};
