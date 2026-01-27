import COLORS from "@/constants/colors";
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
      {/* Avatar */}
      <Image
        source={{ uri: post.postedBy.image }}
        style={{ width: 28, height: 28, borderRadius: 14, marginRight: 8 }}
        placeholder={{ blurhash }}
      />

      {/* Name and date */}
      <View
        style={{
          flex: 1,
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          //backgroundColor: "green",
        }}
      >
        {/* Name */}
        <Text
          numberOfLines={1}
          style={{
            fontSize: 12,
            color: COLORS.darkBlue,
            fontFamily: "Segoe_UI_Bold",
            //backgroundColor: "red",
            width: "50%",
          }}
        >
          {getFirstName} {"Oyabure"}
        </Text>

        {/* Date with ReactTimeAgo */}
        <Text
          numberOfLines={1}
          style={{
            fontSize: 10,
            fontFamily: "Segoe_UI_Bold",
            color: COLORS.darkGrey,
            //backgroundColor: "blue",
            //width: "50%",
          }}
        >
          <ReactTimeAgo
            date={postDate}
            locale="en-US"
            component={Time}
            timeStyle="twitter"
            tick={true} // Auto-update enabled (this is the default)
          />
        </Text>
      </View>
    </View>
  );
};

export default PostHeader;
