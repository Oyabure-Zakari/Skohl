import blurhash from "@/constants/expoBlurImage";
import { Image } from "expo-image";

type PostDetailsUserImageProps = {
  postUserImage: string | undefined;
};

const PostDetailsUserImage: React.FC<PostDetailsUserImageProps> = ({ postUserImage }) => {
  return (
    <Image
      source={{ uri: postUserImage }}
      style={{ width: 50, height: 50, borderRadius: 25 }}
      placeholder={{ blurhash }}
      transition={300}
      contentFit="cover"
    />
  );
};

export default PostDetailsUserImage;
