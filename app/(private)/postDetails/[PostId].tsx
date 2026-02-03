import PostDetailsBackBtn from "@/components/postDetails/PostDetailsBackBtn";
import PostDetailsImage from "@/components/postDetails/PostDetailsImage";
import PostDetailsTime from "@/components/postDetails/PostDetailsTime";
import PostDetailsUserImage from "@/components/postDetails/PostDetailsUserImage";
import PostDetailsUserName from "@/components/postDetails/PostDetailsUserName";
import OverlayLoadingIndicator from "@/components/reuseableComponents/OverlayLoadingIndicator";
import COLORS from "@/constants/colors";
import usePostDetails from "@/hooks/postDetails";
import usePostDetailsStyles from "@/styles/postDetails.styles";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useLocalSearchParams } from "expo-router";
import { Alert, ScrollView, Text, TouchableOpacity, View } from "react-native";

const PostDetails = () => {
  const { PostId } = useLocalSearchParams();

  const postDetailsStyles = usePostDetailsStyles();

  // Fetching post details via tanstack query + firebase onSnapshot listener (real-time updates)
  const { postDetails, isLoadingPostsDetails, isError, error } = usePostDetails(PostId as string);

  // Loading indicator
  if (isLoadingPostsDetails) return <OverlayLoadingIndicator />;

  // Error handling
  if (isError) return Alert.alert("Error", (error as Error).message);

  // Post not found
  if (!postDetails) return Alert.alert("Error", "Post not found");

  // Safe timestamp conversion with fallback
  const postDate = postDetails?.createdAt?.seconds
    ? new Date(
        postDetails.createdAt.seconds * 1000 + (postDetails.createdAt.nanoseconds || 0) / 1000000,
      )
    : new Date(); // fallback to now

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
            <PostDetailsTime postDate={postDate} />
          </View>
        </View>

        {/* Post Content Container*/}
        <View style={{ marginTop: 10 }}>
          {/* Post Title*/}
          <Text style={postDetailsStyles.postTitle}>{postDetails?.title}</Text>
          {/* Post Category*/}
          <Text style={postDetailsStyles.postCategory}>{postDetails?.category}</Text>

          {/* Post Info */}
          <View style={{ marginTop: 10 }}>
            {postDetails?.postType === "product" && (
              <>
                <Text style={postDetailsStyles.infoText}>💵 Price:{postDetails?.price}</Text>
              </>
            )}
            {postDetails?.postType === "service" && (
              <>
                <Text style={postDetailsStyles.infoText}>💵 Price: {postDetails?.price}</Text>
                <Text style={postDetailsStyles.infoText}>
                  🗓️ Schedule: {postDetails?.serviceSchedule}
                </Text>
              </>
            )}
            {postDetails?.postType === "event" && (
              <>
                <Text style={postDetailsStyles.infoText}>🗓️ Date: {postDetails?.eventDate}</Text>
                <Text style={postDetailsStyles.infoText}>🕒 Time: {postDetails?.eventTime}</Text>
                <Text style={postDetailsStyles.infoText}>📍 Venue: {postDetails?.eventVenue}</Text>
                <Text style={postDetailsStyles.infoText2}>
                  {" • "}
                  {postDetails?.eventType}
                </Text>
              </>
            )}
          </View>

          {/* Post Description */}
          <Text style={postDetailsStyles.postDescriptionTitle}>Description</Text>
          <Text style={postDetailsStyles.postDescription}>{postDetails?.description}</Text>
        </View>

        {/* Chat Button */}
        <TouchableOpacity style={postDetailsStyles.chatBtn}>
          <MaterialCommunityIcons name="chat-outline" size={20} color={COLORS.white} />
          <Text style={postDetailsStyles.chatBtnText}>Chat</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};

export default PostDetails;
