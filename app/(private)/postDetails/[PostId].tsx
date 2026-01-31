import { useLocalSearchParams } from "expo-router";
import React from "react";
import { Text, View } from "react-native";

const PostDetails = () => {
  const { PostId } = useLocalSearchParams();

  return (
    <View>
      <Text>{PostId}</Text>
    </View>
  );
};

export default PostDetails;
