import OverlayLoadingIndicator from "@/components/reuseableComponents/OverlayLoadingIndicator";
import COLORS from "@/constants/colors";
import blurhash from "@/constants/expoBlurImage";
import postsCollectionRef from "@/firebase/collectionRef/postsCollectionRef";
import usePostDetailsStyles from "@/styles/postDetails.styles";
import { Post } from "@/types/PostTypes";
import formatFullName from "@/utils/formatUserFullname";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { Image } from "expo-image";
import { useLocalSearchParams, useRouter } from "expo-router";
import { getDocs, query, where } from "firebase/firestore";
import { useEffect, useState } from "react";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";

import ReactTimeAgo from "react-time-ago";

function Time({ children }: { children: string }) {
  return <Text>{children}</Text>;
}

const PostDetails = () => {
  const { PostId } = useLocalSearchParams();
  const [postDetails, setPostDetails] = useState<Post | null>(null);
  const [isLaoding, setIsLoading] = useState<boolean>(true);

  const postDetailsStyles = usePostDetailsStyles();

  const router = useRouter();

  const postInfo = async () => {
    try {
      const q = query(postsCollectionRef, where("id", "==", PostId));
      const snapshot = await getDocs(q);

      let fetchedPost: Post | null = null;
      snapshot.forEach((doc) => {
        fetchedPost = doc.data() as Post;
      });

      setPostDetails(fetchedPost);
    } catch (error) {
      console.log("Error fetching post details: ", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    postInfo();
  }, []);

  if (isLaoding) {
    return <OverlayLoadingIndicator />;
  }

  if (!postDetails) {
    return <Text>Post not found</Text>;
  }

  // Safe timestamp conversion with fallback
  const postDate = postDetails?.createdAt?.seconds
    ? new Date(
        postDetails.createdAt.seconds * 1000 + (postDetails.createdAt.nanoseconds || 0) / 1000000,
      )
    : new Date(); // fallback to now

  return (
    <View style={{ flex: 1, backgroundColor: COLORS.white }}>
      {/* Post Image */}
      {postDetails.photo && (
        <Image
          source={{ uri: postDetails?.photo }}
          style={{ width: "100%", height: 300, position: "relative", top: 0 }}
          placeholder={{ blurhash }}
          transition={300}
          contentFit="cover"
        />
      )}

      {/* Back Button */}
      <TouchableOpacity onPress={() => router.back()} style={postDetailsStyles.backButton}>
        <Ionicons name="arrow-back-sharp" size={24} color={COLORS.darkBlue} />
      </TouchableOpacity>

      <ScrollView style={{ flex: 1, paddingHorizontal: 16 }}>
        {/* Post User's Details */}
        <View style={postDetailsStyles.userInfoContainer}>
          <>
            {/* Profile Image */}
            <Image
              source={{ uri: postDetails?.postedBy?.image }}
              style={{ width: 50, height: 50, borderRadius: 25 }}
              placeholder={{ blurhash }}
              transition={300}
              contentFit="cover"
            />

            {/* User Name and Posted Time */}
            <Text style={postDetailsStyles.userNameText}>
              {formatFullName(postDetails?.postedBy.fullName)}
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
          </>
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
