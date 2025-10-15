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
  status?: string;
  created_at?: string;
}

const SPREADSHEET_ID = "1cjwoOF1X5BVxPOO6KosIvwG5VbVX3RaT";

async function getAccessToken(): Promise<string> {
  const credentials = JSON.parse(Deno.env.get("GOOGLE_SHEETS_CREDENTIALS") || "{}");
  
  const jwtHeader = btoa(JSON.stringify({
    alg: "RS256",
    typ: "JWT"
  }));

  const now = Math.floor(Date.now() / 1000);
  const jwtClaimSet = btoa(JSON.stringify({
    iss: credentials.client_email,
    scope: "https://www.googleapis.com/auth/spreadsheets",
    aud: "https://oauth2.googleapis.com/token",
    exp: now + 3600,
    iat: now
  }));

  const signatureInput = `${jwtHeader}.${jwtClaimSet}`;
  
  // Import the private key
  const privateKey = credentials.private_key;
  const pemHeader = "-----BEGIN PRIVATE KEY-----";
  const pemFooter = "-----END PRIVATE KEY-----";
  const pemContents = privateKey.substring(
    pemHeader.length,
    privateKey.length - pemFooter.length
  ).replace(/\s/g, "");
  
  const binaryKey = Uint8Array.from(atob(pemContents), c => c.charCodeAt(0));
  
  const cryptoKey = await crypto.subtle.importKey(
    "pkcs8",
    binaryKey,
    {
      name: "RSASSA-PKCS1-v1_5",
      hash: "SHA-256",
    },
    false,
    ["sign"]
  );

  const encoder = new TextEncoder();
  const signature = await crypto.subtle.sign(
    "RSASSA-PKCS1-v1_5",
    cryptoKey,
    encoder.encode(signatureInput)
  );

  const base64Signature = btoa(String.fromCharCode(...new Uint8Array(signature)))
    .replace(/\+/g, "-")
    .replace(/\//g, "_")
    .replace(/=/g, "");

  const jwt = `${signatureInput}.${base64Signature}`;

  // Exchange JWT for access token
  const tokenResponse = await fetch("https://oauth2.googleapis.com/token", {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: `grant_type=urn:ietf:params:oauth:grant-type:jwt-bearer&assertion=${jwt}`,
  });

  const tokenData = await tokenResponse.json();
  return tokenData.access_token;
}

async function appendToSheet(data: FormSubmission) {
  const accessToken = await getAccessToken();
  
  // Prepare the row data matching the sheet columns
  const values = [[
    data.name,
    data.email,
    data.phone,
    data.city,
    data.project_type,
    data.message || "",
    data.utm_source || "",
    data.utm_medium || "",
    data.utm_campaign || "",
    data.utm_content || "",
    data.utm_term || "",
    data.status || "Nuevo",
    data.created_at || new Date().toISOString()
  ]];

  const response = await fetch(
    `https://sheets.googleapis.com/v4/spreadsheets/${SPREADSHEET_ID}/values/Sheet1!A:M:append?valueInputOption=RAW`,
    {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        values: values
      }),
    }
  );

  if (!response.ok) {
    const error = await response.text();
    throw new Error(`Failed to append to sheet: ${error}`);
  }

  return await response.json();
}

const handler = async (req: Request): Promise<Response> => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const formData: FormSubmission = await req.json();
    
    console.log('Syncing form submission to Google Sheets:', {
      name: formData.name,
      email: formData.email
    });

    const result = await appendToSheet(formData);
    
    console.log('Successfully synced to Google Sheets:', result);

    return new Response(
      JSON.stringify({ success: true, result }),
      {
        status: 200,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    );
  } catch (error: any) {
    console.error('Error syncing to Google Sheets:', error);
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    );
  }
};

serve(handler);
