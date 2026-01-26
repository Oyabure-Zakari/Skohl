import deleteCloudinaryImage from "@/app/apis/deleteCloudinaryImage";
import COLORS from "@/constants/colors";
import blurhash from "@/constants/expoBlurImage";
import { useAuth } from "@/contexts/AuthContext";
import { db } from "@/firebase/firebase.config";
import usePostCardStyles from "@/styles/postCardStyles";
import { Post } from "@/types/PostTypes";
import { captilizeWord } from "@/utils/captilizeWord";
import extractPublicId from "@/utils/extractPublicId";
import { MaterialCommunityIcons, MaterialIcons } from "@expo/vector-icons";
import { Image } from "expo-image";
import { deleteDoc, doc } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { ActivityIndicator, Alert, Text, TouchableOpacity, View } from "react-native";
import Toast from "react-native-toast-message";
import ReactTimeAgo from "react-time-ago";

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
      <View style={postCardStyles.postHeaderContainer}>
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

      {/* Image or description */}
      {post.photo ? (
        <Image
          source={{ uri: post.photo }}
          style={{ width: "100%", height: 120 }}
          placeholder={{ blurhash }}
          transition={300}
          contentFit="cover"
        />
      ) : (
        <Text
          style={{
            marginTop: 8,
            paddingHorizontal: 10,
            fontSize: 13,
            fontFamily: "Segoe_UI_Bold",
            color: COLORS.darkGrey,
            borderBottomWidth: 1,
            borderColor: COLORS.lightGrey,
          }}
          numberOfLines={4}
        >
          {post.description}
        </Text>
      )}

      {/* Details */}
      <View style={{ paddingHorizontal: 10 }}>
        <Text
          numberOfLines={1}
          style={{
            fontSize: 12,
            color: COLORS.darkGrey,
            marginTop: 4,
            fontFamily: "Segoe_UI_Bold",
          }}
        >
          ℹ️ {post.category}
        </Text>

        <Text
          numberOfLines={2}
          style={{ width: "90%", fontSize: 15, fontFamily: "Segoe_UI_Bold_Italic" }}
        >
          {post.title}
        </Text>

        {(post.postType === "service" || post.postType === "product") && post.price && (
          <Text
            style={{ fontSize: 13, fontFamily: "Segoe_UI_Bold_Italic", color: COLORS.darkGrey }}
          >
            {post.price}
          </Text>
        )}
      </View>

      {/* Footer */}
      <View style={{ flexDirection: "row", padding: 10, alignItems: "center" }}>
        {isTheOwner ? (
          <TouchableOpacity
            onPress={handleDeletePost}
            disabled={isDeletingPost}
            style={{
              flexDirection: "row",
              alignItems: "center",
              backgroundColor: COLORS.darkBlue,
              paddingVertical: 4,
              paddingHorizontal: 12,
              borderRadius: 5,
              gap: 6,
            }}
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
