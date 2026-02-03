import usePostDetailsStyles from "@/styles/postDetails.styles";
import { Post } from "@/types/PostTypes";
import { Text, View } from "react-native";

type PostDetailsInfoProps = {
  postDetails: Post;
};

const PostDetailsInfo: React.FC<PostDetailsInfoProps> = ({ postDetails }) => {
  const postDetailsStyles = usePostDetailsStyles();

  return (
    <View style={{ marginTop: 10 }}>
      {postDetails?.postType === "product" && (
        <>
          <Text style={postDetailsStyles.infoText}>💵 Price:{postDetails?.price}</Text>
        </>
      )}
      {postDetails?.postType === "service" && (
        <>
          <Text style={postDetailsStyles.infoText}>💵 Price: {postDetails?.price}</Text>
          <Text style={postDetailsStyles.infoText}>
            🗓️ Schedule: {postDetails?.serviceSchedule}
          </Text>
        </>
      )}
      {postDetails?.postType === "event" && (
        <>
          <Text style={postDetailsStyles.infoText}>🗓️ Date: {postDetails?.eventDate}</Text>
          <Text style={postDetailsStyles.infoText}>🕒 Time: {postDetails?.eventTime}</Text>
          <Text style={postDetailsStyles.infoText}>📍 Venue: {postDetails?.eventVenue}</Text>
          <Text style={postDetailsStyles.infoText2}>
            {" • "}
            {postDetails?.eventType}
          </Text>
        </>
      )}
    </View>
  );
};

export default PostDetailsInfo;
