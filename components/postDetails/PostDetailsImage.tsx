import blurhash from "@/constants/expoBlurImage";
import { Image } from "expo-image";

type PostDetailsImageProps = {
  postImage: string;
};

const PostDetailsImage: React.FC<PostDetailsImageProps> = ({ postImage }) => {
  return (
    <Image
      source={{ uri: postImage }}
      style={{ width: "100%", height: 300, position: "relative", top: 0 }}
      placeholder={{ blurhash }}
      transition={300}
      contentFit="cover"
    />
  );
};

export default PostDetailsImage;
