import IMAGES from "@/constants/images";
import { Post } from "@/types/PostTypes";
import { FlashList } from "@shopify/flash-list";
import { Image } from "expo-image";
import React from "react";
import { useWindowDimensions, View } from "react-native";
import Animated, { FadeInDown } from "react-native-reanimated";
import PostCardVertical from "./postCardVertical/PostsCardVertical";

type PostListProps = {
  posts: Post[];
  isInOtherUserProfile?: boolean; // Is to prevent the user from navigating to the other user's profile if we're already on the user's profile
};

const PostsList: React.FC<PostListProps> = ({ posts, isInOtherUserProfile }) => {
  const { fontScale } = useWindowDimensions();

  return (
    <>
      {posts.length === 0 ? (
        <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
          <Image
            source={IMAGES.noRecord}
            style={{ width: 200, height: 200 }}
            contentFit="contain"
            transition={1000}
            alt="No Record"
          />
          <Animated.Text
            entering={FadeInDown.delay(400)}
            style={{
              fontSize: fontScale * 16,
              fontFamily: "Segoe_UI_Bold_Italic",
              textAlign: "center",
            }}
          >
            No posts found
          </Animated.Text>
        </View>
      ) : (
        <FlashList
          data={posts}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <PostCardVertical post={item} isInOtherUserProfile={isInOtherUserProfile} />
          )}
          contentContainerStyle={{ paddingVertical: 16 }}
          showsVerticalScrollIndicator={false}
        />
      )}
    </>
  );
};

export default PostsList;
