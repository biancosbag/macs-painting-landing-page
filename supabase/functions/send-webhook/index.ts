import { serve } from "https://deno.land/std@0.190.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

interface FormSubmission {
  name: string;
  email: string;
  phone: string;
  city: string;
  project_type: string;
  message?: string;
  utm_source?: string;
  utm_medium?: string;
  utm_campaign?: string;
  utm_content?: string;
  utm_term?: string;
  created_at?: string;
}

const handler = async (req: Request): Promise<Response> => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const formData: FormSubmission = await req.json();
    console.log('Sending webhook for submission:', { name: formData.name, email: formData.email });

    const webhookUrl = Deno.env.get('WEBHOOK_URL');
    
    if (!webhookUrl) {
      throw new Error('WEBHOOK_URL not configured');
    }

    // Convert to Lima timezone (UTC-5)
    const getTimestampInLimaTimezone = () => {
      const date = new Date();
      const utcTime = date.getTime() + (date.getTimezoneOffset() * 60000);
      const limaTime = new Date(utcTime + (3600000 * -5));
      
      // Format manually to preserve Lima time in ISO format
      const year = limaTime.getFullYear();
      const month = String(limaTime.getMonth() + 1).padStart(2, '0');
      const day = String(limaTime.getDate()).padStart(2, '0');
      const hours = String(limaTime.getHours()).padStart(2, '0');
      const minutes = String(limaTime.getMinutes()).padStart(2, '0');
      const seconds = String(limaTime.getSeconds()).padStart(2, '0');
      
      return `${year}-${month}-${day}T${hours}:${minutes}:${seconds}-05:00`;
    };

    // Send the webhook
    const webhookResponse = await fetch(webhookUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        ...formData,
        timestamp: getTimestampInLimaTimezone(),
      }),
    });

    if (!webhookResponse.ok) {
      const errorText = await webhookResponse.text();
      console.error('Webhook failed:', webhookResponse.status, errorText);
      throw new Error(`Webhook request failed: ${webhookResponse.status} - ${errorText}`);
    }

    const responseData = await webhookResponse.text();
    console.log('Webhook sent successfully:', responseData);

    return new Response(
      JSON.stringify({ success: true, message: 'Webhook sent successfully' }),
      {
        status: 200,
        headers: { 'Content-Type': 'application/json', ...corsHeaders },
      }
    );
  } catch (error: any) {
    console.error('Error sending webhook:', error);
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        status: 500,
        headers: { 'Content-Type': 'application/json', ...corsHeaders },
      }
    );
  }
};

serve(handler);
