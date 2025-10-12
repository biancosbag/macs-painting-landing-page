import reviewSusanBlank from "@/assets/review-susan-blank.png";

export const FeaturedTestimonial = () => {
  return (
    <section className="py-8 bg-background">
      <div className="container mx-auto px-4">
        <div className="max-w-5xl mx-auto">
          <img 
            src={reviewSusanBlank} 
            alt="Susan Blank testimonial - Thanks to Mac's Painting, I sold my house faster - West Chester"
            className="w-full h-auto rounded-lg shadow-lg"
          />
        </div>
      </div>
    </section>
  );
};
