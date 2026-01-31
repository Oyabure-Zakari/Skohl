import COLORS from "@/constants/colors";
import { useAuth } from "@/contexts/AuthContext";
import { useDeletePost } from "@/hooks/deletePost";
import usePostCardStyles from "@/styles/postCardStyles";
import { Post } from "@/types/PostTypes";
import { MaterialCommunityIcons, MaterialIcons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React from "react";
import { ActivityIndicator, Alert, Text, TouchableOpacity, View } from "react-native";
import PostCatergory from "../postsCard/PostCatergory";
import PostDescription from "../postsCard/PostDescription";
import PostHeader from "../postsCard/PostHeader";
import PostImage from "../postsCard/PostImage";
import PostPrice from "../postsCard/PostPrice";
import PostTitle from "../postsCard/PostTitle";

interface PostCardProps {
  post: Post;
}

const PostCard: React.FC<PostCardProps> = ({ post }) => {
  // Current user
  const { userUid } = useAuth();

  const router = useRouter();

  // Check if the post is owned by the current user
  const isTheOwner = post.postedBy.userUid === userUid;

  // Tanstack Query hook to delete a post
  const { deletePost, isDeletingPost } = useDeletePost({ post });

  const handleDeletePost = (): void => {
    Alert.alert("Delete Post", `Are you sure you want to delete "${post.title}"?`, [
      { text: "Cancel", style: "cancel" },
      { text: "Delete", style: "destructive", onPress: deletePost },
    ]);
  };

  // Styles
  const postCardStyles = usePostCardStyles();

  return (
    <TouchableOpacity
      onPress={() => router.push(`/(private)/postDetails/${post.id}`)}
      activeOpacity={0.9}
      style={postCardStyles.postsContainer}
    >
      {/* Post Header */}
      <PostHeader post={post} />

      {/* Post Title */}
      <PostTitle title={post.title} />

      {/* Image or description */}
      {post.photo ? (
        <PostImage postImage={post?.photo} />
      ) : (
        <PostDescription postDescripton={post?.description} />
      )}

      {/* Post Details */}
      <View style={{ paddingHorizontal: 10 }}>
        {/* Post Catergory */}
        <PostCatergory catergory={post?.category} />

        {/* Post Price */}
        {(post.postType === "service" || post.postType === "product") && post.price && (
          <PostPrice price={post.price} />
        )}
      </View>

      {/* Footer */}
      <View style={{ flexDirection: "row", padding: 10, alignItems: "center" }}>
        {isTheOwner ? (
          // Delete Button
          <TouchableOpacity
            onPress={handleDeletePost}
            disabled={isDeletingPost}
            style={postCardStyles.deletePostContainer}
          >
            {isDeletingPost ? (
              <ActivityIndicator size="small" color={COLORS.lightGrey} />
            ) : (
              <Text style={postCardStyles.deleteText}>Delete</Text>
            )}
          </TouchableOpacity>
        ) : (
          // Chat Button
          <TouchableOpacity style={postCardStyles.chatBtn}>
            <MaterialCommunityIcons name="chat-outline" size={18} color="white" />
            <Text style={postCardStyles.chatText}>Chat</Text>
          </TouchableOpacity>
        )}

        {/*Edit or Bookmark Button */}
        <TouchableOpacity style={{ marginLeft: "auto" }}>
          {isTheOwner ? (
            // Edit Button
            <MaterialIcons name="edit-note" size={22} color={COLORS.darkGrey} />
          ) : (
            // Bookmark Button
            <MaterialCommunityIcons name="bookmark-outline" size={22} color={COLORS.darkGrey} />
          )}
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );
};

export default PostCard;
