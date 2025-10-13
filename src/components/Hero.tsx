import { Button } from "@/components/ui/button";
import { Phone } from "lucide-react";
import heroHome from "@/assets/hero-home.jpg";
import { useScroll, useTransform, motion } from 'motion/react';
import { useRef } from 'react';

export const Hero = () => {
  const scrollToForm = () => {
    document.getElementById("contact-form")?.scrollIntoView({ behavior: "smooth" });
  };

  const container = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: container,
    offset: ['start start', 'end end'],
  });

  const scale = useTransform(scrollYProgress, [0, 1], [1, 0.95]);
  const rotate = useTransform(scrollYProgress, [0, 1], [0, -2]);

  return (
    <motion.section 
      ref={container}
      style={{ scale, rotate }}
      className="sticky top-0 relative min-h-[600px] md:min-h-[700px] flex items-center"
    >
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
            Professional painting for Philadelphia and nearby areas homes. On-time arrival, zero-mess process, and results that last.
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
              className="text-lg px-8 py-6 border-2 border-primary-foreground bg-primary-foreground/10 text-primary-foreground font-semibold hover:bg-accent hover:text-accent-foreground hover:border-accent transition-all duration-300"
              asChild
            >
              <a href="tel:+12675163306">
                <Phone className="mr-2 h-5 w-5" />
                (267) 516-3306
              </a>
            </Button>
          </div>

          <p className="mt-6 text-sm text-primary-foreground/80">
            ⭐ Trusted by families in Bucks, Montgomery, Chester & Delaware Counties
          </p>
        </div>
      </div>
    </motion.section>
  );
};
