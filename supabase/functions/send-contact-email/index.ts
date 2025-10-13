import { serve } from "https://deno.land/std@0.190.0/http/server.ts";

const RESEND_API_KEY = Deno.env.get("RESEND_API_KEY");

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

interface ContactFormData {
  name: string;
  email: string;
  phone: string;
  city: string;
  projectType: string;
  message?: string;
}

const handler = async (req: Request): Promise<Response> => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const formData: ContactFormData = await req.json();
    console.log("Received contact form submission:", { name: formData.name, email: formData.email });

    const projectTypeLabels: Record<string, string> = {
      interior: "Interior Painting",
      exterior: "Exterior Painting",
      cabinets: "Cabinet Refinishing",
      combo: "Interior + Exterior Combo",
      other: "Other",
    };

    const emailHtml = `
      <h2>New Contact Form Submission</h2>
      <p><strong>Name:</strong> ${formData.name}</p>
      <p><strong>Email:</strong> ${formData.email}</p>
      <p><strong>Phone:</strong> ${formData.phone}</p>
      <p><strong>City:</strong> ${formData.city}</p>
      <p><strong>Project Type:</strong> ${projectTypeLabels[formData.projectType] || formData.projectType}</p>
      ${formData.message ? `<p><strong>Message:</strong><br/>${formData.message}</p>` : ""}
      <hr/>
      <p><small>Submitted from Mac's Professional Painting website</small></p>
    `;

    // Send email to business owner
    const ownerEmailResponse = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${RESEND_API_KEY}`,
      },
      body: JSON.stringify({
        from: "Mac's Painting <onboarding@resend.dev>",
        to: ["byron@macspp.co"],
        subject: `New Quote Request from ${formData.name}`,
        html: emailHtml,
        reply_to: formData.email,
      }),
    });

    if (!ownerEmailResponse.ok) {
      const errorData = await ownerEmailResponse.text();
      throw new Error(`Resend API error for owner email: ${errorData}`);
    }

    const ownerEmailData = await ownerEmailResponse.json();
    console.log("Owner email sent successfully:", ownerEmailData);

    // Send confirmation email to customer
    const customerEmailHtml = `
      <h2>Thank You for Your Quote Request!</h2>
      <p>Hi ${formData.name},</p>
      <p>We've received your request for a quote on your <strong>${projectTypeLabels[formData.projectType] || formData.projectType}</strong> project in ${formData.city}.</p>
      <p>Our team will review your information and contact you within 24 hours to discuss your project and provide a free, no-obligation estimate.</p>
      <p><strong>What happens next?</strong></p>
      <ul>
        <li>We'll call you at ${formData.phone} to schedule a convenient time</li>
        <li>We'll visit your property to assess the project</li>
        <li>You'll receive a detailed quote within 48 hours of our visit</li>
      </ul>
      <p>If you have any urgent questions, feel free to call us at <strong>(267) 516-3306</strong>.</p>
      <p>Best regards,<br/>
      Byron and the Mac's Professional Painting Team</p>
      <hr/>
      <p><small>Mac's Professional Painting | (267) 516-3306 | byron@macspp.co</small></p>
    `;

    const customerEmailResponse = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${RESEND_API_KEY}`,
      },
      body: JSON.stringify({
        from: "Mac's Professional Painting <onboarding@resend.dev>",
        to: [formData.email],
        subject: "Your Quote Request - Mac's Professional Painting",
        html: customerEmailHtml,
        reply_to: "byron@macspp.co",
      }),
    });

    if (!customerEmailResponse.ok) {
      const errorData = await customerEmailResponse.text();
      console.error("Customer email failed:", errorData);
      // Don't throw - owner email was sent successfully
    } else {
      const customerEmailData = await customerEmailResponse.json();
      console.log("Customer confirmation email sent successfully:", customerEmailData);
    }

    return new Response(JSON.stringify({ success: true, ownerEmailId: ownerEmailData.id }), {
      status: 200,
      headers: { "Content-Type": "application/json", ...corsHeaders },
    });
  } catch (error: any) {
    console.error("Error in send-contact-email function:", error);
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        status: 500,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  }
};

serve(handler);
