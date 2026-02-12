// React Native
import { Alert, ScrollView, Text, TouchableOpacity, View } from "react-native";
// Expo
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useLocalSearchParams } from "expo-router";
// Constants
import COLORS from "@/constants/colors";
// Custom Hooks
import usePostDetails from "@/hooks/postDetails";
// Components
import PostDetailsBackBtn from "@/components/postDetails/PostDetailsBackBtn";
import PostDetailsImage from "@/components/postDetails/PostDetailsImage";
import PostDetailsInfo from "@/components/postDetails/PostDetailsInfo";
import PostDetailsTime from "@/components/postDetails/PostDetailsTime";
import PostDetailsUserImage from "@/components/postDetails/PostDetailsUserImage";
import PostDetailsUserName from "@/components/postDetails/PostDetailsUserName";
import OverlayLoadingIndicator from "@/components/reuseableComponents/OverlayLoadingIndicator";
// Styles
import { useAuth } from "@/contexts/AuthContext";
import usePostDetailsStyles from "@/styles/postDetails.styles";

const PostDetails = () => {
  const { PostId } = useLocalSearchParams();

  // Styles
  const postDetailsStyles = usePostDetailsStyles();

  // Fetching post details via tanstack query + firebase onSnapshot listener (real-time updates)
  const { postDetails, isLoadingPostsDetails, isError, error } = usePostDetails(PostId as string);

  // Context
  const { userUid } = useAuth();

  // Check if the post is owned by the current user
  const isTheOwner = postDetails?.postedBy?.userUid === userUid;

  // Loading indicator
  if (isLoadingPostsDetails) return <OverlayLoadingIndicator />;

  // Error handling
  if (isError) return Alert.alert("Error", (error as Error).message);

  // Post not found
  if (!postDetails) return Alert.alert("Error", "Post not found");

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
          <PostDetailsUserImage postUserImage={postDetails?.postedBy?.image} />

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
        {!isTheOwner && (
          // Chat Button
          <TouchableOpacity style={postDetailsStyles.chatBtn}>
            <MaterialCommunityIcons name="chat-outline" size={20} color={COLORS.white} />
            <Text style={postDetailsStyles.chatBtnText}>Chat</Text>
          </TouchableOpacity>
        )}
      </ScrollView>
    </View>
  );
};

export default PostDetails;
