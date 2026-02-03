import usePostDetailsStyles from "@/styles/postDetails.styles";
import { Text } from "react-native";

import ReactTimeAgo from "react-time-ago";

type PostDetailsTimeProps = {
  postTime: {
    seconds: number;
    nanoseconds: number;
    type: string;
  };
};

function Time({ children }: { children: string }) {
  return <Text>{children}</Text>;
}

const PostDetailsTime: React.FC<PostDetailsTimeProps> = ({ postTime }) => {
  const postDetailsStyles = usePostDetailsStyles();

  // Safe timestamp conversion with fallback
  const postDate = postTime?.seconds
    ? new Date(postTime?.seconds * 1000 + (postTime?.nanoseconds || 0) / 1000000)
    : new Date(); // fallback to now

  return (
    <Text style={postDetailsStyles.postTimeText}>
      Posted{" • "}
      <ReactTimeAgo
        date={postDate}
        locale="en-US"
        component={Time}
        timeStyle="round"
        tick={true} // Auto-update enabled (this is the default)
        updateInterval={60000} // Update every minute
      />
    </Text>
  );
};

export default PostDetailsTime;
