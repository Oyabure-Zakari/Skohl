import { Post } from "@/types/PostTypes";
import React from "react";
import { FlatList } from "react-native";
import PostCardVertical from "../reuseableComponents/postCardVertical/PostsCardVertical";

type PostListProps = {
  posts: Post[];
};

const PostsList: React.FC<PostListProps> = ({ posts }) => {
  return (
    <FlatList
      data={posts}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => <PostCardVertical post={item} />}
      contentContainerStyle={{ paddingVertical: 16 }}
      showsVerticalScrollIndicator={false}
    />
  );
};

export default PostsList;
