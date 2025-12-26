const postImageUrl = async (imageUri: string | null): Promise<string | null> => {
  if (!imageUri) {
    throw new Error("No image selected");
  }

  const detectImageType = () => {
    if (imageUri.toLowerCase().endsWith(".jpg") || imageUri.toLowerCase().endsWith(".jpeg"))
      return "jpeg";
    else if (imageUri.toLowerCase().endsWith(".png")) return "png";
  };

  const imageType = detectImageType();
  if (!imageType) {
    throw new Error("Unsupported image format");
  }

  const detectExtension = () => {
    if (imageUri.toLowerCase().endsWith(".jpg") || imageUri.toLowerCase().endsWith(".jpeg"))
      return "jpeg";
    else if (imageUri.toLowerCase().endsWith(".png")) return "png";
  };

  const extension = detectExtension();
  if (!extension) {
    throw new Error("Extension not found");
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
      throw new Error(`Upload failed: ${response.status} ${errorText}`);
    }

    const data = await response.json();
    return data.secure_url || null;
  } catch (err: any) {
    throw new Error(`Network error: ${err.message}`);
  }
};

export default postImageUrl;
