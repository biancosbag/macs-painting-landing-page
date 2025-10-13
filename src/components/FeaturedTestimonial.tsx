import reviewSusanBlank from "@/assets/review-susan-blank.png";
import { useEffect, useRef, useState } from "react";

export const FeaturedTestimonial = () => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  return (
    <section ref={sectionRef} className="py-8 bg-background">
      <div className="container mx-auto px-4">
        <div className="max-w-5xl mx-auto">
          <img 
            src={reviewSusanBlank} 
            alt="Susan Blank testimonial - Thanks to Mac's Painting, I sold my house faster - West Chester"
            className={`w-full h-auto rounded-lg shadow-lg ${isVisible ? 'animate-fadeInUp' : 'opacity-0'}`}
          />
        </div>
      </div>
    </section>
  );
};
