import { Star } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const testimonials = [
  {
    name: "Tom Kowalyk",
    location: "North Wales, PA",
    rating: 5,
    text: "Exceptional service and quality at a fair price. We hired Macs Painting to paint an entire condo - walls, ceilings and trim. Byron and his team did such a good job, we hired them again to paint our 16\" family room (walls, ceilings & trim) in our other place. It turned out beautiful and the attention to detail is great. Highly recommended!",
  },
  {
    name: "Thoma Madonna",
    location: "Philadelphia",
    rating: 5,
    text: "Mac's Painting is the real deal. I've hired dozens of contractors over the years and it's hard to find good, quality help. Mac's is always on time, meets the agreed schedule, super communicative, works with you on options and cost.....and best of all, no BS. Bryon says something, he makes it happen. The reasonable price is well worth the service.",
  },
  {
    name: "Catty Campion",
    location: "Philadelphia",
    rating: 5,
    text: "We had the pews in our church refurbished because the finish was all chipping and pealing. I think they are more beautiful than the original job! Very respectful and pleasant too. They are hard workers. Will have more work done by them.",
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

        {/* Google Reviews Widget */}
        <div className="max-w-4xl mx-auto mb-12">
          <div className="flex justify-center">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d24573.358299438757!2d-75.36956688715822!3d39.96023399999999!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c6c8f3b0f3b3b3%3A0x11vlc2n6x8!2sMac&#39;s%20Painting%20LLC!5e0!3m2!1sen!2sus!4v1234567890123!5m2!1sen!2sus"
              width="100%"
              height="400"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="rounded-lg shadow-lg"
              title="Mac's Painting LLC Google Reviews"
            />
          </div>
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
