// React Native
import { ActivityIndicator, Alert, ScrollView, Text, TouchableOpacity, View } from "react-native";
// Expo
import { MaterialCommunityIcons, MaterialIcons } from "@expo/vector-icons";
import { useLocalSearchParams, useRouter } from "expo-router";
// Constants
import COLORS from "@/constants/colors";
// Custom Hooks
import useAddToBookmarks from "@/hooks/addToBookmarks";
import { useDeletePost } from "@/hooks/deletePost";
import useFetchBookmarkIds from "@/hooks/fetchBookmarkIds";
import usePostDetails from "@/hooks/postDetails";
import { useRemoveFromBookmark } from "@/hooks/removeFromBookmarks";
// Components
import PostDetailsBackBtn from "@/components/postDetails/PostDetailsBackBtn";
import PostDetailsImage from "@/components/postDetails/PostDetailsImage";
import PostDetailsInfo from "@/components/postDetails/PostDetailsInfo";
import PostDetailsTime from "@/components/postDetails/PostDetailsTime";
import PostDetailsUserImage from "@/components/postDetails/PostDetailsUserImage";
import PostDetailsUserName from "@/components/postDetails/PostDetailsUserName";
import BookmarkBtn from "@/components/reuseableComponents/BookmarkBtn";
import OverlayLoadingIndicator from "@/components/reuseableComponents/OverlayLoadingIndicator";
import PostCardVerticalDeleteBtn from "@/components/reuseableComponents/postsFeedComponent/postCardVertical/PostCardVerticalDeleteBtn";
// Context
import { useAuth } from "@/contexts/AuthContext";
// Styles
import usePostCardStyles from "@/styles/postCardStyles";
import usePostDetailsStyles from "@/styles/postDetails.styles";

const PostDetails = () => {
  const { PostId } = useLocalSearchParams();

  // Router
  const router = useRouter();

  const screenName = "Post Details Screen";

  // Styles
  const postDetailsStyles = usePostDetailsStyles();
  const postCardStyles = usePostCardStyles();

  // Fetching post details via tanstack query + firebase onSnapshot listener (real-time updates)
  const { postDetails, isLoadingPostsDetails, isError, error } = usePostDetails(PostId as string);

  // Context
  const { userUid } = useAuth();

  // Check if the post is owned by the current user
  const isTheOwner = postDetails?.postedBy?.userUid === userUid;

  // Tanstack Query hook to delete a post
  const { deletePost, isDeletingPost } = useDeletePost({ post: postDetails, screenName, router });

  // Fetching bookmarkIds via tanstack query + firebase onSnapshot listener (real-time updates)
  const { bookmarkIds, isLoadingBookmarkIds, isBookmarkIdsError, bookmarkIdsError } =
    useFetchBookmarkIds(userUid);

  // Tanstack query hook to add a post to bookmarks
  const { addToBookmarks, isAddingToBookmarks } = useAddToBookmarks({
    postId: postDetails?.id,
    userUid,
  });

  // Tanstack query hook to remove a post from bookmarks
  const { removeFromBookmarks, isRemovingFromBookmarks } = useRemoveFromBookmark({
    postId: postDetails?.id,
  });

  // Checks if post is bookmarked
  const isBookmarked = bookmarkIds?.includes(postDetails?.id);

  // Handles bookmarking a post
  const handleBookmark = () => {
    if (!isBookmarked) addToBookmarks();
    else removeFromBookmarks();
  };

  // Loading indicator
  if (isLoadingPostsDetails) return <OverlayLoadingIndicator />;

  // Error handling
  if (isError) return Alert.alert("Error", (error as Error).message);

  // Post not found
  if (!postDetails) router.back();

  // BookmarkIds loading
  if (isLoadingBookmarkIds) {
    return <OverlayLoadingIndicator />;
  }

  // BookmarkIds error
  if (isBookmarkIdsError) {
    Alert.alert(`${bookmarkIdsError?.message}`);
    return null;
  }

  const handleDeletePost = (): void => {
    Alert.alert("Delete Post", `Are you sure you want to delete "${postDetails?.title}"?`, [
      { text: "Cancel", style: "cancel" },
      { text: "Delete", style: "destructive", onPress: deletePost },
    ]);
  };

  return (
    <View style={{ flex: 1, backgroundColor: COLORS.white }}>
      {/* Post Image */}
      {postDetails.photo && <PostDetailsImage postImage={postDetails?.photo} />}

      {/* Back Button */}
      <PostDetailsBackBtn />

      <ScrollView style={{ flex: 1, paddingHorizontal: 16 }}>
        {/* Post User's Details */}
        <View style={postDetailsStyles.userInfoContainer}>
          {/* Profile Image */}
          <PostDetailsUserImage
            postUserImage={postDetails?.postedBy?.image}
            userUid={postDetails?.postedBy?.userUid}
          />

          {/* User Name and Posted Time */}
          <View>
            {/* User Name */}
            <PostDetailsUserName fullName={postDetails?.postedBy?.fullName} />
            {/* Posted Time */}
            <PostDetailsTime postTime={postDetails?.createdAt} />
          </View>
        </View>

        {/* Post Content Container*/}
        <View style={{ marginTop: 10 }}>
          {/* Post Title*/}
          <Text style={postDetailsStyles.postTitle}>{postDetails?.title}</Text>

          {/* Post Category*/}
          <Text style={postDetailsStyles.postCategory}>{postDetails?.category}</Text>

          {/* Post Info */}
          <PostDetailsInfo postDetails={postDetails} />

          {/* Post Description */}
          <Text style={postDetailsStyles.postDescriptionTitle}>Description</Text>
          <Text style={postDetailsStyles.postDescription}>{postDetails?.description}</Text>
        </View>

        {/* Only show chat button if the post is not owned by the current user */}
        {!isTheOwner ? (
          <>
            {/* Bookmark Button */}
            {isAddingToBookmarks || isRemovingFromBookmarks ? (
              <ActivityIndicator
                size="small"
                color={COLORS.darkBlue}
                style={{ position: "relative", right: 170 }}
              />
            ) : (
              <BookmarkBtn handleBookmark={handleBookmark} isBookmarked={isBookmarked} size={22} />
            )}
            {/* Chat Button */}
            <TouchableOpacity style={postDetailsStyles.chatBtn}>
              <MaterialCommunityIcons name="chat-outline" size={20} color={COLORS.white} />
              <Text style={postDetailsStyles.chatBtnText}>Chat</Text>
            </TouchableOpacity>
          </>
        ) : (
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              marginVertical: 40,
            }}
          >
            <View style={{ flexDirection: "row", gap: 20 }}>
              {/* Bookmark Button */}
              {isAddingToBookmarks || isRemovingFromBookmarks ? (
                <ActivityIndicator size="small" color={COLORS.darkBlue} />
              ) : (
                <BookmarkBtn
                  handleBookmark={handleBookmark}
                  isBookmarked={isBookmarked}
                  size={22}
                />
              )}

              {/* Edit Button */}
              <TouchableOpacity>
                <MaterialIcons name="edit-note" size={22} color={COLORS.darkGrey} />
              </TouchableOpacity>
            </View>

            {/* Delete Post Button */}
            <PostCardVerticalDeleteBtn
              handleDeletePost={handleDeletePost}
              isDeletingPost={isDeletingPost}
            />
          </View>
        )}
      </ScrollView>
    </View>
  );
};

export default PostDetails;
