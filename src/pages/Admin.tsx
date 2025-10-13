import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { Loader2, LogOut, Mail, Phone, MapPin, MessageSquare } from "lucide-react";
import type { Database } from "@/integrations/supabase/types";

type FormSubmission = Database["public"]["Tables"]["form_submissions"]["Row"];

const Admin = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);
  const [submissions, setSubmissions] = useState<FormSubmission[]>([]);
  const { toast } = useToast();
  const navigate = useNavigate();

  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    try {
      const { data: { session } } = await supabase.auth.getSession();
      
      if (!session) {
        navigate("/auth");
        return;
      }

      // Check if user has admin role
      const { data: roles, error: roleError } = await supabase
        .from("user_roles")
        .select("role")
        .eq("user_id", session.user.id)
        .eq("role", "admin");

      if (roleError || !roles || roles.length === 0) {
        toast({
          title: "Access Denied",
          description: "You do not have admin privileges. Please contact the administrator.",
          variant: "destructive",
        });
        navigate("/");
        return;
      }

      setIsAdmin(true);
      await loadSubmissions();
    } catch (error: any) {
      console.error("Auth check error:", error);
      toast({
        title: "Error",
        description: "Failed to verify authentication.",
        variant: "destructive",
      });
      navigate("/auth");
    } finally {
      setIsLoading(false);
    }
  };

  const loadSubmissions = async () => {
    try {
      const { data, error } = await supabase
        .from("form_submissions")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) throw error;

      setSubmissions(data || []);
    } catch (error: any) {
      console.error("Error loading submissions:", error);
      toast({
        title: "Error",
        description: "Failed to load submissions.",
        variant: "destructive",
      });
    }
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate("/");
  };

  const projectTypeLabels: Record<string, string> = {
    interior: "Interior Painting",
    exterior: "Exterior Painting",
    cabinets: "Cabinet Refinishing",
    combo: "Interior + Exterior Combo",
    other: "Other",
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  if (!isAdmin) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-primary/5 to-background">
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">Admin Dashboard</h1>
          <Button onClick={handleLogout} variant="outline">
            <LogOut className="mr-2 h-4 w-4" />
            Logout
          </Button>
        </div>

        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Contact Form Submissions</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground mb-4">
              Total submissions: {submissions.length}
            </p>
          </CardContent>
        </Card>

        <div className="grid gap-6">
          {submissions.length === 0 ? (
            <Card>
              <CardContent className="py-8 text-center text-muted-foreground">
                No submissions yet.
              </CardContent>
            </Card>
          ) : (
            submissions.map((submission) => (
              <Card key={submission.id}>
                <CardHeader>
                  <CardTitle className="text-xl flex items-center justify-between">
                    <span>{submission.name}</span>
                    <span className="text-sm font-normal text-muted-foreground">
                      {new Date(submission.created_at).toLocaleString()}
                    </span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex items-center gap-2">
                    <Mail className="h-4 w-4 text-muted-foreground" />
                    <a href={`mailto:${submission.email}`} className="text-primary hover:underline">
                      {submission.email}
                    </a>
                  </div>
                  <div className="flex items-center gap-2">
                    <Phone className="h-4 w-4 text-muted-foreground" />
                    <a href={`tel:${submission.phone}`} className="text-primary hover:underline">
                      {submission.phone}
                    </a>
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin className="h-4 w-4 text-muted-foreground" />
                    <span>{submission.city}</span>
                  </div>
                  <div className="pt-2">
                    <span className="inline-block px-3 py-1 bg-primary/10 text-primary rounded-full text-sm">
                      {projectTypeLabels[submission.project_type] || submission.project_type}
                    </span>
                  </div>
                  {submission.message && (
                    <div className="flex gap-2 pt-2">
                      <MessageSquare className="h-4 w-4 text-muted-foreground mt-1 flex-shrink-0" />
                      <p className="text-sm">{submission.message}</p>
                    </div>
                  )}
                </CardContent>
              </Card>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default Admin;
