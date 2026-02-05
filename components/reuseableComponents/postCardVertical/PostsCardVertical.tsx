import COLORS from "@/constants/colors";
import usePostCardVerticalStyles from "@/styles/postCardVerticalStyles";
import { Post } from "@/types/PostTypes";
import formatFullName from "@/utils/formatUserFullname";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React from "react";
import { Text, TouchableOpacity, View } from "react-native";
import PostCardImage from "./PostCardImage";
import PostUserImage from "./PostUserImage";
import PostUserNameAndTime from "./PostUserNameAndTime";

type PostCardVerticalProps = {
  post: Post;
};

const PostCardVertical: React.FC<PostCardVerticalProps> = ({ post }) => {
  const router = useRouter();

  // Safe timestamp conversion with fallback
  const postDate = post.createdAt?.seconds
    ? new Date(post.createdAt.seconds * 1000 + (post.createdAt.nanoseconds || 0) / 1000000)
    : new Date(); // fallback to now

  // Styles
  const postCardVerticalStyles = usePostCardVerticalStyles();

  return (
    <TouchableOpacity
      style={postCardVerticalStyles.card}
      onPress={() => router.push(`/(private)/postDetails/${post.id}`)}
    >
      {/* Post Card Header */}
      <View style={postCardVerticalStyles.header}>
        {/* User Image */}
        <PostUserImage image={post?.postedBy?.image} />
        {/* User Name + Post Time */}
        <PostUserNameAndTime
          fullName={formatFullName(post?.postedBy?.fullName)}
          postDate={postDate}
        />
      </View>

      {/* Product image */}
      <PostCardImage image={post?.photo} />

      <Text style={postCardVerticalStyles.description} numberOfLines={2}>
        {post?.description}
      </Text>

      {/* Category */}
      <Text style={postCardVerticalStyles.category}>ℹ️ {post?.category}</Text>

      {/* Title */}
      <Text style={postCardVerticalStyles.title} numberOfLines={2}>
        {post?.title}
      </Text>

      {/* Price */}
      <Text style={postCardVerticalStyles.price}>
        {post?.postType === "product" && post?.price}
      </Text>

      {/* Action buttons */}
      <View style={postCardVerticalStyles.actionBtnsContainer}>
        <TouchableOpacity>
          <MaterialCommunityIcons name="bookmark-outline" size={22} color={COLORS.yellow} />
        </TouchableOpacity>

        <TouchableOpacity style={postCardVerticalStyles.chatBtn}>
          <MaterialCommunityIcons name="chat-outline" size={22} color={COLORS.lightGrey} />
          <Text style={postCardVerticalStyles.chatBtnText}>Chat</Text>
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );
};

export default PostCardVertical;
