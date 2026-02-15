import blurhash from "@/constants/expoBlurImage";
import { Image } from "expo-image";
import { useRouter } from "expo-router";
import { TouchableOpacity } from "react-native";

type PostDetailsUserImageProps = {
  postUserImage: string | undefined;
  userUid: string | undefined;
};

const PostDetailsUserImage: React.FC<PostDetailsUserImageProps> = ({ postUserImage, userUid }) => {
  const router = useRouter();
  return (
    <TouchableOpacity onPress={() => router.push(`/(private)/userProfilePicture/${userUid}`)}>
      <Image
        source={{ uri: postUserImage }}
        style={{ width: 50, height: 50, borderRadius: 25 }}
        placeholder={{ blurhash }}
        transition={300}
        contentFit="cover"
      />
    </TouchableOpacity>
  );
};

export default PostDetailsUserImage;
