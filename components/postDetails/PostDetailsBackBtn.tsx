import COLORS from "@/constants/colors";
import usePostDetailsStyles from "@/styles/postDetails.styles";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { TouchableOpacity } from "react-native";

const PostDetailsBackBtn: React.FC = () => {
  const postDetailsStyles = usePostDetailsStyles();

  const router = useRouter();

  return (
    <TouchableOpacity onPress={() => router.back()} style={postDetailsStyles.backButton}>
      <Ionicons name="arrow-back-sharp" size={24} color={COLORS.darkBlue} />
    </TouchableOpacity>
  );
};

export default PostDetailsBackBtn;
