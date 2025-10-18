import { Button } from "@/components/ui/button";
import { CheckCircle, Phone, Mail } from "lucide-react";
import { Link } from "react-router-dom";
import { useEffect } from "react";

const ThankYou = () => {
  useEffect(() => {
    const w = window as any;

    // Push to GTM dataLayer immediately
    try {
      w.dataLayer = w.dataLayer || [];
      w.dataLayer.push({ 
        event: 'lead',
        eventCategory: 'Lead',
        eventAction: 'Form Submission'
      });
      console.log('[ThankYou] GTM dataLayer event pushed: lead');
    } catch (e) {
      console.warn('[ThankYou] dataLayer push failed', e);
    }

    // Try immediate pixel fire
    if (w.fbq) {
      try {
        w.fbq('track', 'Lead');
        w.fbq('trackCustom', 'lead');
        console.log('[ThankYou] FB Pixel fired immediately: Lead + lead');
      } catch (err) {
        console.warn('[ThankYou] Immediate pixel fire failed', err);
      }
    }

    // Retry mechanism for delayed pixel load (up to 10 seconds)
    let attempts = 0;
    let leadSent = !!w.fbq;
    const MAX_ATTEMPTS = 40; // 10s total @250ms
    
    const interval = setInterval(() => {
      attempts++;
      
      if (!leadSent && w.fbq) {
        try {
          w.fbq('track', 'Lead');
          w.fbq('trackCustom', 'lead');
          leadSent = true;
          console.log(`[ThankYou] FB Pixel fired on retry ${attempts}: Lead + lead`);
          clearInterval(interval);
        } catch (err) {
          console.warn('[ThankYou] Retry pixel fire failed', err);
        }
      }
      
      if (attempts >= MAX_ATTEMPTS) {
        clearInterval(interval);
        if (!leadSent) {
          console.error('[ThankYou] FB Pixel still not available after 10s');
        }
      }
    }, 250);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-secondary flex items-center justify-center px-4">
      <div className="max-w-2xl w-full text-center space-y-8 py-12">
        <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-accent/10 mb-4">
          <CheckCircle className="w-12 h-12 text-accent" />
        </div>
        
        <div className="space-y-4">
          <h1 className="text-4xl md:text-5xl font-bold text-foreground">
            Thank You!
          </h1>
          <p className="text-xl text-muted-foreground max-w-lg mx-auto">
            We've received your message and will get back to you within 24 hours.
          </p>
        </div>

        <div className="bg-card border border-border rounded-lg p-8 space-y-6 shadow-medium">
          <h2 className="text-2xl font-semibold text-foreground">
            What happens next?
          </h2>
          <div className="space-y-4 text-left">
            <div className="flex gap-4">
              <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold">
                1
              </div>
              <p className="text-muted-foreground pt-1">
                Our team reviews your project details
              </p>
            </div>
            <div className="flex gap-4">
              <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold">
                2
              </div>
              <p className="text-muted-foreground pt-1">
                We'll contact you to schedule a free consultation
              </p>
            </div>
            <div className="flex gap-4">
              <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold">
                3
              </div>
              <p className="text-muted-foreground pt-1">
                Get a detailed quote for your painting project
              </p>
            </div>
          </div>
        </div>

        <div className="bg-accent/5 border border-accent/20 rounded-lg p-8 space-y-6">
          <h2 className="text-2xl font-semibold text-foreground flex items-center justify-center gap-2">
            <Mail className="w-6 h-6 text-accent" />
            Check Your Email
          </h2>
          <p className="text-muted-foreground">
            We've sent a confirmation email to your inbox. To ensure you receive all our communications:
          </p>
          <div className="space-y-3 text-left">
            <div className="flex gap-3">
              <div className="flex-shrink-0 w-6 h-6 rounded-full bg-accent/20 flex items-center justify-center text-accent font-bold text-sm">
                1
              </div>
              <p className="text-muted-foreground pt-0.5">
                Check your <strong>Spam</strong> or <strong>Promotions</strong> tab if you don't see our email
              </p>
            </div>
            <div className="flex gap-3">
              <div className="flex-shrink-0 w-6 h-6 rounded-full bg-accent/20 flex items-center justify-center text-accent font-bold text-sm">
                2
              </div>
              <p className="text-muted-foreground pt-0.5">
                Search for <strong>"Mac's Professional Painting"</strong> or <strong>byron@macspp.co</strong>
              </p>
            </div>
            <div className="flex gap-3">
              <div className="flex-shrink-0 w-6 h-6 rounded-full bg-accent/20 flex items-center justify-center text-accent font-bold text-sm">
                3
              </div>
              <p className="text-muted-foreground pt-0.5">
                Add <strong>byron@macspp.co</strong> to your contacts
              </p>
            </div>
            <div className="flex gap-3">
              <div className="flex-shrink-0 w-6 h-6 rounded-full bg-accent/20 flex items-center justify-center text-accent font-bold text-sm">
                4
              </div>
              <p className="text-muted-foreground pt-0.5">
                Mark as <strong>"Not Spam"</strong> if it landed in your spam folder
              </p>
            </div>
            <div className="flex gap-3">
              <div className="flex-shrink-0 w-6 h-6 rounded-full bg-accent/20 flex items-center justify-center text-accent font-bold text-sm">
                5
              </div>
              <p className="text-muted-foreground pt-0.5">
                Move the email to your <strong>Primary</strong> tab for future messages
              </p>
            </div>
          </div>
        </div>

        <div className="border-t border-border pt-8 space-y-4">
          <p className="text-foreground font-semibold">
            Need immediate assistance?
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              variant="outline" 
              size="lg"
              className="gap-2"
              asChild
            >
              <a href="tel:+12675163306">
                <Phone className="w-5 h-5" />
                (267) 516-3306
              </a>
            </Button>
            <Button 
              variant="outline" 
              size="lg"
              className="gap-2"
              asChild
            >
              <a href="mailto:Macspainting91@gmail.com">
                <Mail className="w-5 h-5" />
                Email Us
              </a>
            </Button>
          </div>
        </div>

        <div className="pt-8">
          <Button 
            variant="default" 
            size="lg"
            asChild
          >
            <Link to="/">
              Return to Home
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ThankYou;
