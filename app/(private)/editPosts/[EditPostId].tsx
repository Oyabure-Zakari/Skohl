import deleteCloudinaryImage from "@/app/apis/deleteCloudinaryImage";
import PhotoSection from "@/components/bottomSheet/createPostComponent/ImageSection";
import EventCategoryPicker from "@/components/bottomSheet/EventCategoryPicker";
import EventTypePicker from "@/components/bottomSheet/EventTypePicker";
import ProductCategoryPicker from "@/components/bottomSheet/ProductCategoryPicker";
import ServiceCategoryPicker from "@/components/bottomSheet/ServiceCategoryPicker";
import EditPostHeader from "@/components/editPostComponents/EditPostHeader";
import InputFieldAndTitle from "@/components/editPostComponents/InputFieldAndTitle";
import CustomButton from "@/components/reuseableComponents/CustomButton";
import CustomKeyboard from "@/components/reuseableComponents/CustomKeyboard";
import DeviceCamera from "@/components/reuseableComponents/DeviceCamera";
import OverlayLoadingIndicator from "@/components/reuseableComponents/OverlayLoadingIndicator";
import COLORS from "@/constants/colors";
import { db } from "@/firebase/firebase.config";
import usePostDetails from "@/hooks/postDetails";
import usePhotoStore from "@/store/photoStore";
import useEditPostStyles from "@/styles/editPost.styles";
import postImageUrl from "@/utils/cloudinary/postImageUrl";
import extractPublicId from "@/utils/extractPublicId";
import { useLocalSearchParams, useRouter } from "expo-router";
import { doc, updateDoc } from "firebase/firestore";
import React, { useEffect, useRef, useState } from "react";
import { Alert, Text, TextInput, TouchableOpacity, View } from "react-native";
import Toast from "react-native-toast-message";

