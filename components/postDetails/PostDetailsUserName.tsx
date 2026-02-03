import usePostDetailsStyles from "@/styles/postDetails.styles";
import formatFullName from "@/utils/formatUserFullname";
import { Text } from "react-native";

type PostDetailsUserNameProps = {
  fullName: string;
};

const PostDetailsUserName: React.FC<PostDetailsUserNameProps> = ({ fullName }) => {
  const postDetailsStyles = usePostDetailsStyles();
  return <Text style={postDetailsStyles.userNameText}>{formatFullName(fullName)}</Text>;
};

export default PostDetailsUserName;
