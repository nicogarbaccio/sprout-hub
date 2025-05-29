
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

    console.log('Cloud name:', cloudName);
    console.log('Upload preset:', uploadPreset);

    if (!cloudName || !uploadPreset) {
      console.error('Missing Cloudinary configuration');
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

    console.log('File received:', file.name, file.type, file.size);

    // Prepare form data for Cloudinary
    const cloudinaryFormData = new FormData();
    cloudinaryFormData.append('file', file);
    cloudinaryFormData.append('upload_preset', uploadPreset);
    cloudinaryFormData.append('folder', 'plant-collection');

    const cloudinaryUrl = `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`;
    console.log('Uploading to:', cloudinaryUrl);

    // Upload to Cloudinary
    const cloudinaryResponse = await fetch(cloudinaryUrl, {
      method: 'POST',
      body: cloudinaryFormData,
    });

    const responseText = await cloudinaryResponse.text();
    console.log('Cloudinary response status:', cloudinaryResponse.status);
    console.log('Cloudinary response:', responseText);

    if (!cloudinaryResponse.ok) {
      console.error('Cloudinary error:', responseText);
      return new Response(`Upload to Cloudinary failed: ${responseText}`, { 
        status: 500, 
        headers: corsHeaders 
      });
    }

    const result = JSON.parse(responseText);

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
    return new Response(`Internal server error: ${error.message}`, { 
      status: 500, 
      headers: corsHeaders 
    });
  }
});
