import PhotoSection from "@/components/bottomSheet/createPostComponent/ImageSection";
import EventCategoryPicker from "@/components/bottomSheet/EventCategoryPicker";
import EventTypePicker from "@/components/bottomSheet/EventTypePicker";
import ProductCategoryPicker from "@/components/bottomSheet/ProductCategoryPicker";
import ServiceCategoryPicker from "@/components/bottomSheet/ServiceCategoryPicker";
import CustomButton from "@/components/reuseableComponents/CustomButton";
import CustomKeyboard from "@/components/reuseableComponents/CustomKeyboard";
import DeviceCamera from "@/components/reuseableComponents/DeviceCamera";
import OverlayLoadingIndicator from "@/components/reuseableComponents/OverlayLoadingIndicator";
import COLORS from "@/constants/colors";
import usePostDetails from "@/hooks/postDetails";
import usePhotoStore from "@/store/photoStore";
import useEditPostStyles from "@/styles/editPost.styles";
import { Ionicons } from "@expo/vector-icons";
import { useLocalSearchParams, useRouter } from "expo-router";
import React, { useEffect, useRef, useState } from "react";
import { Alert, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";

export default function EditPost() {
  const editPostStyles = useEditPostStyles();

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
  const [selectedProductCategory, setSelectedProductCategory] = useState("");
  const [selectedServiceCategory, setSelectedServiceCategory] = useState("");
  const [selectedEventType, setSelectedEventType] = useState("");
  const [selectedEventCategory, setSelectedEventCategory] = useState("");

  // Router
  const router = useRouter();

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
    <>
      {/* Edit Post Header */}
      <View style={editPostStyles.header}>
        <TouchableOpacity style={editPostStyles.headerBtn} onPress={() => router.back()}>
          <Ionicons name="arrow-back-sharp" size={24} color={COLORS.darkBlue} />
        </TouchableOpacity>
        <Text style={editPostStyles.headerTitle}>Edit Post</Text>
      </View>
      <CustomKeyboard>
        <View style={editPostStyles.container}>
          {/* Photo Section */}
          <PhotoSection photo={postImage} openCamera={() => setIsCameraOpen(true)} />

          {/* Form Section */}
          <View style={editPostStyles.formContainer}>
            <Text style={editPostStyles.inputName}>Title:</Text>
            <TextInput
              ref={inputRef}
              defaultValue={postDetails?.title}
              onChangeText={(text) => (title.current = text)}
              style={editPostStyles.input}
              placeholderTextColor={COLORS.darkGrey}
            />

            {postDetails?.postType !== "event" && (
              <>
                <Text style={editPostStyles.inputName}>Price:</Text>
                <TextInput
                  ref={inputRef}
                  defaultValue={postDetails?.price}
                  keyboardType="numeric"
                  onChangeText={(text) => (price.current = text)}
                  style={editPostStyles.input}
                  placeholderTextColor={COLORS.darkGrey}
                />
              </>
            )}

            {postDetails?.postType === "service" && (
              <>
                <Text style={editPostStyles.inputName}>Schedule:</Text>
                <TextInput
                  ref={inputRef}
                  defaultValue={postDetails?.serviceSchedule}
                  onChangeText={(text) => (serviceSchedule.current = text)}
                  style={editPostStyles.input}
                  placeholderTextColor={COLORS.darkGrey}
                />
              </>
            )}

            {postDetails?.postType === "event" && (
              <>
                <Text style={editPostStyles.inputName}>Venue:</Text>
                <TextInput
                  ref={inputRef}
                  defaultValue={postDetails?.eventVenue}
                  onChangeText={(text) => (eventVenue.current = text)}
                  style={editPostStyles.input}
                  placeholderTextColor={COLORS.darkGrey}
                />

                <Text style={editPostStyles.inputName}>Time:</Text>
                <TextInput
                  ref={inputRef}
                  defaultValue={postDetails?.eventTime}
                  onChangeText={(text) => (eventTime.current = text)}
                  style={editPostStyles.input}
                  placeholderTextColor={COLORS.darkGrey}
                />

                <Text style={editPostStyles.inputName}>Date:</Text>
                <TextInput
                  ref={inputRef}
                  defaultValue={postDetails?.eventDate}
                  onChangeText={(text) => (eventDate.current = text)}
                  style={editPostStyles.input}
                  placeholderTextColor={COLORS.darkGrey}
                />
              </>
            )}

            <Text style={editPostStyles.inputName}>Description:</Text>
            <TextInput
              ref={inputRef}
              defaultValue={postDetails?.description}
              onChangeText={(text) => (description.current = text)}
              style={editPostStyles.input}
              placeholderTextColor={COLORS.darkGrey}
              multiline={true}
            />

            {postDetails?.postType === "product" && (
              <>
                <Text style={editPostStyles.inputName}>Product Category:</Text>
                <ProductCategoryPicker
                  selectedCategory={selectedProductCategory}
                  setSelectedCategory={setSelectedProductCategory}
                  defaultValue={postDetails?.category}
                />
              </>
            )}

            {postDetails?.postType === "service" && (
              <>
                <Text style={editPostStyles.inputName}>Service Category:</Text>
                <ServiceCategoryPicker
                  selectedCategory={selectedServiceCategory}
                  setSelectedCategory={setSelectedServiceCategory}
                  defaultValue={postDetails?.category}
                />
              </>
            )}

            {postDetails?.postType === "event" && (
              <>
                <Text style={editPostStyles.inputName}>Event Type:</Text>
                <EventTypePicker
                  selectedEventType={selectedEventType}
                  setSelectedEventType={setSelectedEventType}
                  defaultValue={postDetails?.eventType}
                />

                <Text style={[editPostStyles.inputName, { marginTop: 15 }]}>Event Category:</Text>
                <EventCategoryPicker
                  selectedCategory={selectedEventCategory}
                  setSelectedCategory={setSelectedEventCategory}
                  defaultValue={postDetails?.category}
                />
              </>
            )}
          </View>

          {/* Save Post Button*/}
          <TouchableOpacity>
            <CustomButton text={"Done"} />
          </TouchableOpacity>
        </View>
      </CustomKeyboard>
    </>
  );
}
