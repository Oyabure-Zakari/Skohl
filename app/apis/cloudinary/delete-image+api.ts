import * as Crypto from 'expo-crypto';

export async function POST(request: Request): Promise<Response> {
  try {
    const body = await request.json();
    const { public_id, invalidate = true } = body;

    if (!public_id) {
      return Response.json(
        { success: false, message: 'public_id is required' },
        { status: 400 }
      );
    }

    const cloudName = process.env.CLOUDINARY_CLOUD_NAME;
    const apiKey = process.env.CLOUDINARY_API_KEY;
    const apiSecret = process.env.CLOUDINARY_API_SECRET;

    if (!cloudName || !apiKey || !apiSecret) {
      return Response.json(
        { success: false, message: 'Cloudinary credentials not configured' },
        { status: 500 }
      );
    }

    // Generate timestamp
    const timestamp = Math.round(Date.now() / 1000);

    // Create the string to sign (parameters must be in alphabetical order)
    const paramsToSign: string[] = [`public_id=${public_id}`, `timestamp=${timestamp}`];
    
    if (invalidate) {
      paramsToSign.unshift('invalidate=true'); // Add at beginning (alphabetical order)
    }
    
    const stringToSign = paramsToSign.join('&') + apiSecret;

    // Create signature using expo-crypto
    const signature = await Crypto.digestStringAsync(
      Crypto.CryptoDigestAlgorithm.SHA1,
      stringToSign
    );

    // Make request to Cloudinary
    const formData = new URLSearchParams();
    formData.append('public_id', public_id);
    formData.append('timestamp', timestamp.toString());
    formData.append('api_key', apiKey);
    formData.append('signature', signature);
    
    if (invalidate) {
      formData.append('invalidate', 'true');
    }

    const response = await fetch(
      `https://api.cloudinary.com/v1_1/${cloudName}/image/destroy`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: formData.toString(),
      }
    );

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Deletion failed: ${response.status} ${errorText}`);
    }

    const result = await response.json();

    if (result.result === 'ok') {
      return Response.json(
        { 
          success: true, 
          message: invalidate 
            ? 'Image deleted and CDN cache invalidated successfully' 
            : 'Image deleted successfully', 
          result 
        },
        { status: 200 }
      );
    } else {
      return Response.json(
        { success: false, message: 'Failed to delete image', result },
        { status: 400 }
      );
    }
  } catch (error: any) {
    console.error('Error deleting image:', error);
    return Response.json(
      { success: false, message: 'Deletion failed', error: error.message },
      { status: 500 }
    );
  }
}