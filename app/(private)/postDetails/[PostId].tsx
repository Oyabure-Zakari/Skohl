import OverlayLoadingIndicator from "@/components/reuseableComponents/OverlayLoadingIndicator";
import COLORS from "@/constants/colors";
import blurhash from "@/constants/expoBlurImage";
import postsCollectionRef from "@/firebase/collectionRef/postsCollectionRef";
import { Post } from "@/types/PostTypes";
import formatFullName from "@/utils/formatUserFullname";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { Image } from "expo-image";
import { useLocalSearchParams, useRouter } from "expo-router";
import { getDocs, query, where } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { ScrollView, Text, TouchableOpacity, useWindowDimensions, View } from "react-native";
import ReactTimeAgo from "react-time-ago";

function Time({ children }: { children: string }) {
  return <Text>{children}</Text>;
}

const PostDetails = () => {
  const { PostId } = useLocalSearchParams();
  const [postDetails, setPostDetails] = useState<Post | null>(null);
  const [isLaoding, setIsLoading] = useState<boolean>(true);

  const { fontScale, width } = useWindowDimensions();

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
      <TouchableOpacity
        onPress={() => router.back()}
        style={{
          backgroundColor: COLORS.white,
          borderRadius: 40,
          padding: 2,
          margin: 16,
          position: "absolute",
          top: 0,
          left: 0,
        }}
      >
        <Ionicons name="arrow-back-sharp" size={24} color={COLORS.darkBlue} />
      </TouchableOpacity>
      <ScrollView style={{ flex: 1, paddingHorizontal: 16 }}>
        <View
          style={{
            marginTop: 20,
            flexDirection: "row",
            alignItems: "center",
            gap: 12,
          }}
        >
          <Image
            source={{ uri: postDetails?.postedBy?.image }}
            style={{ width: 50, height: 50, borderRadius: 25 }}
            placeholder={{ blurhash }}
            transition={300}
            contentFit="cover"
          />
          <View>
            <Text
              style={{
                fontSize: fontScale * 14,
                fontFamily: "Segoe_UI_Bold",
                color: COLORS.darkBlue,
              }}
            >
              {formatFullName(postDetails?.postedBy.fullName)}
            </Text>
            <Text
              style={{
                fontSize: fontScale * 12,
                color: COLORS.darkGrey,
                fontFamily: "Segoe_UI_Bold",
              }}
            >
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

        <View style={{ marginTop: 10 }}>
          <Text
            style={{
              width: width * 0.8,
              fontSize: fontScale * 20,
              fontFamily: "Segoe_UI_Bold_Italic",
              color: COLORS.darkBlue,
            }}
          >
            {postDetails?.title}
          </Text>
          <Text
            style={{
              fontSize: fontScale * 14,
              color: COLORS.darkGrey,
              fontFamily: "Segoe_UI_Bold",
            }}
          >
            {`${postDetails?.category}`}
          </Text>
          <View style={{ marginTop: 10 }}>
            {postDetails?.postType === "product" && (
              <>
                <Text style={{ fontSize: fontScale * 14, fontFamily: "Segoe_UI_Bold" }}>
                  💵 Price:{postDetails?.price}
                </Text>
              </>
            )}
            {postDetails?.postType === "service" && (
              <>
                <Text style={{ fontSize: fontScale * 14, fontFamily: "Segoe_UI_Regular" }}>
                  💵 Price: {postDetails?.price}
                </Text>
                <Text style={{ fontSize: fontScale * 14, fontFamily: "Segoe_UI_Bold" }}>
                  🗓️ Schedule: {postDetails?.serviceSchedule}
                </Text>
              </>
            )}

            {postDetails?.postType === "event" && (
              <>
                <Text style={{ fontSize: fontScale * 14, fontFamily: "Segoe_UI_Bold" }}>
                  🗓️ Date: {postDetails?.eventDate}
                </Text>
                <Text style={{ fontSize: fontScale * 14, fontFamily: "Segoe_UI_Bold" }}>
                  🕒 Time: {postDetails?.eventTime}
                </Text>
                <Text style={{ fontSize: fontScale * 14, fontFamily: "Segoe_UI_Bold" }}>
                  📍 Venue: {postDetails?.eventVenue}
                </Text>
                <Text
                  style={{
                    fontSize: fontScale * 14,
                    fontFamily: "Segoe_UI_Bold_Italic",
                    color: COLORS.darkGrey,
                  }}
                >
                  {" • "}
                  {postDetails?.eventType}
                </Text>
              </>
            )}
          </View>
          <Text
            style={{
              width: width * 0.3,
              fontSize: fontScale * 16,
              fontFamily: "Segoe_UI_Bold_Italic",
              color: COLORS.purple,
              marginTop: 20,
              backgroundColor: COLORS.lightGrey,
              paddingHorizontal: 8,
              borderRadius: 6,
              textAlign: "center",
              height: 30,
            }}
          >
            Description
          </Text>
          <Text
            style={{
              fontSize: fontScale * 14,
              fontFamily: "Segoe_UI_Bold",
              color: COLORS.darkBlue,
              marginTop: 8,
            }}
          >
            {postDetails?.description}
          </Text>
        </View>

        <TouchableOpacity
          style={{
            width: width * 0.92,
            paddingVertical: 8,
            backgroundColor: COLORS.darkBlue,
            borderRadius: 10,
            alignSelf: "center",
            elevation: 6,
            marginVertical: 40,
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
            gap: 8,
          }}
        >
          <MaterialCommunityIcons name="chat-outline" size={20} color={COLORS.white} />
          <Text
            style={{
              color: COLORS.lightGrey,
              fontFamily: "Segoe_UI_Bold",
              fontSize: fontScale * 18,
              textAlign: "center",
            }}
          >
            Chat
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};

export default PostDetails;
