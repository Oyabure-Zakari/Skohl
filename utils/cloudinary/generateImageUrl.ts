const generateImageUrl = async (
  imageUri: string | null,
  setError: (msg: string) => void
): Promise<string | null> => {
  if (!imageUri) {
    setError("No image selected");
    return null;
  }

  const detectImageType = () => {
    if (imageUri.toLowerCase().endsWith(".jpg") || imageUri.toLowerCase().endsWith(".jpeg"))
      return "jpeg";
    else if (imageUri.toLowerCase().endsWith(".png")) return "png";
  };

  const imageType = detectImageType();
  if (!imageType) {
    setError("Unsupported image format");
    return null;
  }

  const detectExtension = () => {
    if (imageUri.toLowerCase().endsWith(".jpg") || imageUri.toLowerCase().endsWith(".jpeg")) 
      return "jpeg";
    else if (imageUri.toLowerCase().endsWith(".png")) return "png";
  };

  const extension = detectExtension();
  if (!extension) {
    setError("Extension not found");
    return null;
  }

  try {
    const formData = new FormData();
    formData.append("file", {
      uri: imageUri,
      type: `image/${imageType}`,
      name: `upload.${extension}`,
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
      setError(`Upload failed: ${response.status} ${errorText}`);
      return null;
    }

    const data = await response.json();
    return data.secure_url || null;
  } catch (err: any) {
    setError(`Network error: ${err.message}`);
    return null;
  }
};

export default generateImageUrl;
