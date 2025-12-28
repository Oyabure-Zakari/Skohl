import * as ImageManipulator from "expo-image-manipulator";

const generateImageUrl = async (
  imageUri: string | null,
  setError: (msg: string) => void
): Promise<string | null> => {
  // No image selected
  if (!imageUri) {
    setError("No image selected");
    return null;
  }

  try {
    // Start image compression
    console.log("Starting image compression...");
    const startCompress = Date.now();

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

    // Log compression time for debugging
    const compressTime = Date.now() - startCompress;
    console.log(`Image compression took ${compressTime}ms`);

    const compressedUri = manipulatedImage.uri;

    // Start Cloudinary upload
    const formData = new FormData();
    formData.append("file", {
      uri: compressedUri,
      type: "image/jpeg", // Always JPEG after compression
      name: "upload.jpg",
    } as any);
    formData.append("upload_preset", process.env.EXPO_PUBLIC_CLOUDINARY_UPLOADPRESET!);
    formData.append("cloud_name", process.env.EXPO_PUBLIC_CLOUDINARY_CLOUDNAME!);

    //  Log Cloudinary time for debugging
    console.log("Starting Cloudinary upload...");
    const startTime = Date.now();

    const response = await fetch(
      `https://api.cloudinary.com/v1_1/${process.env.EXPO_PUBLIC_CLOUDINARY_CLOUDNAME}/image/upload`,
      {
        method: "POST",
        body: formData,
      }
    );

    // Log Cloudinary time for debugging
    const cloudinaryTime = Date.now() - startTime;
    console.log(`Cloudinary upload took ${cloudinaryTime}ms`);

    if (!response.ok) {
      const errorText = await response.text();
      setError(`Upload failed: ${response.status} ${errorText}`);
      return null;
    }

    const data = await response.json();

    // Log total time for debugging
    console.log(`Total time ${compressTime + cloudinaryTime}ms`);

    return data.secure_url || null;
  } catch (err: any) {
    setError(`Network error: ${err.message}`);
    return null;
  }
};

export default generateImageUrl;
