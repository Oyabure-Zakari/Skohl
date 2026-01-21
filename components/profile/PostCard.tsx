import COLORS from "@/constants/colors";
import blurhash from "@/constants/expoBlurImage";
import { captilizeWord } from "@/utils/captilizeWord";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Image } from "expo-image";
import React from "react";
import { Text, TouchableOpacity, View } from "react-native";
import ReactTimeAgo from "react-time-ago";

type PostType = "event" | "service" | "product";

interface BasePost {
  id: string;
  title: string;
  category: string;
  description: string;
  postType: PostType;
  createdAt: { seconds: number; nanoseconds: number; type: string };
  photo?: string;
  postedBy: {
    fullName: string;
    image?: string;
    userUid: string;
  };
}

interface EventPost extends BasePost {
  postType: "event";
  eventDate: string;
  eventTime?: string;
  eventType?: string;
  eventVenue?: string;
}

interface ServicePost extends BasePost {
  postType: "service";
  price?: string;
  serviceSchedule?: string;
}

interface ProductPost extends BasePost {
  postType: "product";
  price?: string;
}

type Post = EventPost | ServicePost | ProductPost;

interface PostCardProps {
  post: Post;
}

// Custom Time component for React Native
function Time({ children }: { children: string }) {
  return <Text>{children}</Text>;
}

const PostCard: React.FC<PostCardProps> = ({ post }) => {
  const getFirstName = captilizeWord(post.postedBy.fullName.split(" ")[1]);

  // Convert Firestore timestamp to Date object
  const postDate = new Date(post.createdAt.seconds * 1000 + post.createdAt.nanoseconds / 1000000);

  return (
    // Card container
    <TouchableOpacity
      activeOpacity={0.9}
      style={{
        backgroundColor: COLORS.white,
        borderRadius: 12,
        marginVertical: 8,
        overflow: "hidden",
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 6,
        elevation: 3,
      }}
    >
      {/* User info */}
      <View style={{ flexDirection: "row", alignItems: "center", padding: 5 }}>
        {/* Avatar */}
        <Image
          source={{ uri: post.postedBy.image }}
          style={{ width: 28, height: 28, borderRadius: 14, marginRight: 8 }}
          placeholder={{ blurhash }}
        />

        {/* Name and date */}
        <View
          style={{
            flex: 1,
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            //backgroundColor: "green",
          }}
        >
          {/* Name */}
          <Text
            numberOfLines={1}
            style={{
              fontSize: 12,
              color: COLORS.darkBlue,
              fontFamily: "Segoe_UI_Bold",
              //backgroundColor: "red",
              width: "50%",
            }}
          >
            {getFirstName}
          </Text>

          {/* Date with ReactTimeAgo */}
          <Text
            numberOfLines={1}
            style={{
              fontSize: 10,
              fontFamily: "Segoe_UI_Bold",
              color: COLORS.darkGrey,
              //backgroundColor: "blue",
              //width: "50%",
            }}
          >
            <ReactTimeAgo
              date={postDate}
              locale="en-US"
              component={Time}
              timeStyle="round"
              tick={true} // Auto-update enabled (this is the default)
            />
          </Text>
        </View>
      </View>

      {/* Post image and display description if no image */}
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

      {/* Post details */}
      <View style={{ paddingHorizontal: 10 }}>
        {/* Category */}
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

        {/* Title */}
        <Text
          numberOfLines={2}
          style={{ width: "90%", fontSize: 15, fontFamily: "Segoe_UI_Bold_Italic" }}
        >
          {post.title}
        </Text>

        {/* Price */}
        {(post.postType === "service" || post.postType === "product") && post.price && (
          <Text style={{ fontSize: 13, fontFamily: "Segoe_UI_Bold_Italic", color: COLORS.green }}>
            {post.price}
          </Text>
        )}
      </View>

      {/* Footer */}
      <View
        style={{
          flexDirection: "row",
          padding: 10,
          alignItems: "center",
        }}
      >
        {/* Chat Button */}
        <TouchableOpacity
          style={{
            flexDirection: "row",
            alignItems: "center",
            backgroundColor: COLORS.darkBlue,
            paddingVertical: 6,
            paddingHorizontal: 12,
            borderRadius: 5,
          }}
        >
          <MaterialCommunityIcons name="chat-outline" size={18} color="white" />
          <Text style={{ color: "white", fontSize: 13, marginLeft: 6, fontWeight: "600" }}>
            Chat
          </Text>
        </TouchableOpacity>

        {/* Bookmark Button */}
        <TouchableOpacity style={{ marginLeft: "auto" }}>
          <MaterialCommunityIcons name="bookmark-outline" size={22} color={COLORS.darkGrey} />
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );
};

export default PostCard;
