import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
  {
    question: "How long does it take to get an estimate?",
    answer: "We provide free estimates in less than 24 hours. You'll speak directly with Byron to discuss your project and get a clear, written quote with no hidden fees.",
  },
  {
    question: "What is the Zero-Mess Process?",
    answer: "Our Zero-Mess Process means complete protection of your furniture, floors, and outdoor areas. We use professional-grade drop cloths, plastic coverings, and masking. Plus, we clean up daily and leave your home spotless when we're done.",
  },
  {
    question: "Do you use safe paints?",
    answer: "Yes! We offer low-VOC and lead-safe painting options, especially important for families with children and pets. We'll recommend the best products for your specific needs.",
  },
  {
    question: "How long will the paint job last?",
    answer: "With proper surface preparation and quality materials, exterior paint typically lasts 7-10 years, and interior paint 5-7 years. We use premium paints and proper techniques to ensure durability.",
  },
  {
    question: "What if I'm not satisfied?",
    answer: "Your satisfaction is guaranteed. We do a final walk-through with you before we consider the job complete. If anything doesn't meet your expectations, we'll make it right.",
  },
  {
    question: "Do you work year-round?",
    answer: "Yes! We handle exterior painting in spring and summer when conditions are ideal, and interior projects year-round. We're especially busy in fall preparing homes for Thanksgiving and Christmas.",
  },
];

export const FAQ = () => {
  return (
    <section className="py-16 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Frequently Asked Questions
          </h2>
          <p className="text-xl text-muted-foreground">
            Everything you need to know
          </p>
        </div>

        <div className="max-w-3xl mx-auto">
          <Accordion type="single" collapsible className="w-full">
            {faqs.map((faq, index) => (
              <AccordionItem key={index} value={`item-${index}`}>
                <AccordionTrigger className="text-left text-lg font-semibold">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground leading-relaxed">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  );
};
