// React
import React, { useEffect, useRef, useState } from "react";
// React Native
import { Alert, Text, TextInput, View } from "react-native";
// Expo
import { useLocalSearchParams } from "expo-router";
// Custom Hook
import usePostDetails from "@/hooks/postDetails";
import useUpdatePost from "@/hooks/updatePost";
import useInitializePostEditForm from "@/hooks/useInitializePostEditForm";
// Components
import PhotoSection from "@/components/bottomSheet/createPostComponent/ImageSection";
import EventCategoryPicker from "@/components/bottomSheet/EventCategoryPicker";
import EventTypePicker from "@/components/bottomSheet/EventTypePicker";
import ProductCategoryPicker from "@/components/bottomSheet/ProductCategoryPicker";
import ServiceCategoryPicker from "@/components/bottomSheet/ServiceCategoryPicker";
import EditPostHeader from "@/components/editPostComponents/EditPostHeader";
import InputFieldAndTitle from "@/components/editPostComponents/InputFieldAndTitle";
import UpdatePostBtn from "@/components/editPostComponents/UpdatePostBtn";
import CustomKeyboard from "@/components/reuseableComponents/CustomKeyboard";
import DeviceCamera from "@/components/reuseableComponents/DeviceCamera";
import OverlayLoadingIndicator from "@/components/reuseableComponents/OverlayLoadingIndicator";
// Styles
import useEditPostStyles from "@/styles/editPost.styles";
// Zustand
import usePhotoStore from "@/store/photoStore";

export default function EditPost() {
  const { EditPostId } = useLocalSearchParams();

  // Styles
  const editPostStyles = useEditPostStyles();

  // Fetching post details via tanstack query + firebase onSnapshot listener (real-time updates)
  const {
    postDetails,
    isLoadingPostsDetails,
    isError: isPostsDetailsError,
    error: postsDetailsError,
  } = usePostDetails(EditPostId as string);

  // Ref
  const inputRef = useRef<TextInput>(null);
  const titleRef = useRef("");
  const priceRef = useRef("");
  const serviceScheduleRef = useRef("");
  const eventVenueRef = useRef("");
  const eventTimeRef = useRef("");
  const eventDateRef = useRef("");
  const descriptionRef = useRef("");

  // States
  const [isCameraOpen, setIsCameraOpen] = useState(false);
  const [selectedProductCategory, setSelectedProductCategory] = useState("");
  const [selectedServiceCategory, setSelectedServiceCategory] = useState("");
  const [selectedEventType, setSelectedEventType] = useState("");
  const [selectedEventCategory, setSelectedEventCategory] = useState("");

  // Zustand
  const photo = usePhotoStore((state) => state.image);
  const clearPhoto = usePhotoStore((state) => state.clearImage);

  const postImage = photo ? photo : postDetails?.photo;

  // UseEffect to clear image
  useEffect(() => {
    clearPhoto();
  }, []);

  // Pre-fill refs and state with the current post values so we can detect what the user actually changed before saving.
  useInitializePostEditForm({
    postDetails,
    titleRef,
    descriptionRef,
    priceRef,
    serviceScheduleRef,
    eventVenueRef,
    eventTimeRef,
    eventDateRef,
    setSelectedEventType,
    setSelectedProductCategory,
    setSelectedServiceCategory,
    setSelectedEventCategory,
  });

  // Custom hook using tanstack query to handle updating post
  const { handleUpdatePost, isUpdatingPost, isUpdatePostError, updatePostError } = useUpdatePost({
    EditPostId,
    postImage,
    postDetails,
    titleRef,
    descriptionRef,
    priceRef,
    serviceScheduleRef,
    eventVenueRef,
    eventTimeRef,
    eventDateRef,
    selectedEventType,
    selectedProductCategory,
    selectedServiceCategory,
    selectedEventCategory,
  });

  if (isLoadingPostsDetails) {
    return <OverlayLoadingIndicator />;
  }

  if (isPostsDetailsError || isUpdatePostError) {
    Alert.alert(`Error: ${postsDetailsError?.message || updatePostError?.message}`);
    return;
  }

  if (isCameraOpen) {
    return <DeviceCamera setIsCameraOpen={setIsCameraOpen} />;
  }

  return (
    <>
      {/* Edit Post Header */}
      <EditPostHeader />

      {/* Post Details */}
      <CustomKeyboard>
        <View style={editPostStyles.container}>
          {/* Photo Section */}
          <PhotoSection photo={postImage} openCamera={() => setIsCameraOpen(true)} />

          {/* Form Section */}
          <View style={editPostStyles.formContainer}>
            <InputFieldAndTitle
              title={"Title:"}
              ref={inputRef}
              defaultValue={postDetails?.title}
              onChangeText={(text: string) => (titleRef.current = text).trim()}
            />

            {postDetails?.postType !== "event" && (
              <InputFieldAndTitle
                title={"Price:"}
                ref={inputRef}
                defaultValue={postDetails?.price?.slice(1)}
                onChangeText={(text) => (priceRef.current = text).trim()}
                keyboardType={"numeric"}
              />
            )}

            {postDetails?.postType === "service" && (
              <InputFieldAndTitle
                title={"Schedule:"}
                ref={inputRef}
                defaultValue={postDetails?.serviceSchedule}
                onChangeText={(text) => (serviceScheduleRef.current = text).trim()}
              />
            )}

            {postDetails?.postType === "event" && (
              <>
                <InputFieldAndTitle
                  title={"Venue:"}
                  ref={inputRef}
                  defaultValue={postDetails?.eventVenue}
                  onChangeText={(text) => (eventVenueRef.current = text).trim()}
                />

                <InputFieldAndTitle
                  title={"Time:"}
                  ref={inputRef}
                  defaultValue={postDetails?.eventTime}
                  onChangeText={(text) => (eventTimeRef.current = text).trim()}
                />

                <InputFieldAndTitle
                  title={"Date:"}
                  ref={inputRef}
                  defaultValue={postDetails?.eventDate}
                  onChangeText={(text) => (eventDateRef.current = text).trim()}
                />
              </>
            )}

            <InputFieldAndTitle
              title={"Description:"}
              ref={inputRef}
              defaultValue={postDetails?.description}
              onChangeText={(text) => (descriptionRef.current = text).trim()}
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

          {/* Update Post Button*/}
          <UpdatePostBtn handleUpdatePost={handleUpdatePost} isUpdatingPost={isUpdatingPost} />
        </View>
      </CustomKeyboard>
    </>
  );
}
