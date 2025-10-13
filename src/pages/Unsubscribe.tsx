import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { z } from "zod";

const emailSchema = z.object({
  email: z.string().trim().email("Please enter a valid email address"),
});

const Unsubscribe = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");

  const handleUnsubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    // Validate email
    try {
      emailSchema.parse({ email });
    } catch (validationError) {
      if (validationError instanceof z.ZodError) {
        setError(validationError.errors[0].message);
        return;
      }
    }

    setIsSubmitting(true);

    try {
      // Delete from form_submissions table
      const { error: deleteError } = await supabase
        .from('form_submissions')
        .delete()
        .eq('email', email);

      if (deleteError) throw deleteError;

      toast({
        title: "Successfully Unsubscribed",
        description: "Your email has been removed from our database. We're sorry to see you go.",
      });

      // Redirect to home after 2 seconds
      setTimeout(() => {
        navigate('/');
      }, 2000);
    } catch (err: any) {
      console.error('Unsubscribe error:', err);
      toast({
        title: "Error",
        description: "There was an error processing your request. Please try again or contact us directly.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-12 max-w-2xl">
        <Link to="/">
          <Button variant="ghost" className="mb-6">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Home
          </Button>
        </Link>

        <div className="bg-card p-8 rounded-lg shadow-lg">
          <h1 className="text-3xl font-bold mb-4">Unsubscribe</h1>
          <p className="text-muted-foreground mb-6">
            We're sorry to see you go. Enter your email address below to remove your information from our database.
          </p>

          <form onSubmit={handleUnsubscribe} className="space-y-6">
            <div>
              <Label htmlFor="email">Email Address *</Label>
              <Input
                id="email"
                name="email"
                type="email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  if (error) setError("");
                }}
                required
                placeholder="your@email.com"
                className="mt-2"
              />
              {error && (
                <p className="text-sm text-destructive mt-1">{error}</p>
              )}
            </div>

            <div className="bg-muted p-4 rounded-lg">
              <p className="text-sm text-muted-foreground">
                <strong>What will be deleted:</strong>
              </p>
              <ul className="text-sm text-muted-foreground mt-2 space-y-1 list-disc pl-5">
                <li>Your contact form submissions</li>
                <li>Your email address from our database</li>
                <li>Any project inquiries associated with this email</li>
              </ul>
            </div>

            <Button
              type="submit"
              variant="destructive"
              size="lg"
              className="w-full"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Processing..." : "Unsubscribe & Delete My Data"}
            </Button>

            <p className="text-xs text-muted-foreground text-center">
              If you change your mind, you can always contact us again at{" "}
              <a href="mailto:byron@macspp.co" className="text-accent hover:underline">
                byron@macspp.co
              </a>
            </p>
          </form>
        </div>

        <div className="mt-8 bg-primary/5 p-6 rounded-lg">
          <h2 className="text-xl font-semibold mb-3">Need Help Instead?</h2>
          <p className="text-muted-foreground mb-4">
            If you're unsubscribing due to too many emails or other concerns, we'd love to help resolve the issue.
          </p>
          <div className="space-y-2">
            <p className="text-sm">
              <strong>Call us:</strong>{" "}
              <a href="tel:+12675163306" className="text-accent hover:underline">
                (267) 516-3306
              </a>
            </p>
            <p className="text-sm">
              <strong>Email us:</strong>{" "}
              <a href="mailto:byron@macspp.co" className="text-accent hover:underline">
                byron@macspp.co
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Unsubscribe;
