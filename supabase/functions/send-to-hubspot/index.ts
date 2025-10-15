import { serve } from "https://deno.land/std@0.190.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

interface ContactData {
  name: string;
  email: string;
  phone: string;
  city: string;
  projectType: string;
  message?: string;
  utm_source?: string;
  utm_medium?: string;
  utm_campaign?: string;
  utm_content?: string;
  utm_term?: string;
}

const handler = async (req: Request): Promise<Response> => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const contactData: ContactData = await req.json();
    const hubspotApiKey = Deno.env.get('HUBSPOT_API_KEY');

    if (!hubspotApiKey) {
      throw new Error('HUBSPOT_API_KEY is not configured');
    }

    console.log('Sending contact to HubSpot:', contactData.email);

    // Create contact in HubSpot
    const contactPayload = {
      properties: {
        firstname: contactData.name.split(' ')[0],
        lastname: contactData.name.split(' ').slice(1).join(' ') || contactData.name.split(' ')[0],
        email: contactData.email,
        phone: contactData.phone,
        city: contactData.city,
        hs_lead_status: 'NEW',
        project_type: contactData.projectType,
        message: contactData.message || '',
        ...(contactData.utm_source && { hs_analytics_source: contactData.utm_source }),
        ...(contactData.utm_medium && { hs_analytics_source_data_1: contactData.utm_medium }),
        ...(contactData.utm_campaign && { hs_analytics_source_data_2: contactData.utm_campaign }),
      }
    };

    const hubspotResponse = await fetch('https://api.hubapi.com/crm/v3/objects/contacts', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${hubspotApiKey}`,
      },
      body: JSON.stringify(contactPayload),
    });

    if (!hubspotResponse.ok) {
      const errorText = await hubspotResponse.text();
      console.error('HubSpot API error:', errorText);
      throw new Error(`HubSpot API error: ${hubspotResponse.status} - ${errorText}`);
    }

    const hubspotData = await hubspotResponse.json();
    console.log('Contact created in HubSpot:', hubspotData.id);

    return new Response(
      JSON.stringify({ success: true, contactId: hubspotData.id }),
      {
        status: 200,
        headers: { 'Content-Type': 'application/json', ...corsHeaders },
      }
    );
  } catch (error: any) {
    console.error('Error in send-to-hubspot function:', error);
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
