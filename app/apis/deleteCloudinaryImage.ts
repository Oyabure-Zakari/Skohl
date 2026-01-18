  const deleteCloudinaryImage = async (publicId: string) => {
    const response = await fetch("/apis/cloudinary/delete-image", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        public_id: publicId,
        invalidate: true,
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || "Failed to delete image");
    }
  };

  export default deleteCloudinaryImage;