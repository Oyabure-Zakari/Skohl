import COLORS from "@/constants/colors";
import { useAuth } from "@/contexts/AuthContext";
import useAddToBookmarks from "@/hooks/addToBookmarks";
import { useDeletePost } from "@/hooks/deletePost";
import useFetchBookmarks from "@/hooks/fetchBookmarks";
import { useRemoveFromBookmark } from "@/hooks/removeFromBookmarks";
import usePostCardVerticalStyles from "@/styles/postCardVerticalStyles";
import { Post } from "@/types/PostTypes";
import bookmarkLogic from "@/utils/bookmark";
import formatFullName from "@/utils/formatUserFullname";
import { MaterialCommunityIcons, MaterialIcons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React from "react";
import { ActivityIndicator, Alert, Text, TouchableOpacity, View } from "react-native";
import BookmarkBtn from "../../BookmarkBtn";
import OverlayLoadingIndicator from "../../OverlayLoadingIndicator";
import PostCardImage from "./PostCardImage";
import PostCardVerticalDeleteBtn from "./PostCardVerticalDeleteBtn";
import PostUserImage from "./PostUserImage";
import PostUserNameAndTime from "./PostUserNameAndTime";

type PostCardVerticalProps = {
  post: Post;
  isInOtherUserProfile?: boolean | undefined; // Is to prevent the user from navigating to the other user's profile if we're already on the user's profile
};

const PostCardVertical: React.FC<PostCardVerticalProps> = ({ post, isInOtherUserProfile }) => {
  const router = useRouter();

  // Safe timestamp conversion with fallback
  const postDate = post.createdAt?.seconds
    ? new Date(post.createdAt.seconds * 1000 + (post.createdAt.nanoseconds || 0) / 1000000)
    : new Date(); // fallback to now

  // Styles
  const postCardVerticalStyles = usePostCardVerticalStyles();

  // Context
  const { userUid } = useAuth();

  // Check if the post is owned by the current user
  const isTheOwner = post.postedBy.userUid === userUid;

  // Tanstack Query hook to delete a post
  const { deletePost, isDeletingPost } = useDeletePost({ post });

  // Fetching bookmarkIds via tanstack query + firebase onSnapshot listener (real-time updates)
  const { bookmarks, isLoadingBookmarks, isBookmarksError, bookmarksError } =
    useFetchBookmarks(userUid);

  // Tanstack query hook to add a post to bookmarks
  const { addToBookmarks, isAddingToBookmarks } = useAddToBookmarks({
    postId: post?.id,
    userUid,
    post,
  });

  // Tanstack query hook to remove a post from bookmarks
  const { removeFromBookmarks, isRemovingFromBookmarks } = useRemoveFromBookmark({
    postId: post?.id,
  });

  // Get bookmarkIds
  const bookmarkIds = bookmarks?.map((bookmark) => bookmark.bookmarkId);

  // Checks if post is bookmarked
  const isBookmarked = bookmarkIds?.includes(post?.id);

  // Get bookmarkedBy
  const bookmarkedBy = bookmarks?.map((bookmark) => bookmark?.bookmarkedBy);

  // Checks if the post is bookmarked by the current user
  const isOwnerOfTheBookmark = bookmarkedBy?.includes(userUid!);

  // BookmarkIds loading
  if (isLoadingBookmarks) {
    return <OverlayLoadingIndicator />;
  }

  // BookmarkIds error
  if (isBookmarksError) {
    Alert.alert(`${bookmarksError?.message}`);
    return null;
  }

  // Handles bookmarking a post
  const handleBookmark = () => {
    bookmarkLogic(isBookmarked, isOwnerOfTheBookmark, addToBookmarks, removeFromBookmarks);
  };

  // Handles deleting a post
  const handleDeletePost = (): void => {
    Alert.alert("Delete Post", `Are you sure you want to delete "${post?.title}"?`, [
      { text: "Cancel", style: "cancel" },
      { text: "Delete", style: "destructive", onPress: deletePost },
    ]);
  };

  return (
    <TouchableOpacity
      style={postCardVerticalStyles.card}
      onPress={() => router.push(`/(private)/postDetails/${post.id}`)}
    >
      {/* Post Card Header */}
      <View style={postCardVerticalStyles.header}>
        {/* User Image */}
        <PostUserImage
          image={post?.postedBy?.image}
          userUid={post?.postedBy?.userUid}
          isInOtherUserProfile={isInOtherUserProfile}
        />
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
          {isAddingToBookmarks || isRemovingFromBookmarks ? (
            <ActivityIndicator size="small" color={COLORS.darkBlue} />
          ) : (
            <BookmarkBtn handleBookmark={handleBookmark} isBookmarked={isBookmarked} size={22} />
          )}

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
          <PostCardVerticalDeleteBtn
            handleDeletePost={handleDeletePost}
            isDeletingPost={isDeletingPost}
          />
        )}
      </View>
    </TouchableOpacity>
  );
};

export default PostCardVertical;
