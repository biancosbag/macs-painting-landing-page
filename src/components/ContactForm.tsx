import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { Phone, Mail } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

export const ContactForm = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    city: "",
    projectType: "",
    message: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    console.log('Form submission started', formData);

    try {
      // Save to database
      console.log('Attempting to save to database...');
      const { error: dbError } = await supabase
        .from('form_submissions')
        .insert([{
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          city: formData.city,
          project_type: formData.projectType,
          message: formData.message,
        }]);

      console.log('Database insert completed. Error:', dbError);

      if (dbError) throw dbError;

      // Send email notification
      console.log('Invoking send-contact-email edge function...');
      const { data: emailData, error: emailError } = await supabase.functions.invoke('send-contact-email', {
        body: formData,
      });

      console.log('Edge function response:', { emailData, emailError });

      if (emailError) {
        console.error('Email notification failed:', emailError);
        // Don't throw - submission was saved successfully
      }

      // Redirect to thank you page
      navigate('/thank-you');
    } catch (error: any) {
      console.error('Form submission error:', error);
      toast({
        title: "Submission Failed",
        description: "There was an error submitting your request. Please try again or call us directly.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <section id="contact-form" className="py-16 bg-gradient-to-b from-primary/5 to-background">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Get Your Free Estimate
            </h2>
            <p className="text-xl text-muted-foreground">
              Response in less than 24 hours. No obligation.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Contact Info */}
            <div className="space-y-6">
              <div className="bg-card p-6 rounded-lg shadow-md">
                <div className="flex items-center mb-4">
                  <Phone className="h-6 w-6 text-accent mr-3" />
                  <div>
                    <div className="text-sm text-muted-foreground">Call Us</div>
                    <a href="tel:+12675163306" className="text-lg font-semibold text-foreground hover:text-primary">
                      (267) 516-3306
                    </a>
                  </div>
                </div>
              </div>

              <div className="bg-card p-6 rounded-lg shadow-md">
                <div className="flex items-center mb-4">
                  <Mail className="h-6 w-6 text-accent mr-3" />
                  <div>
                    <div className="text-sm text-muted-foreground">Email Us</div>
                    <a href="mailto:byron@macspp.co" className="text-lg font-semibold text-foreground hover:text-primary">
                      byron@macspp.co
                    </a>
                  </div>
                </div>
              </div>

              <div className="bg-primary text-primary-foreground p-6 rounded-lg shadow-md">
                <h3 className="font-bold text-lg mb-2">Business Hours</h3>
                <p className="text-sm mb-2">Monday - Friday: 7am - 6pm</p>
                <p className="text-sm mb-2">Saturday: 8am - 4pm</p>
                <p className="text-sm">Sunday: Closed</p>
              </div>
            </div>

            {/* Form */}
            <div className="md:col-span-2">
              <form onSubmit={handleSubmit} className="bg-card p-8 rounded-lg shadow-lg space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <Label htmlFor="name">Name *</Label>
                    <Input
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      placeholder="Your name"
                      className="mt-2"
                    />
                  </div>
                  <div>
                    <Label htmlFor="phone">Phone *</Label>
                    <Input
                      id="phone"
                      name="phone"
                      type="tel"
                      value={formData.phone}
                      onChange={handleChange}
                      required
                      placeholder="(555) 555-5555"
                      className="mt-2"
                    />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <Label htmlFor="email">Email *</Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      placeholder="your@email.com"
                      className="mt-2"
                    />
                  </div>
                  <div>
                    <Label htmlFor="city">City/Town *</Label>
                    <Input
                      id="city"
                      name="city"
                      value={formData.city}
                      onChange={handleChange}
                      required
                      placeholder="e.g., Marlton, NJ"
                      className="mt-2"
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="projectType">Project Type *</Label>
                  <select
                    id="projectType"
                    name="projectType"
                    value={formData.projectType}
                    onChange={handleChange as any}
                    required
                    className="mt-2 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                  >
                    <option value="">Select a project type</option>
                    <option value="interior">Interior Painting</option>
                    <option value="exterior">Exterior Painting</option>
                    <option value="cabinets">Cabinet Refinishing</option>
                    <option value="combo">Interior + Exterior Combo</option>
                    <option value="other">Other</option>
                  </select>
                </div>

                <div>
                  <Label htmlFor="message">Tell us about your project</Label>
                  <Textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Any specific details about your painting project..."
                    className="mt-2 min-h-[120px]"
                  />
                </div>

                <Button 
                  type="submit" 
                  variant="cta" 
                  size="lg" 
                  className="w-full text-lg"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Sending..." : "Request Free Estimate"}
                </Button>

                <p className="text-xs text-muted-foreground text-center">
                  We respect your privacy. Your information will never be shared.
                </p>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
