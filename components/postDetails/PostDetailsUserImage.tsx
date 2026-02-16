import blurhash from "@/constants/expoBlurImage";
import { useAuth } from "@/contexts/AuthContext";
import { Image } from "expo-image";
import { useRouter } from "expo-router";
import { TouchableOpacity } from "react-native";

type PostDetailsUserImageProps = {
  postUserImage: string | undefined;
  userUid: string | undefined;
};

const PostDetailsUserImage: React.FC<PostDetailsUserImageProps> = ({
  postUserImage,
  userUid: otherUserUid,
}) => {
  const router = useRouter();

  const { userUid: currentlyLoggedInUser } = useAuth();

  const handleNavigation = () => {
    if (otherUserUid === currentlyLoggedInUser) {
      // If the post is owned by the current user then navigate to the Profile screen
      router.push("/(private)/(tabs)/Profile");
    } else {
      // If the post is not owned by the current user then navigate to the OtherUserProfile screen
      router.push(`/(private)/otherUserProfile/${otherUserUid}`);
    }
  };
  return (
    <TouchableOpacity onPress={handleNavigation}>
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
