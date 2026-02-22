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
import { db } from "@/firebase/firebase.config";
import usePostDetails from "@/hooks/postDetails";
import usePhotoStore from "@/store/photoStore";
import useEditPostStyles from "@/styles/editPost.styles";
import { Ionicons } from "@expo/vector-icons";
import { useLocalSearchParams, useRouter } from "expo-router";
import { doc, updateDoc } from "firebase/firestore";
import React, { useEffect, useRef, useState } from "react";
import { Alert, Text, TextInput, TouchableOpacity, View } from "react-native";

// TODO: Create upload new image functionality and also only update the post's info if the user has made any changes and then use firebase to update the post

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

  // Destructuring
  const title = postDetails?.title;
  const price = postDetails?.postType !== "event" && postDetails?.price;
  const serviceSchedule = postDetails?.postType === "service" && postDetails?.serviceSchedule;
  const eventVenue = postDetails?.postType === "event" && postDetails?.eventVenue;
  const eventTime = postDetails?.postType === "event" && postDetails?.eventTime;
  const eventDate = postDetails?.postType === "event" && postDetails?.eventDate;
  const description = postDetails?.description;
  const category = postDetails?.category;
  const eventType = (postDetails?.postType === "event" && postDetails?.eventType) as string;

  // Ref
  const titleRef = useRef(title);
  const priceRef = useRef(price);
  const serviceScheduleRef = useRef(serviceSchedule);
  const eventVenueRef = useRef(eventVenue);
  const eventTimeRef = useRef(eventTime);
  const eventDateRef = useRef(eventDate);
  const descriptionRef = useRef(description);
  const inputRef = useRef<TextInput>(null);

  // States
  const [isCameraOpen, setIsCameraOpen] = useState(false);
  const [selectedProductCategory, setSelectedProductCategory] = useState(category);
  const [selectedServiceCategory, setSelectedServiceCategory] = useState(category);
  const [selectedEventType, setSelectedEventType] = useState(eventType);
  const [selectedEventCategory, setSelectedEventCategory] = useState(category);
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
    switch (postDetails?.postType) {
      case "product":
        try {
          setIsUpdatingPost(true);
          await updateDoc(doc(db, "posts", EditPostId as string), {
            photo: postImage,
            title: titleRef.current,
            description: descriptionRef.current,
            price: `₦${priceRef.current}`,
            category: selectedProductCategory,
          });
        } catch (error: any) {
          Alert.alert(`Error: ${error?.message}`);
          console.log(error.message);
        } finally {
          setIsUpdatingPost(false);
        }
        break;

      case "service":
        try {
          setIsUpdatingPost(true);
          await updateDoc(doc(db, "posts", EditPostId as string), {
            photo: postImage,
            title: titleRef.current,
            description: descriptionRef.current,
            price: `₦${priceRef.current}`,
            serviceSchedule: serviceScheduleRef.current,
            category: selectedServiceCategory,
          });
        } catch (error: any) {
          Alert.alert(`Error: ${error?.message}`);
        } finally {
          setIsUpdatingPost(false);
        }
        break;

      case "event":
        try {
          setIsUpdatingPost(true);
          await updateDoc(doc(db, "posts", EditPostId as string), {
            title: titleRef.current,
            description: descriptionRef.current,
            eventDate: eventDateRef.current,
            eventTime: eventTimeRef.current,
            eventVenue: eventVenueRef.current,
            category: selectedEventCategory,
            eventType: selectedEventType,
          });
        } catch (error: any) {
          Alert.alert(`Error: ${error?.message}`);
        } finally {
          setIsUpdatingPost(false);
        }
        break;

      default:
        Alert.alert("Error", "An error occurred while updating the post.");
        break;
    }
  };

  const handleUpdatePost = async () => {
    await updatePost();
  };

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
              onChangeText={(text) => (titleRef.current = text).trim()}
              style={editPostStyles.input}
              placeholderTextColor={COLORS.darkGrey}
            />

            {postDetails?.postType !== "event" && (
              <>
                <Text style={editPostStyles.inputName}>Price:</Text>
                <TextInput
                  ref={inputRef}
                  defaultValue={postDetails?.price?.slice(1)}
                  keyboardType="numeric"
                  onChangeText={(text) => (priceRef.current = text).trim()}
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
