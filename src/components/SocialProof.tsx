import { Star } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const testimonials = [
  {
    name: "Emily Parker",
    location: "Marlton, NJ",
    rating: 5,
    text: "Mac's Painting transformed our living room just in time for Thanksgiving! Byron and his team were punctual, incredibly clean, and respectful of our home. The quality is outstanding.",
  },
  {
    name: "Karen Whitman",
    location: "Haddonfield, NJ",
    rating: 5,
    text: "After 20+ years in our home, we finally found a painter we trust. The exterior looks brand new, and they protected our garden beautifully. No mess, no stress.",
  },
  {
    name: "Thomas Reed",
    location: "West Chester, PA",
    rating: 5,
    text: "We needed fast, quality work before our move. Mac's delivered in 48 hours with zero drama. Professional, coordinated perfectly with other contractors. Highly recommend!",
  },
];

export const SocialProof = () => {
  return (
    <section className="py-16 bg-secondary">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Real Painters. Real Results.
          </h2>
          <p className="text-xl text-muted-foreground">
            What your neighbors are saying
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {testimonials.map((testimonial, index) => (
            <Card key={index} className="border-none shadow-md hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="flex mb-3">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 fill-accent text-accent" />
                  ))}
                </div>
                <p className="text-foreground mb-4 leading-relaxed">
                  "{testimonial.text}"
                </p>
                <div className="border-t pt-4">
                  <p className="font-semibold text-foreground">{testimonial.name}</p>
                  <p className="text-sm text-muted-foreground">{testimonial.location}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};
