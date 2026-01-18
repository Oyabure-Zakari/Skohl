const extractPublicId = (cloudinaryImageUrl: string): string  => {
  // Remove file extension i.e .jpg
  const fileName = cloudinaryImageUrl.slice(0, cloudinaryImageUrl.lastIndexOf("."));
  // i.e https://res.cloudinary.com/gni2ni4na/image/upload/v2350195783/kshb2knab0uj4gva42b6

  // Extract public id after the last "/" character
  return fileName.slice(fileName.lastIndexOf("/") + 1); // i.e kshb2knab0uj4gva42b6
};

export default extractPublicId;