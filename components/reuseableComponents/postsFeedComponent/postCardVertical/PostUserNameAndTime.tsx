import usePostCardVerticalStyles from "@/styles/postCardVerticalStyles";
import React from "react";
import { Text, View } from "react-native";
import ReactTimeAgo from "react-time-ago";

type PostUserNameAndTimeProps = {
  fullName: string;
  postDate: Date;
};

function Time({ children }: { children: string }) {
  return <Text>{children}</Text>;
}

const PostUserNameAndTime: React.FC<PostUserNameAndTimeProps> = ({ fullName, postDate }) => {
  const postCardVerticalStyles = usePostCardVerticalStyles();

  return (
    <View style={postCardVerticalStyles.userInfo}>
      {/* User Fullname */}
      <Text style={postCardVerticalStyles.userName}>{fullName}</Text>

      {/* Post Date */}
      <Text style={postCardVerticalStyles.time}>
        <ReactTimeAgo
          date={postDate}
          locale="en-US"
          component={Time}
          timeStyle="round"
          tick={true} // Auto-update enabled (this is the default)
          updateInterval={60000} // Update every minute
        />
      </Text>
    </View>
  );
};

export default PostUserNameAndTime;
