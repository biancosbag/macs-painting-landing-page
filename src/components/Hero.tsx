import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { useToast } from "@/hooks/use-toast";
import { useNavigate, Link } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { z } from "zod";
import { Phone } from "lucide-react";
import heroHome from "@/assets/hero-home.jpg";
import { useEffect, useState } from "react";

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

const heroFormSchema = z.object({
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

export const Hero = () => {
  const [scrollY, setScrollY] = useState(0);
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
    consent: false,
    utm_source: "",
    utm_medium: "",
    utm_campaign: "",
    utm_content: "",
    utm_term: "",
  });

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

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

  const scrollToForm = () => {
    document.getElementById("contact-form")?.scrollIntoView({ behavior: "smooth" });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});
    
    // Validate form data
    try {
      heroFormSchema.parse(formData);
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
      const { error: dbError } = await supabase
        .from('form_submissions')
        .insert([{
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          city: formData.city,
          project_type: formData.projectType,
          message: "",
          utm_source: formData.utm_source || null,
          utm_medium: formData.utm_medium || null,
          utm_campaign: formData.utm_campaign || null,
          utm_content: formData.utm_content || null,
          utm_term: formData.utm_term || null,
        }]);

      if (dbError) throw dbError;

      // Send email notification
      await supabase.functions.invoke('send-contact-email', {
        body: formData,
      });

      // Send webhook
      await supabase.functions.invoke('send-webhook', {
        body: {
          ...formData,
          project_type: formData.projectType,
          created_at: new Date().toISOString()
        },
      });

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
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    
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
    <section className="relative min-h-[600px] md:min-h-[700px] flex items-center overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0">
        <img 
          src={heroHome} 
          alt="Beautiful painted suburban home" 
          className="w-full h-full object-cover transition-transform duration-300 ease-out"
          style={{ transform: `translateY(${scrollY * 0.3}px)` }}
          fetchPriority="high"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-primary/95 via-primary/85 to-primary/70" />
      </div>

      {/* Content */}
      <div className="container relative z-10 mx-auto px-4 py-16 md:py-24">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center max-w-7xl mx-auto">
          {/* Left side - Hero text */}
          <div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-primary-foreground mb-6 leading-tight animate-fadeInUp delay-100">
              Clean Inside.
              <br />
              Proud Outside.
            </h1>
            <p className="text-xl md:text-2xl text-primary-foreground/90 mb-8 leading-relaxed animate-fadeInUp delay-200">
              Professional painting for Philadelphia and nearby areas homes. On-time arrival, zero-mess process, and results that last.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 animate-fadeInUp delay-300">
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

            <p className="mt-6 text-sm text-primary-foreground/80 animate-fadeInUp delay-400">
              ⭐ Trusted by families in Bucks, Montgomery, Chester & Delaware Counties
            </p>
          </div>

          {/* Right side - Compact form */}
          <div className="bg-card/95 backdrop-blur-sm p-6 md:p-8 rounded-lg shadow-2xl animate-fadeInUp delay-500">
            <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-2">
              Get Your Free Estimate
            </h2>
            <p className="text-muted-foreground mb-6">
              Response in less than 24 hours
            </p>
            
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <Label htmlFor="hero-name" className="text-foreground">Name *</Label>
                <Input
                  id="hero-name"
                  name="name"
                  value={formData.name}
                  onChange={handleNameChange}
                  required
                  placeholder="Your name"
                  className="mt-1"
                />
                {errors.name && (
                  <p className="text-sm text-destructive mt-1">{errors.name}</p>
                )}
              </div>

              <div>
                <Label htmlFor="hero-phone" className="text-foreground">Phone *</Label>
                <Input
                  id="hero-phone"
                  name="phone"
                  type="tel"
                  value={formData.phone}
                  onChange={handlePhoneChange}
                  required
                  placeholder="(555) 555-5555"
                  className="mt-1"
                />
                {errors.phone && (
                  <p className="text-sm text-destructive mt-1">{errors.phone}</p>
                )}
              </div>

              <div>
                <Label htmlFor="hero-email" className="text-foreground">Email *</Label>
                <Input
                  id="hero-email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  placeholder="your@email.com"
                  className="mt-1"
                />
                {errors.email && (
                  <p className="text-sm text-destructive mt-1">{errors.email}</p>
                )}
              </div>

              <div>
                <Label htmlFor="hero-city" className="text-foreground">City/Town (PA) *</Label>
                <select
                  id="hero-city"
                  name="city"
                  value={formData.city}
                  onChange={handleChange}
                  required
                  className="mt-1 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
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

              <div>
                <Label htmlFor="hero-projectType" className="text-foreground">Project Type *</Label>
                <select
                  id="hero-projectType"
                  name="projectType"
                  value={formData.projectType}
                  onChange={handleChange}
                  required
                  className="mt-1 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
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

              <div className="flex items-start space-x-2">
                <Checkbox
                  id="hero-consent"
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
                    htmlFor="hero-consent"
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer"
                  >
                    I agree to the{" "}
                    <Link 
                      to="/terms" 
                      target="_blank"
                      className="text-accent hover:underline font-semibold"
                    >
                      Terms & Conditions
                    </Link> *
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
    </section>
  );
};
