import { Button } from "@/components/ui/button";
import { Phone } from "lucide-react";
import heroHome from "@/assets/hero-home.jpg";

export const Hero = () => {
  const scrollToForm = () => {
    document.getElementById("contact-form")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="relative min-h-[600px] md:min-h-[700px] flex items-center">
      {/* Background Image */}
      <div className="absolute inset-0">
        <img 
          src={heroHome} 
          alt="Beautiful painted suburban home" 
          className="w-full h-full object-cover"
          fetchPriority="high"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-primary/95 via-primary/85 to-primary/70" />
      </div>

      {/* Content */}
      <div className="container relative z-10 mx-auto px-4 py-16 md:py-24">
        <div className="max-w-2xl">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-primary-foreground mb-6 leading-tight">
            Clean Inside.
            <br />
            Proud Outside.
          </h1>
          <p className="text-xl md:text-2xl text-primary-foreground/90 mb-8 leading-relaxed">
            Professional painting for Pennsylvania & New Jersey homes. On-time arrival, zero-mess process, and results that last.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4">
            <Button 
              variant="hero" 
              size="lg" 
              onClick={scrollToForm}
              className="text-lg px-8 py-6"
            >
              Get Your Free Estimate
            </Button>
            <Button 
              variant="outline" 
              size="lg"
              className="text-lg px-8 py-6 border-2 border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary"
              asChild
            >
              <a href="tel:+12155551234">
                <Phone className="mr-2 h-5 w-5" />
                (215) 555-1234
              </a>
            </Button>
          </div>

          <p className="mt-6 text-sm text-primary-foreground/80">
            ⭐ Trusted by families in Bucks, Montgomery, Chester & Burlington Counties
          </p>
        </div>
      </div>
    </section>
  );
};
