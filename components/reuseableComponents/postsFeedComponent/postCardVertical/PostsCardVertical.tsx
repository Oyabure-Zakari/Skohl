import COLORS from "@/constants/colors";
import { useAuth } from "@/contexts/AuthContext";
import { db } from "@/firebase/firebase.config";
import { useDeletePost } from "@/hooks/deletePost";
import usePostCardStyles from "@/styles/postCardStyles";
import usePostCardVerticalStyles from "@/styles/postCardVerticalStyles";
import { Post } from "@/types/PostTypes";
import formatFullName from "@/utils/formatUserFullname";
import { MaterialCommunityIcons, MaterialIcons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { collection, doc, getDocs, query, setDoc, where } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { ActivityIndicator, Alert, Text, TouchableOpacity, View } from "react-native";
import OverlayLoadingIndicator from "../../OverlayLoadingIndicator";
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
  const postCardStyles = usePostCardStyles();

  // Context
  const { userUid } = useAuth();

  // Check if the post is owned by the current user
  const isTheOwner = post.postedBy.userUid === userUid;

  // Tanstack Query hook to delete a post
  const { deletePost, isDeletingPost } = useDeletePost({ post });

  const [loading, setLoading] = useState(false);
  const [isBookmarked, setIsBookmarked] = useState(false);

  // Function to query all bookmarks id by the user
  const fetchBookmarkIds = async () => {
    try {
      const bookmarksRef = collection(db, "bookmarks");
      const q = query(bookmarksRef, where("bookmarkedBy", "==", userUid));
      const querySnapshot = await getDocs(q);

      const bookmarkIds: string[] = [];
      querySnapshot.forEach((doc) => {
        const bookmarkId = doc.data().bookmarkId;
        if (bookmarkId) {
          bookmarkIds.push(bookmarkId);
        }
      });

      setIsBookmarked(bookmarkIds.includes(post.id));
    } catch (error: any) {
      console.log("Error fetching bookmarks:", error.message);
    }
  };

  // Fetch user bookmarks on component mount
  useEffect(() => {
    fetchBookmarkIds();
  }, []);

  const handleDeletePost = (): void => {
    Alert.alert("Delete Post", `Are you sure you want to delete "${post?.title}"?`, [
      { text: "Cancel", style: "cancel" },
      { text: "Delete", style: "destructive", onPress: deletePost },
    ]);
  };

  const handleBookmark = async () => {
    setLoading(true);
    try {
      await setDoc(doc(db, "bookmarks", post?.id), {
        bookmarkId: post.id,
        bookmarkedBy: userUid,
      });
      console.log("Bookmark added with ID: ", post?.id);
      // Refresh bookmarks after adding
      await fetchBookmarkIds();
    } catch (error: any) {
      console.log(error.message);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <OverlayLoadingIndicator />;

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

      {/* Title */}
      <Text style={postCardVerticalStyles.title} numberOfLines={2}>
        {post?.title}
      </Text>

      {/* Product image */}
      {post?.photo && <PostCardImage image={post?.photo} />}

      <Text style={postCardVerticalStyles.description} numberOfLines={post?.photo ? 2 : 4}>
        {post?.description}
      </Text>

      {/* Category */}
      <Text style={postCardVerticalStyles.category}>ℹ️ {post?.category}</Text>

      {/* Price */}
      {post?.postType !== "event" && (
        <Text style={postCardVerticalStyles.price}>{post?.price}</Text>
      )}

      {/* Action buttons */}
      <View style={postCardVerticalStyles.actionBtnsContainer}>
        <View style={{ flexDirection: "row", gap: 20 }}>
          {/* Bookmark Button */}
          <TouchableOpacity onPress={handleBookmark}>
            <MaterialCommunityIcons
              name={isBookmarked ? "bookmark" : "bookmark-outline"}
              size={22}
              color={COLORS.yellow}
            />
          </TouchableOpacity>

          {/* Only show edit button if the post is owned by the current user */}
          {isTheOwner && (
            // Edit Button
            <TouchableOpacity>
              <MaterialIcons name="edit-note" size={22} color={COLORS.darkGrey} />
            </TouchableOpacity>
          )}
        </View>

        {/* Only show chat button if the post is not owned by the current user */}
        {!isTheOwner ? (
          <TouchableOpacity style={postCardVerticalStyles.chatBtn}>
            <MaterialCommunityIcons name="chat-outline" size={22} color={COLORS.lightGrey} />
            <Text style={postCardVerticalStyles.chatBtnText}>Chat</Text>
          </TouchableOpacity>
        ) : (
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
        )}
      </View>
    </TouchableOpacity>
  );
};

export default PostCardVertical;
