import COLORS from "@/constants/colors";
import blurhash from "@/constants/expoBlurImage";
import { BasePost } from "@/types/PostTypes";
import { captilizeWord } from "@/utils/captilizeWord";
import { Image } from "expo-image";
import React, { useEffect, useState } from "react";
import { Text, View } from "react-native";
import ReactTimeAgo from "react-time-ago";

type PostHeaderProps = {
  post: BasePost;
};

function Time({ children }: { children: string }) {
  return <Text>{children}</Text>;
}

const PostHeader: React.FC<PostHeaderProps> = ({ post }) => {
  const [refreshKey, setRefreshKey] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setRefreshKey((prev) => prev + 1); // Forces re-render of TimeAgo
    }, 30000); // every 30 seconds

    return () => clearInterval(interval);
  }, []);

  const getFirstName = captilizeWord(post.postedBy.fullName.split(" ")[1] || "");

  // Safe timestamp conversion with fallback
  const postDate = post.createdAt?.seconds
    ? new Date(post.createdAt.seconds * 1000 + (post.createdAt.nanoseconds || 0) / 1000000)
    : new Date(); // fallback to now

  return (
    <>
      {/* User info */}
      <View style={{ flexDirection: "row", alignItems: "center", padding: 5 }}>
        <Image
          source={{ uri: post.postedBy.image }}
          style={{ width: 28, height: 28, borderRadius: 14, marginRight: 8 }}
          placeholder={{ blurhash }}
        />

        <View
          style={{
            flex: 1,
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Text
            numberOfLines={1}
            style={{
              fontSize: 12,
              color: COLORS.darkBlue,
              fontFamily: "Segoe_UI_Bold",
              width: "50%",
            }}
          >
            {getFirstName}
          </Text>

          {/* Safe TimeAgo */}
          <Text
            numberOfLines={1}
            style={{
              fontSize: 10,
              fontFamily: "Segoe_UI_Bold",
              color: COLORS.darkGrey,
            }}
          >
            <ReactTimeAgo
              key={refreshKey} // Forces re-mount/re-calc every 20s
              date={postDate}
              locale="en-US"
              component={Time}
              timeStyle="twitter"
              tick={false} // Turn off internal tick
            />
          </Text>
        </View>
      </View>
    </>
  );
};

export default PostHeader;
