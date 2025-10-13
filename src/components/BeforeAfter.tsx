import { Card, CardContent } from "@/components/ui/card";
import beforeExterior from "@/assets/before-exterior.jpg";
import afterExterior from "@/assets/after-exterior.jpg";
import beforeInterior from "@/assets/before-interior.jpg";
import afterInterior from "@/assets/after-interior.jpg";

const projects = [
  {
    before: beforeExterior,
    after: afterExterior,
    title: "Exterior Transformation",
    location: "Berwyn, PA",
  },
  {
    before: beforeInterior,
    after: afterInterior,
    title: "Interior Refresh",
    location: "Villanova, PA",
  },
];

export const BeforeAfter = () => {
  return (
    <section className="py-16 bg-gradient-to-b from-secondary to-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            See The Difference
          </h2>
          <p className="text-xl text-muted-foreground">
            Real homes in your neighborhood
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {projects.map((project, index) => (
            <Card key={index} className="overflow-hidden shadow-lg">
              <CardContent className="p-0">
                <div className="grid grid-cols-2">
                  <div className="relative overflow-hidden">
                    <img 
                      src={project.before} 
                      alt={`Before - ${project.title}`}
                      className="w-full h-64 object-cover transition-transform duration-500 hover:scale-110"
                    />
                    <div className="absolute top-4 left-4 bg-foreground/80 text-background px-3 py-1 rounded text-sm font-semibold">
                      Before
                    </div>
                  </div>
                  <div className="relative overflow-hidden">
                    <img 
                      src={project.after} 
                      alt={`After - ${project.title}`}
                      className="w-full h-64 object-cover transition-transform duration-500 hover:scale-110"
                    />
                    <div className="absolute top-4 right-4 bg-accent text-accent-foreground px-3 py-1 rounded text-sm font-semibold">
                      After
                    </div>
                  </div>
                </div>
                <div className="p-6 bg-card">
                  <h3 className="text-xl font-bold text-card-foreground mb-1">
                    {project.title}
                  </h3>
                  <p className="text-sm text-muted-foreground">{project.location}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};
