import { Cloudinary } from "@cloudinary/url-gen";
import { upload } from "cloudinary-react-native";
import {
  UploadApiErrorResponse,
  UploadApiResponse,
} from "cloudinary-react-native/lib/typescript/src/api/upload/model/params/upload-params";

const generateImageUrl = async (
  image: string | null,
  setError: (error: string) => void
): Promise<string | null> => {
  if (!image) return null;

  const cld = new Cloudinary({
    cloud: {
      cloudName: process.env.EXPO_PUBLIC_CLOUDINARY_CLOUDNAME,
    },
    url: {
      secure: true,
    },
  });

  const options = {
    upload_preset: process.env.EXPO_PUBLIC_CLOUDINARY_UPLOADPRESET,
    unsigned: true,
  };

  return new Promise((resolve, reject) => {
    upload(cld, {
      file: image,
      options: options,
      callback: (
        error: UploadApiErrorResponse | undefined,
        response: UploadApiResponse | undefined
      ) => {
        if (error) {
          setError(`Couldn't upload image: ${error.message}`);
          reject(error);
          return;
        }

        if (response?.secure_url) {
          resolve(response.secure_url);
        } else {
          resolve(null);
        }
      },
    });
  });
};

export default generateImageUrl;
