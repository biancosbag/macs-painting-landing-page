import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { useToast } from "@/hooks/use-toast";
import { Phone, Mail } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { z } from "zod";

const PA_CITIES = [
  "Philadelphia", "Pittsburgh", "Allentown", "Reading", "Erie", "Scranton",
  "Bethlehem", "Lancaster", "Harrisburg", "Altoona", "York", "State College",
  "Wilkes-Barre", "Chester", "Williamsport", "Easton", "Lebanon", "Hazleton",
  "New Castle", "Johnstown", "McKeesport", "Hermitage", "Greensburg", "Pottstown",
  "Bloomsburg", "Washington", "East Stroudsburg", "Carlisle", "Butler", "Chambersburg",
  "Phoenixville", "Monroeville", "Plum", "Murrysville", "West Chester", "King of Prussia",
  "Norristown", "Willow Grove", "Drexel Hill", "Levittown", "Media", "Broomall",
  "Marlton", "Cherry Hill", "Voorhees", "Mount Laurel"
].sort();

const contactSchema = z.object({
  name: z.string()
    .trim()
    .min(2, "Name must be at least 2 characters")
    .max(100, "Name must be less than 100 characters")
    .regex(/^[a-zA-Z\s'-]+$/, "Name can only contain letters, spaces, hyphens, and apostrophes"),
  email: z.string()
    .trim()
    .email("Please enter a valid email address")
    .max(255, "Email must be less than 255 characters"),
  phone: z.string()
    .trim()
    .regex(/^[\d\s()+-]+$/, "Phone can only contain numbers and standard formatting characters")
    .min(10, "Phone number must be at least 10 digits"),
  city: z.string()
    .min(1, "Please select a city"),
  projectType: z.string()
    .min(1, "Please select a project type"),
  message: z.string()
    .trim()
    .max(1000, "Message must be less than 1000 characters")
    .optional(),
  consent: z.boolean()
    .refine((val) => val === true, {
      message: "You must accept the terms and conditions to continue"
    }),
  utm_source: z.string().optional(),
  utm_medium: z.string().optional(),
  utm_campaign: z.string().optional(),
  utm_content: z.string().optional(),
  utm_term: z.string().optional(),
});

export const ContactForm = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    city: "",
    projectType: "",
    message: "",
    consent: false,
    utm_source: "",
    utm_medium: "",
    utm_campaign: "",
    utm_content: "",
    utm_term: "",
  });

  // Extract UTM parameters from URL on mount
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const utmData = {
      utm_source: urlParams.get('utm_source') || '',
      utm_medium: urlParams.get('utm_medium') || '',
      utm_campaign: urlParams.get('utm_campaign') || '',
      utm_content: urlParams.get('utm_content') || '',
      utm_term: urlParams.get('utm_term') || '',
    };

    setFormData(prev => ({
      ...prev,
      ...utmData,
    }));
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});
    
    // Validate form data
    try {
      contactSchema.parse(formData);
    } catch (error) {
      if (error instanceof z.ZodError) {
        const newErrors: Record<string, string> = {};
        error.errors.forEach((err) => {
          if (err.path[0]) {
            newErrors[err.path[0].toString()] = err.message;
          }
        });
        setErrors(newErrors);
        toast({
          title: "Validation Error",
          description: "Please check the form fields and try again.",
          variant: "destructive",
        });
        return;
      }
    }

    setIsSubmitting(true);

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
          utm_source: formData.utm_source || null,
          utm_medium: formData.utm_medium || null,
          utm_campaign: formData.utm_campaign || null,
          utm_content: formData.utm_content || null,
          utm_term: formData.utm_term || null,
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

      // Send webhook
      console.log('Sending webhook...');
      const { data: webhookData, error: webhookError } = await supabase.functions.invoke('send-webhook', {
        body: {
          ...formData,
          project_type: formData.projectType,
          created_at: new Date().toISOString()
        },
      });

      console.log('Webhook response:', { webhookData, webhookError });

      if (webhookError) {
        console.error('Webhook failed:', webhookError);
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
    const { name, value } = e.target;
    
    // Clear error for this field when user starts typing
    if (errors[name]) {
      setErrors({ ...errors, [name]: "" });
    }
    
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/[^\d\s()+-]/g, '');
    if (errors.phone) {
      setErrors({ ...errors, phone: "" });
    }
    setFormData({
      ...formData,
      phone: value,
    });
  };

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/[^a-zA-Z\s'-]/g, '');
    if (errors.name) {
      setErrors({ ...errors, name: "" });
    }
    setFormData({
      ...formData,
      name: value,
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
                    <a href="tel:+12675163306" className="text-lg font-semibold text-foreground hover:text-accent transition-all duration-300 hover:translate-x-1 inline-block">
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
                    <a href="mailto:byron@macspp.co" className="text-lg font-semibold text-foreground hover:text-accent transition-all duration-300 hover:translate-x-1 inline-block">
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
                      onChange={handleNameChange}
                      required
                      placeholder="Your name"
                      className="mt-2"
                    />
                    {errors.name && (
                      <p className="text-sm text-destructive mt-1">{errors.name}</p>
                    )}
                  </div>
                  <div>
                    <Label htmlFor="phone">Phone *</Label>
                    <Input
                      id="phone"
                      name="phone"
                      type="tel"
                      value={formData.phone}
                      onChange={handlePhoneChange}
                      required
                      placeholder="(555) 555-5555"
                      className="mt-2"
                    />
                    {errors.phone && (
                      <p className="text-sm text-destructive mt-1">{errors.phone}</p>
                    )}
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
                    {errors.email && (
                      <p className="text-sm text-destructive mt-1">{errors.email}</p>
                    )}
                  </div>
                  <div>
                    <Label htmlFor="city">City/Town (Pennsylvania) *</Label>
                    <select
                      id="city"
                      name="city"
                      value={formData.city}
                      onChange={handleChange}
                      required
                      className="mt-2 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                    >
                      <option value="">Select a city</option>
                      {PA_CITIES.map((city) => (
                        <option key={city} value={city}>
                          {city}
                        </option>
                      ))}
                    </select>
                    {errors.city && (
                      <p className="text-sm text-destructive mt-1">{errors.city}</p>
                    )}
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
                  {errors.projectType && (
                    <p className="text-sm text-destructive mt-1">{errors.projectType}</p>
                  )}
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
                    maxLength={1000}
                  />
                  {errors.message && (
                    <p className="text-sm text-destructive mt-1">{errors.message}</p>
                  )}
                </div>

                <div className="flex items-start space-x-2">
                  <Checkbox
                    id="consent"
                    checked={formData.consent}
                    onCheckedChange={(checked) => {
                      if (errors.consent) {
                        setErrors({ ...errors, consent: "" });
                      }
                      setFormData({ ...formData, consent: checked as boolean });
                    }}
                  />
                  <div className="grid gap-1.5 leading-none">
                    <label
                      htmlFor="consent"
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer"
                    >
                      I agree to the{" "}
                      <Link 
                        to="/terms" 
                        target="_blank"
                        className="text-accent hover:underline font-semibold"
                      >
                        Terms & Conditions
                      </Link>{" "}
                      and Privacy Policy *
                    </label>
                    {errors.consent && (
                      <p className="text-sm text-destructive">{errors.consent}</p>
                    )}
                  </div>
                </div>

                {/* Hidden UTM fields */}
                <input type="hidden" name="utm_source" value={formData.utm_source} />
                <input type="hidden" name="utm_medium" value={formData.utm_medium} />
                <input type="hidden" name="utm_campaign" value={formData.utm_campaign} />
                <input type="hidden" name="utm_content" value={formData.utm_content} />
                <input type="hidden" name="utm_term" value={formData.utm_term} />

                <Button 
                  type="submit" 
                  variant="cta" 
                  size="lg" 
                  className="w-full text-lg"
                  disabled={isSubmitting || !formData.consent}
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
