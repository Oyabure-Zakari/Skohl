import COLORS from "@/constants/colors";
import blurhash from "@/constants/expoBlurImage";
import usePostCardVerticalStyles from "@/styles/postCardVerticalStyles";
import { ProductPost } from "@/types/PostTypes";
import formatFullName from "@/utils/formatUserFullname";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Image } from "expo-image";
import { useRouter } from "expo-router";
import React from "react";
import { Text, TouchableOpacity, View } from "react-native";
import ReactTimeAgo from "react-time-ago";

type PostCardVerticalProps = {
  post: ProductPost;
};

function Time({ children }: { children: string }) {
  return <Text>{children}</Text>;
}

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
        <Image
          source={{ uri: post?.postedBy?.image }}
          style={postCardVerticalStyles.userAvatar}
          placeholder={{ blurhash }}
          contentFit="contain"
          transition={1000}
          alt="Profile Picture"
        />
        {/* User Name + Post Time */}
        <View style={postCardVerticalStyles.userInfo}>
          <Text style={postCardVerticalStyles.userName}>
            {formatFullName(post?.postedBy?.fullName)}
          </Text>
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
      </View>

      {/* Product image */}
      <Image
        source={{ uri: post?.photo }}
        style={postCardVerticalStyles.productImage}
        placeholder={{ blurhash }}
        contentFit="cover"
        transition={1000}
        alt="Product Picture"
      />

      <Text style={postCardVerticalStyles.description} numberOfLines={2}>
        {post?.description}
      </Text>

      {/* Category */}
      <Text style={postCardVerticalStyles.category}>ℹ️ {post?.category}</Text>

      {/* Title */}
      <Text style={postCardVerticalStyles.title} numberOfLines={2}>
        {post?.title}
      </Text>

      {/* Product Price */}
      <Text style={postCardVerticalStyles.price}>{post?.price}</Text>

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
