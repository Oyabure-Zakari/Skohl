import { BottomSheetScrollView } from "@gorhom/bottom-sheet";
import React, { useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

import COLORS from "@/constants/colors";
import blurhash from "@/constants/expoBlurImage";
import { Entypo, MaterialCommunityIcons } from "@expo/vector-icons";
import { Image } from "expo-image";

import useExpoImagePicker from "@/hooks/expoImagePicker";
import PostEventForm from "./createPostComponent/PostEventForm";
import PostProductForm from "./createPostComponent/PostProductForm";
import PostServiceForm from "./createPostComponent/PostServicefForm";
const CreatePostBottomSheet: React.FC = () => {
  // State
  const [postType, setPostType] = useState<"Post a Product" | "Post a Service" | "Post an Event">(
    "Post a Product"
  );

  // Custom Hooks
  const { image: photo, pickImage } = useExpoImagePicker();

  return (
    <BottomSheetScrollView
      contentContainerStyle={styles.content}
      keyboardShouldPersistTaps="handled"
      showsVerticalScrollIndicator={true}
      bounces={true}
      alwaysBounceVertical={true}
      nestedScrollEnabled={true}
      decelerationRate="fast"
      overScrollMode="always"
    >
      <Text style={styles.title}>Create Post</Text>
      <View style={styles.divider} />
      <Text style={styles.subtitle}>What would you like to post?</Text>

      <View style={styles.postTypeContainer}>
        {(["Post a Product", "Post a Service", "Post an Event"] as const).map((type) => (
          <TouchableOpacity
            key={type}
            style={[postType === type ? styles.activeButton : styles.inactiveButton]}
            onPress={() => setPostType(type)}
          >
            <Text style={[postType === type ? styles.activeText : styles.inactiveText]}>
              {type}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Photo Section */}
      {!photo ? (
        <View style={styles.photoPlaceholder}>
          <Text style={styles.photoText}>Photo</Text>
        </View>
      ) : (
        <Image
          source={{ uri: photo }}
          style={styles.postPhoto}
          placeholder={{ blurhash }}
          contentFit="contain"
          transition={1000}
        />
      )}

      <View style={styles.photoOptions}>
        <TouchableOpacity style={styles.photoOption}>
          <MaterialCommunityIcons name="camera" size={25} color={COLORS.darkGrey} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.photoOption} onPress={pickImage}>
          <Entypo name="images" size={25} color={COLORS.darkGrey} />
        </TouchableOpacity>
      </View>

      {postType === "Post a Product" && <PostProductForm photo={photo} />}
      {postType === "Post a Service" && <PostServiceForm photo={photo} />}
      {postType === "Post an Event" && <PostEventForm photo={photo} />}
    </BottomSheetScrollView>
  );
};

const styles = StyleSheet.create({
  content: { alignItems: "center", paddingBottom: 200 },
  title: { color: COLORS.darkGrey, fontFamily: "Segoe_UI_Bold" },
  divider: { width: "100%", height: 2, backgroundColor: COLORS.lightGrey, marginTop: 20 },
  subtitle: { color: COLORS.darkBlue, fontFamily: "Segoe_UI_Bold", fontSize: 16, marginTop: 10 },
  postTypeContainer: { flexDirection: "row", gap: 10, marginTop: 10 },
  activeButton: { backgroundColor: COLORS.purple, borderRadius: 5, padding: 5 },
  activeText: {
    color: COLORS.white,
    fontFamily: "Segoe_UI_Bold",
    fontSize: 12,
    paddingHorizontal: 5,
  },
  inactiveButton: { borderColor: COLORS.purple, borderWidth: 1, borderRadius: 5, padding: 5 },
  inactiveText: {
    color: COLORS.purple,
    fontFamily: "Segoe_UI_Bold",
    fontSize: 12,
    paddingHorizontal: 5,
  },
  photoPlaceholder: {
    marginTop: 20,
    width: "45%",
    height: 150,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: COLORS.lightGrey,
  },
  photoText: { color: COLORS.darkGrey, fontFamily: "Segoe_UI_Bold" },
  postPhoto: { width: 150, height: 150, borderRadius: 10, marginTop: 20 },
  photoOptions: { flexDirection: "row", gap: 12, marginTop: 10 },
  photoOption: {
    backgroundColor: COLORS.lightGrey,
    width: 40,
    height: 40,
    borderRadius: 5,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default CreatePostBottomSheet;
