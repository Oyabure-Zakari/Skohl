import COLORS from "@/constants/colors";
import blurhash from "@/constants/expoBlurImage";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Image } from "expo-image";
import React from "react";
import { Text, TouchableOpacity, View } from "react-native";

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
  onPress?: (post: Post) => void;
  onChatPress?: (post: Post) => void;
  onBookmarkPress?: (post: Post) => void;
}

export default function PostCard({ post, onPress, onChatPress, onBookmarkPress }: PostCardProps) {
  const getFirstName = post.postedBy.fullName.split(" ")[1];

  return (
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
        flexGrow: 1,
      }}
    >
      {/* Posted by - smaller avatar */}
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          marginVertical: 5,
          paddingHorizontal: 10,
        }}
      >
        {/* Avatar */}
        <Image
          source={{ uri: post.postedBy.image }}
          style={{ width: 28, height: 28, borderRadius: 14, marginRight: 8 }}
          placeholder={{ blurhash }}
        />
        <Text numberOfLines={1} style={{ fontSize: 13, color: "#333", flex: 1 }}>
          {getFirstName}
        </Text>
      </View>
      {/* Smaller photo for two columns */}
      {post.photo && (
        <Image
          source={{ uri: post.photo }}
          style={{ width: "100%", height: 120, resizeMode: "cover" }} // ← reduced height
          placeholder={{ blurhash }}
          transition={300}
        />
      )}

      {/* Content - tighter padding */}
      <View style={{ padding: 10 }}>
        <Text
          numberOfLines={1}
          style={{
            fontSize: 12,
            color: COLORS.darkGrey,
            marginTop: 2,
            fontFamily: "Segoe_UI_Bold",
          }}
        >
          {post.category}
        </Text>

        <Text
          numberOfLines={2}
          style={{ width: "90%", fontSize: 15, fontFamily: "Segoe_UI_Bold_Italic" }}
        >
          {post.title}
        </Text>

        {/* Price / Event info - smaller font */}
        {(post.postType === "service" || post.postType === "product") && post.price && (
          <Text style={{ fontSize: 13, fontFamily: "Segoe_UI_Bold_Italic", color: COLORS.green }}>
            {post.price}
          </Text>
        )}
      </View>

      {/* Footer - compact */}
      <View
        style={{
          flexDirection: "row",
          padding: 10,
          alignItems: "center",
        }}
      >
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

        <TouchableOpacity style={{ marginLeft: "auto" }}>
          <MaterialCommunityIcons name="bookmark-outline" size={22} color={COLORS.darkGrey} />
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );
}
