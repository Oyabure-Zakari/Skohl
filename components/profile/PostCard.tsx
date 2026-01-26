import deleteCloudinaryImage from "@/app/apis/deleteCloudinaryImage";
import COLORS from "@/constants/colors";
import { useAuth } from "@/contexts/AuthContext";
import { db } from "@/firebase/firebase.config";
import usePostCardStyles from "@/styles/postCardStyles";
import { Post } from "@/types/PostTypes";
import { captilizeWord } from "@/utils/captilizeWord";
import extractPublicId from "@/utils/extractPublicId";
import { MaterialCommunityIcons, MaterialIcons } from "@expo/vector-icons";
import { deleteDoc, doc } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { ActivityIndicator, Alert, Text, TouchableOpacity, View } from "react-native";
import Toast from "react-native-toast-message";
import PostCatergory from "../postsCard/PostCatergory";
import PostDescription from "../postsCard/PostDescription";
import PostHeader from "../postsCard/PostHeader";
import PostImage from "../postsCard/PostImage";
import PostPrice from "../postsCard/PostPrice";
import PostTitle from "../postsCard/PostTitle";

// Custom Time component for React Native (required by react-time-ago)
function Time({ children }: { children: string }) {
  return <Text>{children}</Text>;
}

interface PostCardProps {
  post: Post;
}

const PostCard: React.FC<PostCardProps> = ({ post }) => {
  const { userUid } = useAuth();
  const isTheOwner = post.postedBy.userUid === userUid;

  const getFirstName = captilizeWord(post.postedBy.fullName.split(" ")[1] || "");

  // Safe timestamp conversion with fallback
  const postDate = post.createdAt?.seconds
    ? new Date(post.createdAt.seconds * 1000 + (post.createdAt.nanoseconds || 0) / 1000000)
    : new Date(); // fallback to now

  const [refreshKey, setRefreshKey] = useState(0);
  const [isDeletingPost, setIsDeletingPost] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setRefreshKey((prev) => prev + 1); // Forces re-render of TimeAgo
    }, 30000); // every 30 seconds

    return () => clearInterval(interval);
  }, []);

  const deleteImageFromCloudinary = async () => {
    // Check if the post has an image
    if (post?.photo) {
      try {
        const publicId = extractPublicId(post.photo);
        if (publicId) await deleteCloudinaryImage(publicId);
      } catch (deleteError: any) {
        //console.error("Failed to delete old image:", deleteError.message);
        // Don't throw here - profile update was successful
      }
    }
  };

  const deletePost = async () => {
    setIsDeletingPost(true);
    try {
      await deleteImageFromCloudinary();
      await deleteDoc(doc(db, "posts", post.id));
      Toast.show({
        type: "success",
        text1: "Post deleted",
        text2: "Post deleted successfully",
        text1Style: { fontSize: 16, fontFamily: "Segoe_UI_Bold" },
        text2Style: { fontSize: 12, fontFamily: "Segoe_UI_Bold" },
      });
    } catch (error: any) {
      Toast.show({
        type: "error",
        text1: "Post not deleted",
        text2: "Failed to delete post. Try again.",
        text1Style: { fontSize: 16, fontFamily: "Segoe_UI_Bold" },
        text2Style: { fontSize: 12, fontFamily: "Segoe_UI_Bold" },
      });
    } finally {
      setIsDeletingPost(false);
    }
  };

  const handleDeletePost = () => {
    Alert.alert("Delete Post", `Are you sure you want to delete "${post.title}"?`, [
      { text: "Cancel", style: "cancel" },
      { text: "Delete", style: "destructive", onPress: deletePost },
    ]);
  };

  const postCardStyles = usePostCardStyles();

  return (
    <TouchableOpacity activeOpacity={0.9} style={postCardStyles.postsContainer}>
      {/* Post Header */}
      <PostHeader post={post} />

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

        {/* Post Title */}
        <PostTitle title={post.title} />

        {/* Post Price */}
        {(post.postType === "service" || post.postType === "product") && post.price && (
          <PostPrice price={post.price} />
        )}
      </View>

      {/* Footer */}
      <View style={{ flexDirection: "row", padding: 10, alignItems: "center" }}>
        {isTheOwner ? (
          <TouchableOpacity
            onPress={handleDeletePost}
            disabled={isDeletingPost}
            style={postCardStyles.deletePostContainer}
          >
            {isDeletingPost ? (
              <ActivityIndicator size="small" color={COLORS.lightGrey} />
            ) : (
              <Text
                style={{
                  color: COLORS.lightGrey,
                  fontSize: 13,
                  fontFamily: "Segoe_UI_Bold",
                }}
              >
                Delete
              </Text>
            )}
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            style={{
              flexDirection: "row",
              alignItems: "center",
              backgroundColor: COLORS.darkBlue,
              paddingVertical: 4,
              paddingHorizontal: 12,
              borderRadius: 5,
            }}
          >
            <MaterialCommunityIcons name="chat-outline" size={18} color="white" />
            <Text style={{ color: "white", fontSize: 13, marginLeft: 6, fontWeight: "600" }}>
              Chat
            </Text>
          </TouchableOpacity>
        )}

        <TouchableOpacity style={{ marginLeft: "auto" }}>
          {isTheOwner ? (
            <MaterialIcons name="edit-note" size={22} color={COLORS.darkGrey} />
          ) : (
            <MaterialCommunityIcons name="bookmark-outline" size={22} color={COLORS.darkGrey} />
          )}
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );
};

export default PostCard;
