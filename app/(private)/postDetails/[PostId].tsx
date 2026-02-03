import PostDetailsImage from "@/components/postDetails/PostDetailsImage";
import OverlayLoadingIndicator from "@/components/reuseableComponents/OverlayLoadingIndicator";
import COLORS from "@/constants/colors";
import blurhash from "@/constants/expoBlurImage";
import usePostDetails from "@/hooks/postDetails";
import usePostDetailsStyles from "@/styles/postDetails.styles";
import formatFullName from "@/utils/formatUserFullname";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { Image } from "expo-image";
import { useLocalSearchParams, useRouter } from "expo-router";
import { Alert, ScrollView, Text, TouchableOpacity, View } from "react-native";

import ReactTimeAgo from "react-time-ago";

function Time({ children }: { children: string }) {
  return <Text>{children}</Text>;
}

const PostDetails = () => {
  const { PostId } = useLocalSearchParams();

  const postDetailsStyles = usePostDetailsStyles();

  const router = useRouter();

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
      <TouchableOpacity onPress={() => router.back()} style={postDetailsStyles.backButton}>
        <Ionicons name="arrow-back-sharp" size={24} color={COLORS.darkBlue} />
      </TouchableOpacity>

      <ScrollView style={{ flex: 1, paddingHorizontal: 16 }}>
        {/* Post User's Details */}
        <View style={postDetailsStyles.userInfoContainer}>
          {/* Profile Image */}
          <Image
            source={{ uri: postDetails?.postedBy?.image }}
            style={{ width: 50, height: 50, borderRadius: 25 }}
            placeholder={{ blurhash }}
            transition={300}
            contentFit="cover"
          />

          {/* User Name and Posted Time */}
          <View>
            {/* User Name */}
            <Text style={postDetailsStyles.userNameText}>
              {formatFullName(postDetails?.postedBy?.fullName)}
            </Text>

            {/* Posted Time */}
            <Text style={postDetailsStyles.postTimeText}>
              Posted{" • "}
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

        {/* Post Content Container*/}
        <View style={{ marginTop: 10 }}>
          <Text style={postDetailsStyles.postTitle}>{postDetails?.title}</Text>
          <Text style={postDetailsStyles.postCategory}>{`${postDetails?.category}`}</Text>

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
