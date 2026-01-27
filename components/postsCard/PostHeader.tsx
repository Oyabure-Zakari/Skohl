import blurhash from "@/constants/expoBlurImage";
import usePostCardStyles from "@/styles/postCardStyles";
import { BasePost } from "@/types/PostTypes";
import { captilizeWord } from "@/utils/captilizeWord";
import { Image } from "expo-image";
import React from "react";
import { Text, View } from "react-native";
import ReactTimeAgo from "react-time-ago";

type PostHeaderProps = {
  post: BasePost;
};

function Time({ children }: { children: string }) {
  return <Text>{children}</Text>;
}

const PostHeader: React.FC<PostHeaderProps> = ({ post }) => {
  const getFirstName = captilizeWord(post.postedBy.fullName.split(" ")[1] || "");

  // Safe timestamp conversion with fallback
  const postDate = post.createdAt?.seconds
    ? new Date(post.createdAt.seconds * 1000 + (post.createdAt.nanoseconds || 0) / 1000000)
    : new Date(); // fallback to now

  const postCardStyles = usePostCardStyles();

  return (
    <View style={postCardStyles.postHeaderContainer}>
      {/* User Image */}
      <Image
        source={{ uri: post.postedBy.image }}
        style={{ width: 28, height: 28, borderRadius: 14, marginRight: 8 }}
        placeholder={{ blurhash }}
        alt="User Profile Picture"
      />

      {/* Post Header Info */}
      <View style={postCardStyles.postHeaderInfo}>
        {/* Post Owner */}
        <Text numberOfLines={1} style={postCardStyles.userName}>
          {getFirstName}
        </Text>

        {/* Post Time */}
        <Text numberOfLines={1} style={postCardStyles.postTime}>
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
    </View>
  );
};

export default PostHeader;
