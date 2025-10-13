import { Shield, Calendar, Paintbrush, CheckCircle, Sparkles } from "lucide-react";

const processSteps = [
  {
    icon: Calendar,
    title: "Schedule",
    description: "Get your free estimate in less than 24 hours. Direct contact with Byron.",
  },
  {
    icon: Shield,
    title: "Protect",
    description: "Complete Zero-Mess setup. We cover furniture, floors, and protect your garden.",
  },
  {
    icon: Paintbrush,
    title: "Paint",
    description: "Clean edges, durable finish, low-VOC options safe for families and pets.",
  },
  {
    icon: CheckCircle,
    title: "Inspect",
    description: "Walk-through with you. We don't leave until you're 100% satisfied.",
  },
  {
    icon: Sparkles,
    title: "Clean",
    description: "Daily cleanup guarantee. We leave your home cleaner than we found it.",
  },
];

export const Process = () => {
  return (
    <section className="py-16 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            The Zero-Mess Process
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            We don't cut corners, we paint them right. Here's our 5-step proven process.
          </p>
        </div>

        <div className="grid md:grid-cols-5 gap-6 max-w-6xl mx-auto">
          {processSteps.map((step, index) => {
            const Icon = step.icon;
            return (
              <div key={index} className="text-center">
                <div className="mb-4 flex justify-center">
                  <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center transition-all duration-300 hover:bg-accent hover:scale-110 group">
                    <Icon className="h-10 w-10 text-primary transition-colors duration-300 group-hover:text-accent-foreground" />
                  </div>
                </div>
                <div className="mb-2 text-sm font-semibold text-accent">
                  Step {index + 1}
                </div>
                <h3 className="text-xl font-bold text-foreground mb-2">
                  {step.title}
                </h3>
                <p className="text-sm text-muted-foreground">
                  {step.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
