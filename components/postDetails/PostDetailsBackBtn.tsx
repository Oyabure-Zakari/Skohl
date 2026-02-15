import COLORS from "@/constants/colors";
import usePostDetailsStyles from "@/styles/postDetails.styles";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { TouchableOpacity } from "react-native";

type PostDetailsBackBtnProps = {
  isPostPhotoAvaliable: boolean; // check if the post has a photo which will be used to determine the position of the back button
};

const PostDetailsBackBtn: React.FC<PostDetailsBackBtnProps> = ({ isPostPhotoAvaliable }) => {
  const postDetailsStyles = usePostDetailsStyles();

  const router = useRouter();

  return (
    <TouchableOpacity
      onPress={() => router.back()}
      style={
        isPostPhotoAvaliable ? postDetailsStyles.backButton : { position: "relative", margin: 16 }
      }
    >
      <Ionicons name="arrow-back-sharp" size={24} color={COLORS.darkBlue} />
    </TouchableOpacity>
  );
};

export default PostDetailsBackBtn;
