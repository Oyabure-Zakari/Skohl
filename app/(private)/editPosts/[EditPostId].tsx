import PhotoSection from "@/components/bottomSheet/createPostComponent/ImageSection";
import CustomButton from "@/components/reuseableComponents/CustomButton";
import DeviceCamera from "@/components/reuseableComponents/DeviceCamera";
import OverlayLoadingIndicator from "@/components/reuseableComponents/OverlayLoadingIndicator";
import COLORS from "@/constants/colors";
import usePostDetails from "@/hooks/postDetails";
import usePhotoStore from "@/store/photoStore";
import { useLocalSearchParams } from "expo-router";
import React, { useEffect, useRef, useState } from "react";
import { Alert, ScrollView, StyleSheet, TextInput, TouchableOpacity } from "react-native";

export default function EditPost() {
  const { EditPostId } = useLocalSearchParams();

  // Ref
  const title = useRef("");
  const price = useRef("");
  const serviceSchedule = useRef("");
  const eventVenue = useRef("");
  const eventTime = useRef("");
  const eventDate = useRef("");
  const description = useRef("");
  const inputRef = useRef<TextInput>(null);

  // States
  const [isCameraOpen, setIsCameraOpen] = useState(false);

  // Fetching post details via tanstack query + firebase onSnapshot listener (real-time updates)
  const { postDetails, isLoadingPostsDetails, isError, error } = usePostDetails(
    EditPostId as string,
  );

  // Zustand
  const photo = usePhotoStore((state) => state.image);
  const clearPhoto = usePhotoStore((state) => state.clearImage);

  const postImage = photo ? photo : postDetails?.photo;

  // UseEffect to clear image
  useEffect(() => {
    clearPhoto();
  }, []);

  if (isLoadingPostsDetails) {
    return <OverlayLoadingIndicator />;
  }

  if (isError) {
    Alert.alert(`Error: ${error?.message}`);
    return;
  }

  if (isCameraOpen) {
    return <DeviceCamera setIsCameraOpen={setIsCameraOpen} />;
  }

  return (
    <ScrollView contentContainerStyle={editPostStyles.container}>
      {/* Photo Section */}
      <PhotoSection photo={postImage} openCamera={() => setIsCameraOpen(true)} />

      {/* Form Section */}
      <TextInput
        ref={inputRef}
        defaultValue={postDetails?.title}
        onChangeText={(text) => (title.current = text)}
        style={editPostStyles.input}
        placeholderTextColor={COLORS.darkGrey}
      />

      {postDetails?.postType !== "event" && (
        <TextInput
          ref={inputRef}
          defaultValue={postDetails?.price}
          keyboardType="numeric"
          onChangeText={(text) => (price.current = text)}
          style={editPostStyles.input}
          placeholderTextColor={COLORS.darkGrey}
        />
      )}

      {postDetails?.postType === "service" && (
        <TextInput
          ref={inputRef}
          defaultValue={postDetails?.serviceSchedule}
          onChangeText={(text) => (serviceSchedule.current = text)}
          style={editPostStyles.input}
          placeholderTextColor={COLORS.darkGrey}
        />
      )}

      {postDetails?.postType === "event" && (
        <>
          <TextInput
            ref={inputRef}
            defaultValue={postDetails?.eventVenue}
            onChangeText={(text) => (eventVenue.current = text)}
            style={editPostStyles.input}
            placeholderTextColor={COLORS.darkGrey}
          />

          <TextInput
            ref={inputRef}
            defaultValue={postDetails?.eventTime}
            onChangeText={(text) => (eventTime.current = text)}
            style={editPostStyles.input}
            placeholderTextColor={COLORS.darkGrey}
          />

          <TextInput
            ref={inputRef}
            defaultValue={postDetails?.eventDate}
            onChangeText={(text) => (eventDate.current = text)}
            style={editPostStyles.input}
            placeholderTextColor={COLORS.darkGrey}
          />
        </>
      )}

      <TextInput
        ref={inputRef}
        defaultValue={postDetails?.description}
        onChangeText={(text) => (description.current = text)}
        style={editPostStyles.input}
        placeholderTextColor={COLORS.darkGrey}
        multiline={true}
      />

      {/* Save Post Button*/}
      <TouchableOpacity>
        <CustomButton text={"Done"} />
      </TouchableOpacity>
    </ScrollView>
  );
}

const editPostStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
    alignItems: "center",
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

  photoText: {
    color: COLORS.darkGrey,
    fontFamily: "Segoe_UI_Bold",
  },

  postPhoto: {
    width: 150,
    height: 150,
    borderRadius: 10,
    marginTop: 20,
  },

  input: {
    width: "90%",
    backgroundColor: COLORS.lightGrey,
    borderRadius: 10,
    paddingHorizontal: 16,
    paddingVertical: 12,
    color: COLORS.darkGrey,
    fontFamily: "Segoe_UI_Bold",
    minHeight: 48,
    marginBottom: 20,
  },
});
