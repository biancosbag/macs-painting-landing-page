import { Button } from "@/components/ui/button";
import { Phone } from "lucide-react";
import heroHome from "@/assets/hero-home.jpg";
import { useEffect, useState } from "react";

export const Hero = () => {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToForm = () => {
    document.getElementById("contact-form")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="relative min-h-[600px] md:min-h-[700px] flex items-center overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0">
        <img 
          src={heroHome} 
          alt="Beautiful painted suburban home" 
          className="w-full h-full object-cover transition-transform duration-300 ease-out"
          style={{ transform: `translateY(${scrollY * 0.3}px)` }}
          fetchPriority="high"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-primary/95 via-primary/85 to-primary/70" />
      </div>

      {/* Content */}
      <div className="container relative z-10 mx-auto px-4 py-16 md:py-24">
        <div className="max-w-2xl">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-primary-foreground mb-6 leading-tight animate-fadeInUp delay-100">
            Clean Inside.
            <br />
            Proud Outside.
          </h1>
          <p className="text-xl md:text-2xl text-primary-foreground/90 mb-8 leading-relaxed animate-fadeInUp delay-200">
            Professional painting for Philadelphia and nearby areas homes. On-time arrival, zero-mess process, and results that last.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 animate-fadeInUp delay-300">
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
              className="text-lg px-8 py-6 border-2 border-primary-foreground bg-primary-foreground/10 text-primary-foreground font-semibold hover:bg-accent hover:text-accent-foreground hover:border-accent transition-all duration-300"
              asChild
            >
              <a href="tel:+12675163306">
                <Phone className="mr-2 h-5 w-5" />
                (267) 516-3306
              </a>
            </Button>
          </div>

          <p className="mt-6 text-sm text-primary-foreground/80 animate-fadeInUp delay-400">
            ⭐ Trusted by families in Bucks, Montgomery, Chester & Delaware Counties
          </p>
        </div>
      </div>
    </section>
  );
};
