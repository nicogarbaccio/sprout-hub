
import { serve } from "https://deno.land/std@0.190.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders });
  }

  try {
    if (req.method !== 'POST') {
      return new Response('Method not allowed', { 
        status: 405, 
        headers: corsHeaders 
      });
    }

    // Get Cloudinary configuration from environment
    const cloudName = Deno.env.get('CLOUDINARY_CLOUD_NAME');
    const uploadPreset = Deno.env.get('CLOUDINARY_UPLOAD_PRESET');

    if (!cloudName || !uploadPreset) {
      return new Response('Cloudinary configuration missing', { 
        status: 500, 
        headers: corsHeaders 
      });
    }

    // Get the form data from the request
    const formData = await req.formData();
    const file = formData.get('file') as File;

    if (!file) {
      return new Response('No file provided', { 
        status: 400, 
        headers: corsHeaders 
      });
    }

    // Prepare form data for Cloudinary
    const cloudinaryFormData = new FormData();
    cloudinaryFormData.append('file', file);
    cloudinaryFormData.append('upload_preset', uploadPreset);
    cloudinaryFormData.append('folder', 'plant-collection'); // Organize uploads in a folder

    // Upload to Cloudinary
    const cloudinaryResponse = await fetch(
      `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
      {
        method: 'POST',
        body: cloudinaryFormData,
      }
    );

    if (!cloudinaryResponse.ok) {
      const errorText = await cloudinaryResponse.text();
      console.error('Cloudinary error:', errorText);
      return new Response('Upload to Cloudinary failed', { 
        status: 500, 
        headers: corsHeaders 
      });
    }

    const result = await cloudinaryResponse.json();

    return new Response(
      JSON.stringify({
        secure_url: result.secure_url,
        public_id: result.public_id,
      }),
      {
        headers: { 
          'Content-Type': 'application/json',
          ...corsHeaders 
        },
      }
    );
  } catch (error) {
    console.error('Error in upload-image function:', error);
    return new Response('Internal server error', { 
      status: 500, 
      headers: corsHeaders 
    });
  }
});
