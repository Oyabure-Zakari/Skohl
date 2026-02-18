import usePostDetails from "@/hooks/postDetails";
import { useLocalSearchParams } from "expo-router";
import React from "react";
import { Text, View } from "react-native";

export default function EditPost() {
  const { EditPostId } = useLocalSearchParams();

  // Fetching post details via tanstack query + firebase onSnapshot listener (real-time updates)
  const { postDetails, isLoadingPostsDetails, isError, error } = usePostDetails(
    EditPostId as string,
  );

  return (
    <View>
      <Text>{postDetails?.title}</Text>
    </View>
  );
}
