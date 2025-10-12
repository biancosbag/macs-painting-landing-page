import { Home, PaintBucket, Package } from "lucide-react";

const services = [
  {
    icon: Home,
    title: "Interior Painting",
    description: "Transform your living spaces with fresh, vibrant colors",
  },
  {
    icon: PaintBucket,
    title: "Exterior Painting",
    description: "Protect and beautify your home's curb appeal",
  },
  {
    icon: Package,
    title: "Cabinet Refinishing",
    description: "Give your kitchen a stunning new look",
  },
];

export const WhatWeDo = () => {
  return (
    <section className="py-12 bg-background border-y border-border">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center mb-8">
          <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-3">
            Professional Painting Services
          </h2>
          <p className="text-lg text-muted-foreground">
            We specialize in residential painting for homes across Philadelphia and nearby areas
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
          {services.map((service, index) => {
            const Icon = service.icon;
            return (
              <div key={index} className="flex flex-col items-center text-center">
                <div className="mb-3 flex justify-center">
                  <div className="w-12 h-12 rounded-full bg-accent/10 flex items-center justify-center">
                    <Icon className="h-6 w-6 text-accent" />
                  </div>
                </div>
                <h3 className="text-lg font-semibold text-foreground mb-2">
                  {service.title}
                </h3>
                <p className="text-sm text-muted-foreground">
                  {service.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
