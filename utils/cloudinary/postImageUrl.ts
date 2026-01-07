import * as ImageManipulator from 'expo-image-manipulator';

const postImageUrl = async (imageUri: string | null): Promise<string | null> => {
  if (!imageUri) {
    throw new Error("No image selected");
  }

  try {
    // Compress and resize image before upload
    const manipulatedImage = await ImageManipulator.manipulateAsync(
      imageUri,
      [
        { resize: { width: 1024 } }, // Resize to max width of 1024px (maintains aspect ratio)
      ],
      {
        compress: 0.7, // Compress to 70% quality
        format: ImageManipulator.SaveFormat.JPEG, // Convert to JPEG for better compression
      }
    );

    // Compressed image URI
    const compressedUri = manipulatedImage.uri;

    const formData = new FormData();
    formData.append("file", {
      uri: compressedUri,
      type: 'image/jpeg', // Always JPEG after compression
      name: 'upload.jpg',
    } as any);
    formData.append("upload_preset", process.env.EXPO_PUBLIC_CLOUDINARY_UPLOADPRESET!);
    formData.append("cloud_name", process.env.EXPO_PUBLIC_CLOUDINARY_CLOUDNAME!);

    const response = await fetch(
      `https://api.cloudinary.com/v1_1/${process.env.EXPO_PUBLIC_CLOUDINARY_CLOUDNAME}/image/upload`,
      {
        method: "POST",
        body: formData,
      }
    );

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Upload failed: ${response.status} ${errorText}`);
    }

    const data = await response.json();

    return data.secure_url || null;
  } catch (err: any) {
    throw new Error(`Network error: ${err.message}`);
  }
};

export default postImageUrl;