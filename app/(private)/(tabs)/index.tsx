import React, { useCallback, useMemo, useRef, useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import StarRating from "react-native-star-rating-widget";

import { Entypo, MaterialCommunityIcons } from "@expo/vector-icons";

import BottomSheet, {
  BottomSheetScrollView,
  BottomSheetTextInput,
  BottomSheetView,
} from "@gorhom/bottom-sheet";

import COLORS from "@/constants/colors";

import EventCategoryPicker from "@/components/home/EventCategoryPicker";
import EventTypePicker from "@/components/home/EventTypePicker";
import ProductCategoryPicker from "@/components/home/ProductCategoryPicker";
import ServiceCategoryPicker from "@/components/home/ServiceCategoryPicker";
import CustomButton from "@/components/reuseableComponents/CustomButton";
import FloatingActionButton from "@/components/reuseableComponents/FloatingActionButton";
import FormErrorText from "@/components/reuseableComponents/FormErrorText";
import blurhash from "@/constants/expoBlurImage";
import useExpoImagePicker from "@/hooks/expoImagePicker";
import { Image } from "expo-image";

export default function ProductsScreen() {
  const [rating, setRating] = useState(0);
  const [error, setError] = useState("");
  const [activeBottomSheet, setActiveBottomSheet] = useState<"Create Post" | "Send Feedback">(
    "Create Post"
  );
  const [postType, setPostType] = useState<"Post a Product" | "Post a Service" | "Post an Event">(
    "Post a Product"
  );

  const snapPoints = useMemo(() => ["1%", "50%", "100%"], []);

  const { image: photo, pickImage } = useExpoImagePicker();

  const sheetRef = useRef<BottomSheet>(null);

  // Products
  const productNameRef = useRef("");
  const productPriceRef = useRef("");
  const productDescriptionRef = useRef("");
  const [selectedProductCategory, setSelectedProductCategory] = useState("");

  const isProductFormValid = () => {
    if (!photo) {
      setError("Photo is required");
      return false;
    }
    if (
      !productNameRef.current ||
      !productPriceRef.current ||
      !productDescriptionRef.current ||
      !selectedProductCategory
    ) {
      setError("All fields are required");
      return false;
    }

    setError("");
    productNameRef.current = "";
    productPriceRef.current = "";
    productDescriptionRef.current = "";
    setSelectedProductCategory("");
    return true;
  };

  const handleCreateProductPost = () => {
    if (!isProductFormValid()) {
      return;
    }
    console.log("Product post created");
  };

  // Services
  const jobTitleRef = useRef("");
  const servicePriceRef = useRef("");
  const serviceScheduleRef = useRef("");
  const serviceDescriptionRef = useRef("");
  const [selectedServiceCategory, setSelectedServiceCategory] = useState("");

  const isServiceFormValid = () => {
    if (!photo) {
      setError("Photo is required");
      return false;
    }
    if (
      !jobTitleRef.current ||
      !servicePriceRef.current ||
      !serviceScheduleRef.current ||
      !serviceDescriptionRef.current ||
      !selectedServiceCategory
    ) {
      setError("All fields are required");
      return false;
    }
    setError("");
    jobTitleRef.current = "";
    servicePriceRef.current = "";
    serviceScheduleRef.current = "";
    serviceDescriptionRef.current = "";
    setSelectedServiceCategory("");
    return true;
  };

  const handleCreateServicePost = () => {
    if (!isServiceFormValid()) {
      return;
    }
    console.log("Service post created");
  };

  // Events
  const eventTopicRef = useRef("");
  const eventVenueRef = useRef("");
  const eventDescriptionRef = useRef("");
  const [selectedEventCategory, setSelectedEventCategory] = useState("");
  const [selectedEventType, setSelectedEventType] = useState("");

  const isEventFormValid = () => {
    if (!photo) {
      setError("Photo is required");
      return false;
    }
    if (
      !eventTopicRef.current ||
      !eventVenueRef.current ||
      !eventDescriptionRef.current ||
      !selectedEventCategory ||
      !selectedEventType
    ) {
      setError("All fields are required");
      return false;
    }
    setError("");
    eventTopicRef.current = "";
    eventVenueRef.current = "";
    eventDescriptionRef.current = "";
    setSelectedEventCategory("");
    setSelectedEventType("");
    return true;
  };
  const handleCreateEventPost = () => {
    if (!isEventFormValid()) {
      return;
    }
    console.log("Event post created");
  };

  const handlePost = () => {
    if (postType === "Post a Product") {
      handleCreateProductPost();
    } else if (postType === "Post a Service") {
      handleCreateServicePost();
    } else if (postType === "Post an Event") {
      handleCreateEventPost();
    } else {
      console.log("Invalid post type");
    }
  };

  const handleSnapPress = useCallback((index: number) => {
    sheetRef.current?.snapToIndex(index);
  }, []);

  return (
    <GestureHandlerRootView style={styles.container}>
      <Text>Home Screen</Text>
      {activeBottomSheet === "Create Post" ? (
        <BottomSheet
          ref={sheetRef}
          snapPoints={snapPoints}
          enableDynamicSizing={false}
          backgroundStyle={styles.bottomSheetStyle}
          keyboardBehavior="fillParent"
          keyboardBlurBehavior="restore"
          android_keyboardInputMode="adjustResize"
        >
          <BottomSheetScrollView
            contentContainerStyle={styles.bottomSheetScrollViewContent}
            keyboardShouldPersistTaps="handled"
            showsVerticalScrollIndicator={true}
            keyboardDismissMode="none" // Enables users to scroll while typing
            bounces={true} // Enable bounce effect
            alwaysBounceVertical={true} // Always allow vertical bounce
            nestedScrollEnabled={true} // Add this - helps with scroll detection
            decelerationRate="fast" // Makes scrolling feel snappier
            overScrollMode="always" // Android - shows overscroll effect
          >
            {/* Action type */}
            <Text style={styles.activeBottomSheetText}>{activeBottomSheet}</Text>

            {/* Divider */}
            <View style={styles.divider} />

            {/* What do you want to post? text */}
            <Text style={styles.activeBottomSheetText2}>What would you like to post?</Text>

            {/* Post type */}
            <View style={styles.postTypeContainer}>
              <TouchableOpacity
                style={[
                  postType === "Post a Product"
                    ? styles.activePostTypeButton
                    : styles.inActivePostTypeButton,
                ]}
                onPress={() => setPostType("Post a Product")}
              >
                <Text
                  style={[
                    postType === "Post a Product"
                      ? styles.activePostTypeButtonText
                      : styles.inActivePostTypeButtonText,
                  ]}
                >
                  Post a Product
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[
                  postType === "Post a Service"
                    ? styles.activePostTypeButton
                    : styles.inActivePostTypeButton,
                ]}
                onPress={() => setPostType("Post a Service")}
              >
                <Text
                  style={[
                    postType === "Post a Service"
                      ? styles.activePostTypeButtonText
                      : styles.inActivePostTypeButtonText,
                  ]}
                >
                  Post a Service
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[
                  postType === "Post an Event"
                    ? styles.activePostTypeButton
                    : styles.inActivePostTypeButton,
                ]}
                onPress={() => setPostType("Post an Event")}
              >
                <Text
                  style={[
                    postType === "Post an Event"
                      ? styles.activePostTypeButtonText
                      : styles.inActivePostTypeButtonText,
                  ]}
                >
                  Post an Event
                </Text>
              </TouchableOpacity>
            </View>

            {/* Photo View */}
            {postType === "Post a Product" && (
              <>
                {!photo ? (
                  <View style={styles.photoPlaceholder}>
                    <Text style={styles.photoContainerText}>Photo</Text>
                  </View>
                ) : (
                  <Image
                    source={{ uri: photo }}
                    style={styles.postPhoto}
                    placeholder={{ blurhash }}
                    contentFit="contain"
                    transition={1000}
                    alt="Product Photo"
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
              </>
            )}

            {postType === "Post a Service" && (
              <>
                {!photo ? (
                  <View style={styles.photoPlaceholder}>
                    <Text style={styles.photoContainerText}>Photo</Text>
                  </View>
                ) : (
                  <Image
                    source={{ uri: photo }}
                    style={styles.postPhoto}
                    placeholder={{ blurhash }}
                    contentFit="contain"
                    transition={1000}
                    alt="Product Photo"
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
              </>
            )}

            {postType === "Post an Event" && (
              <>
                {!photo ? (
                  <View style={styles.photoPlaceholder}>
                    <Text style={styles.photoContainerText}>Photo</Text>
                  </View>
                ) : (
                  <Image
                    source={{ uri: photo }}
                    style={styles.postPhoto}
                    placeholder={{ blurhash }}
                    contentFit="contain"
                    transition={1000}
                    alt="Product Photo"
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
              </>
            )}

            {/* View for picker and input field */}
            <View style={styles.postFormContainer}>
              <FormErrorText error={error} />
              {postType === "Post a Product" && (
                <>
                  <BottomSheetTextInput
                    placeholder="Post Name"
                    onChangeText={(text) => (productNameRef.current = text)}
                    placeholderTextColor={COLORS.darkGrey}
                    style={styles.postTextInput}
                  />
                  <BottomSheetTextInput
                    placeholder="Price"
                    onChangeText={(text) => (productPriceRef.current = text)}
                    keyboardType="numeric"
                    placeholderTextColor={COLORS.darkGrey}
                    style={styles.postTextInput}
                  />

                  <BottomSheetTextInput
                    placeholder="Description"
                    onChangeText={(text) => (productDescriptionRef.current = text)}
                    placeholderTextColor={COLORS.darkGrey}
                    style={styles.postTextInput}
                  />

                  <ProductCategoryPicker
                    selectedCategory={selectedProductCategory}
                    setSelectedCategory={setSelectedProductCategory}
                  />
                </>
              )}

              {postType === "Post a Service" && (
                <>
                  <BottomSheetTextInput
                    placeholder="Job Tite"
                    onChangeText={(text) => (jobTitleRef.current = text)}
                    placeholderTextColor={COLORS.darkGrey}
                    style={styles.postTextInput}
                  />
                  <BottomSheetTextInput
                    placeholder="Price"
                    onChangeText={(text) => (servicePriceRef.current = text)}
                    keyboardType="numeric"
                    placeholderTextColor={COLORS.darkGrey}
                    style={styles.postTextInput}
                  />

                  <BottomSheetTextInput
                    placeholder="Schedule"
                    onChangeText={(text) => (serviceScheduleRef.current = text)}
                    placeholderTextColor={COLORS.darkGrey}
                    style={styles.postTextInput}
                  />

                  <BottomSheetTextInput
                    placeholder="Description"
                    onChangeText={(text) => (serviceDescriptionRef.current = text)}
                    placeholderTextColor={COLORS.darkGrey}
                    style={styles.postTextInput}
                  />

                  <ServiceCategoryPicker
                    selectedCategory={selectedServiceCategory}
                    setSelectedCategory={setSelectedServiceCategory}
                  />
                </>
              )}

              {postType === "Post an Event" && (
                <>
                  <BottomSheetTextInput
                    placeholder="Event Topic"
                    onChangeText={(text) => (eventTopicRef.current = text)}
                    placeholderTextColor={COLORS.darkGrey}
                    style={styles.postTextInput}
                  />

                  <BottomSheetTextInput
                    placeholder="Venue"
                    onChangeText={(text) => (eventVenueRef.current = text)}
                    placeholderTextColor={COLORS.darkGrey}
                    style={styles.postTextInput}
                  />

                  <BottomSheetTextInput
                    placeholder="Description"
                    onChangeText={(text) => (eventDescriptionRef.current = text)}
                    placeholderTextColor={COLORS.darkGrey}
                    style={styles.postTextInput}
                  />

                  <EventTypePicker
                    selectedEventType={selectedEventType}
                    setSelectedEventType={setSelectedEventType}
                  />

                  <EventCategoryPicker
                    selectedCategory={selectedEventCategory}
                    setSelectedCategory={setSelectedEventCategory}
                  />
                </>
              )}
            </View>

            <TouchableOpacity onPress={handlePost}>
              <CustomButton text={"Post"} />
            </TouchableOpacity>
          </BottomSheetScrollView>
        </BottomSheet>
      ) : (
        <BottomSheet
          ref={sheetRef}
          snapPoints={snapPoints}
          enableDynamicSizing={false}
          backgroundStyle={styles.bottomSheetStyle}
          keyboardBehavior="fillParent"
          keyboardBlurBehavior="restore"
          android_keyboardInputMode="adjustResize"
        >
          <BottomSheetView style={styles.bottomSheetViewContent}>
            {/* Action type */}
            <Text style={styles.activeBottomSheetText}>{activeBottomSheet}</Text>

            {/* Divider */}
            <View style={styles.divider} />

            {/* Want to give us feedback? Text */}
            <Text style={styles.activeBottomSheetText2}>{"We'd love your feedback!"}</Text>

            {/* Text Input */}
            <BottomSheetTextInput
              placeholder="Feedback"
              multiline={true}
              numberOfLines={4}
              textAlignVertical="top"
              placeholderTextColor={COLORS.darkGrey}
              style={styles.postTextInput2}
            />

            {/* Rating */}
            <View style={styles.ratingContainer}>
              <Text style={styles.ratingText}>Rate us</Text>
              <StarRating
                maxStars={5}
                starSize={30}
                step={"full"}
                rating={rating}
                onChange={setRating}
                color={COLORS.yellow}
                emptyColor={COLORS.yellow}
              />
            </View>

            <TouchableOpacity>
              <CustomButton text={"Send Feedback"} />
            </TouchableOpacity>
          </BottomSheetView>
        </BottomSheet>
      )}

      <FloatingActionButton
        setActiveBottomSheet={setActiveBottomSheet}
        handleSnapPress={handleSnapPress}
      />
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
    justifyContent: "center",
    alignItems: "center",
  },

  // Styles for both Create Post and Send Feedback
  bottomSheetStyle: {
    borderRadius: 10,
    backgroundColor: COLORS.white,
    shadowColor: COLORS.darkBlue,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 20,
  },

  divider: {
    width: "100%",
    height: 2,
    backgroundColor: COLORS.lightGrey,
    marginTop: 20,
  },

  // Styles for Create Post
  bottomSheetScrollViewContent: {
    alignItems: "center",
    paddingBottom: 200, // This is what makes the contents  scrollable
  },

  activeBottomSheetText: {
    color: COLORS.darkGrey,
    fontFamily: "Segoe_UI_Bold",
  },

  activeBottomSheetText2: {
    color: COLORS.darkBlue,
    fontFamily: "Segoe_UI_Bold",
    fontSize: 16,
    marginTop: 10,
  },

  postTypeContainer: {
    flexDirection: "row",
    gap: 10,
    marginTop: 10,
  },

  activePostTypeButton: {
    backgroundColor: COLORS.purple,
    borderRadius: 5,
    padding: 5,
  },

  activePostTypeButtonText: {
    color: COLORS.white,
    fontFamily: "Segoe_UI_Bold",
    fontSize: 12,
    paddingHorizontal: 5,
  },

  inActivePostTypeButton: {
    borderColor: COLORS.purple,
    borderWidth: 1,
    borderRadius: 5,
    padding: 5,
  },

  inActivePostTypeButtonText: {
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
    gap: 10,
  },

  postPhoto: { width: 150, height: 150, borderRadius: 10, marginTop: 20 },

  photoContainerText: {
    color: COLORS.darkGrey,
    fontFamily: "Segoe_UI_Bold",
  },

  photoOptions: {
    flexDirection: "row",
    gap: 12,
  },

  photoOption: {
    backgroundColor: COLORS.lightGrey,
    width: 40,
    height: 40,
    borderRadius: 5,
    justifyContent: "center",
    alignItems: "center",
  },

  postFormContainer: {
    margin: 20,
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    gap: 15,
  },

  postTextInput: {
    width: "90%",
    color: COLORS.darkGrey,
    fontFamily: "Segoe_UI_Bold",
    backgroundColor: COLORS.lightGrey,
    borderRadius: 10,
    paddingHorizontal: 16,
    paddingVertical: 12, // Add this
    minHeight: 48, // Add this - ensures good touch target
  },

  // Styles for Send Feedback
  bottomSheetViewContent: {
    flex: 1,
    alignItems: "center",
  },

  postTextInput2: {
    width: "90%",
    color: COLORS.darkGrey,
    fontFamily: "Segoe_UI_Bold",
    backgroundColor: COLORS.lightGrey,
    borderRadius: 10,
    paddingHorizontal: 16,
    marginVertical: 10,
  },

  ratingContainer: {
    gap: 10,
    alignItems: "center",
    paddingVertical: 20,
  },

  ratingText: {
    color: COLORS.darkGrey,
    fontFamily: "Segoe_UI_Bold",
  },
});
