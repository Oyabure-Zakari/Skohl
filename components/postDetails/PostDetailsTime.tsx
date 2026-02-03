import usePostDetailsStyles from "@/styles/postDetails.styles";
import { Text } from "react-native";

import ReactTimeAgo from "react-time-ago";

type PostDetailsTimeProps = {
  postDate: Date;
};

function Time({ children }: { children: string }) {
  return <Text>{children}</Text>;
}

const PostDetailsTime: React.FC<PostDetailsTimeProps> = ({ postDate }) => {
  const postDetailsStyles = usePostDetailsStyles();

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
