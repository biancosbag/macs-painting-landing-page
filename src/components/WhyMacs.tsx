import { User, Clock, Sparkles } from "lucide-react";

const features = [
  {
    icon: User,
    title: "Direct Contact with Owner",
    description: "Work directly with Byron. No middlemen, no rotating crews. One point of contact from estimate to completion.",
  },
  {
    icon: Clock,
    title: "On-Time, Every Time",
    description: "Confirmed arrival windows via SMS. We respect your schedule and stick to our timeline.",
  },
  {
    icon: Sparkles,
    title: "Zero-Mess Guarantee",
    description: "Complete protection setup and daily cleanup. We leave your home cleaner than we found it.",
  },
];

export const WhyMacs = () => {
  return (
    <section className="py-16 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Why Mac's Painting?
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Strong hands. Clean homes. That's our promise.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <div key={index} className="text-center">
                <div className="mb-4 flex justify-center">
                  <div className="w-16 h-16 rounded-lg bg-primary flex items-center justify-center shadow-md">
                    <Icon className="h-8 w-8 text-primary-foreground" />
                  </div>
                </div>
                <h3 className="text-xl font-bold text-foreground mb-3">
                  {feature.title}
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  {feature.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
