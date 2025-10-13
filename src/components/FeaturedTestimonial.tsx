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
      { threshold: 0.1, rootMargin: "0px 0px -100px 0px" }
    );

    const currentRef = sectionRef.current;
    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
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
            className={`w-full h-auto rounded-lg shadow-lg ${isVisible ? 'animate-fadeIn' : 'opacity-0'}`}
          />
        </div>
      </div>
    </section>
  );
};