export default function EditPost() {
  const editPostStyles = useEditPostStyles();

  const { EditPostId } = useLocalSearchParams();

  // Fetching post details via tanstack query + firebase onSnapshot listener (real-time updates)
  const {
    postDetails,
    isLoadingPostsDetails,
    isError: isPostsDetailsError,
    error: postsDetailsError,
  } = usePostDetails(EditPostId as string);

  // Ref
  const titleRef = useRef("");
  const priceRef = useRef("");
  const serviceScheduleRef = useRef("");
  const eventVenueRef = useRef("");
  const eventTimeRef = useRef("");
  const eventDateRef = useRef("");
  const descriptionRef = useRef("");
  const inputRef = useRef<TextInput>(null);

  // States
  const [isCameraOpen, setIsCameraOpen] = useState(false);
  const [selectedProductCategory, setSelectedProductCategory] = useState("");
  const [selectedServiceCategory, setSelectedServiceCategory] = useState("");
  const [selectedEventType, setSelectedEventType] = useState("");
  const [selectedEventCategory, setSelectedEventCategory] = useState("");
  const [isUpdatingPost, setIsUpdatingPost] = useState(false);

  // Router
  const router = useRouter();

  // Zustand
  const photo = usePhotoStore((state) => state.image);
  const clearPhoto = usePhotoStore((state) => state.clearImage);

  const postImage = photo ? photo : postDetails?.photo;

  // UseEffect to clear image
  useEffect(() => {
    clearPhoto();
  }, []);

  // Pre-fill refs and state with the current post values so we can detect what the user actually changed before saving.
  useEffect(() => {
    if (postDetails) {
      titleRef.current = postDetails?.title;
      descriptionRef.current = postDetails?.description;

      // Strip the ₦ symbol — price is stored with it in Firestore but edited without it in the input
      if (postDetails?.postType !== "event")
        priceRef.current = postDetails?.price?.slice(1) as string;

      if (postDetails?.postType === "service")
        serviceScheduleRef.current = postDetails?.serviceSchedule as string;

      if (postDetails?.postType === "event") {
        eventVenueRef.current = postDetails?.eventVenue as string;
        eventTimeRef.current = postDetails?.eventTime as string;
        eventDateRef.current = postDetails?.eventDate as string;
        setSelectedEventType(postDetails?.eventType as string);
      }

      setSelectedProductCategory(postDetails?.category);
      setSelectedServiceCategory(postDetails?.category);
      setSelectedEventCategory(postDetails?.category);
    }
  }, [postDetails]);

  if (isLoadingPostsDetails) {
    return <OverlayLoadingIndicator />;
  }

  if (isPostsDetailsError) {
    Alert.alert(`Error: ${postsDetailsError?.message}`);
    return;
  }

  if (isCameraOpen) {
    return <DeviceCamera setIsCameraOpen={setIsCameraOpen} />;
  }

  const updatePost = async () => {
    // Check if user has selected a new image that is not a cloudinary image
    const hasNewImage = postImage && !postImage.includes("cloudinary");
    let uploadedImage;

    // User has selected a new image, upload to Cloudinary
    if (hasNewImage) {
      uploadedImage = await postImageUrl(postImage);
    }

    // Delete previous image from Cloudinary
    if (uploadedImage && postDetails?.photo?.includes("cloudinary")) {
      try {
        const publicId = extractPublicId(postDetails?.photo);
        if (publicId) await deleteCloudinaryImage(publicId);
      } catch (deleteError: any) {
        //console.error("Failed to delete old image:", deleteError.message);
        // Don't throw here - profile update was successful
      }
    }

    // An empty object, only fields the user actually changed will be added here and sent to Firestore
    const updatedFields: any = {};

    // Only include the new image if one was uploaded
    if (uploadedImage) updatedFields.photo = uploadedImage;

    // Shared fields across all post types
    if (titleRef.current !== postDetails?.title) updatedFields.title = titleRef?.current;
    if (descriptionRef.current !== postDetails?.description)
      updatedFields.description = descriptionRef.current;

    switch (postDetails?.postType) {
      case "product":
        if (priceRef.current !== postDetails?.price?.slice(1))
          updatedFields.price = `₦${priceRef?.current}`;
        if (selectedProductCategory !== postDetails?.category)
          updatedFields.category = selectedProductCategory;
        break;

      case "service":
        if (priceRef.current !== postDetails?.price?.slice(1))
          updatedFields.price = `₦${priceRef?.current}`;
        if (serviceScheduleRef.current !== postDetails?.serviceSchedule)
          updatedFields.serviceSchedule = serviceScheduleRef.current;
        if (selectedServiceCategory !== postDetails?.category)
          updatedFields.category = selectedServiceCategory;
        break;

      case "event":
        if (eventDateRef.current !== postDetails?.eventDate)
          updatedFields.eventDate = eventDateRef.current;
        if (eventTimeRef.current !== postDetails?.eventTime)
          updatedFields.eventTime = eventTimeRef.current;
        if (eventVenueRef.current !== postDetails?.eventVenue)
          updatedFields.eventVenue = eventVenueRef.current;
        if (selectedEventCategory !== postDetails?.category)
          updatedFields.category = selectedEventCategory;
        if (selectedEventType !== postDetails?.eventType)
          updatedFields.eventType = selectedEventType;
        break;

      default:
        Toast.show({
          type: "error",
          text1: "Post not updated",
          text2: "An error occurred while updating the post.",
          text1Style: { fontSize: 16, fontFamily: "Segoe_UI_Bold" },
          text2Style: { fontSize: 12, fontFamily: "Segoe_UI_Bold" },
        });
        return;
    }

    // If the user didn't change anything, let them know, stop here and skip the Firestore write entirely
    if (Object.keys(updatedFields).length === 0) {
      Toast.show({
        type: "info",
        text1: "Post not updated",
        text2: "You did not make any changes",
        text1Style: { fontSize: 16, fontFamily: "Segoe_UI_Bold" },
        text2Style: { fontSize: 12, fontFamily: "Segoe_UI_Bold" },
      });
      return;
    }

    // At this point we have confirmed changes, so update only the changed fields in Firestore
    try {
      setIsUpdatingPost(true);
      await updateDoc(doc(db, "posts", EditPostId as string), updatedFields);
      console.log(updatedFields);
      Toast.show({
        type: "success",
        text1: "Post updated",
        text2: "Your post has been updated successfully",
        text1Style: { fontSize: 16, fontFamily: "Segoe_UI_Bold" },
        text2Style: { fontSize: 12, fontFamily: "Segoe_UI_Bold" },
      });
    } catch (error: any) {
      Alert.alert(`Error: ${error?.message}`);
      console.log(error.message);
    } finally {
      setIsUpdatingPost(false);
    }
  };

  const handleUpdatePost = async () => {
    await updatePost();
  };

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
              <>
                <Text style={editPostStyles.inputName}>Schedule:</Text>
                <TextInput
                  ref={inputRef}
                  defaultValue={postDetails?.serviceSchedule}
                  onChangeText={(text) => (serviceScheduleRef.current = text).trim()}
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
                  onChangeText={(text) => (eventVenueRef.current = text).trim()}
                  style={editPostStyles.input}
                  placeholderTextColor={COLORS.darkGrey}
                />

                <Text style={editPostStyles.inputName}>Time:</Text>
                <TextInput
                  ref={inputRef}
                  defaultValue={postDetails?.eventTime}
                  onChangeText={(text) => (eventTimeRef.current = text).trim()}
                  style={editPostStyles.input}
                  placeholderTextColor={COLORS.darkGrey}
                />

                <Text style={editPostStyles.inputName}>Date:</Text>
                <TextInput
                  ref={inputRef}
                  defaultValue={postDetails?.eventDate}
                  onChangeText={(text) => (eventDateRef.current = text).trim()}
                  style={editPostStyles.input}
                  placeholderTextColor={COLORS.darkGrey}
                />
              </>
            )}

            <Text style={editPostStyles.inputName}>Description:</Text>
            <TextInput
              ref={inputRef}
              defaultValue={postDetails?.description}
              onChangeText={(text) => (descriptionRef.current = text).trim()}
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
          <TouchableOpacity onPress={handleUpdatePost} disabled={isUpdatingPost}>
            <CustomButton text={"Save Post"} isLoading={isUpdatingPost} />
          </TouchableOpacity>
        </View>
      </CustomKeyboard>
    </>
  );
}
