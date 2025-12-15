import CategoryPicker from "@/components/home/CategoryPicker";
import CustomButton from "@/components/reuseableComponents/CustomButton";
import FloatingActionButton from "@/components/reuseableComponents/FloatingActionButton";
import COLORS from "@/constants/colors";
import { Entypo, MaterialCommunityIcons } from "@expo/vector-icons";
import BottomSheet, {
  BottomSheetScrollView,
  BottomSheetTextInput,
  BottomSheetView,
} from "@gorhom/bottom-sheet";

import React, { useCallback, useMemo, useRef, useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import StarRating from "react-native-star-rating-widget";

export default function ProductsScreen() {
  const [activeBottomSheet, setActiveBottomSheet] = useState<"Create Post" | "Send Feedback">(
    "Create Post"
  );
  const [postType, setPostType] = useState<"Post a Product" | "Post a Service" | "Post an Event">(
    "Post a Product"
  );
  const placeHolderTitle = () => {
    switch (postType) {
      case "Post a Product":
        return "Product Name";
      case "Post a Service":
        return "Job title";
      case "Post an Event":
        return "Event topic";
    }
  };
  const [selectedCategory, setSelectedCategory] = useState("");
  const [rating, setRating] = useState(0);

  const sheetRef = useRef<BottomSheet>(null);
  const titleRef = useRef("");
  const scheduleRef = useRef("");
  const descriptionRef = useRef("");
  const venueRef = useRef("");
  const priceRef = useRef("");

  const snapPoints = useMemo(() => ["1%", "50%", "100%"], []);

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
            <View style={styles.photoContainer}>
              <Text style={styles.photoContainerText}>Photo</Text>
              <View style={styles.photoOptions}>
                <TouchableOpacity style={styles.photoOption}>
                  <MaterialCommunityIcons name="camera" size={25} color={COLORS.darkGrey} />
                </TouchableOpacity>

                <TouchableOpacity style={styles.photoOption}>
                  <Entypo name="images" size={25} color={COLORS.darkGrey} />
                </TouchableOpacity>
              </View>
            </View>

            {/* View for picker and input field */}
            <View style={styles.postFormContainer}>
              <BottomSheetTextInput
                placeholder={placeHolderTitle()}
                onChangeText={(text) => (titleRef.current = text)}
                placeholderTextColor={COLORS.darkGrey}
                style={styles.postTextInput}
              />
              <BottomSheetTextInput
                placeholder="Price"
                onChangeText={(text) => (priceRef.current = text)}
                keyboardType="numeric"
                placeholderTextColor={COLORS.darkGrey}
                style={styles.postTextInput}
              />

              {postType === "Post a Service" && (
                <BottomSheetTextInput
                  placeholder="Schedule"
                  onChangeText={(text) => (scheduleRef.current = text)}
                  multiline={true}
                  numberOfLines={4}
                  textAlignVertical="top"
                  placeholderTextColor={COLORS.darkGrey}
                  style={styles.postTextInput}
                />
              )}

              {postType === "Post an Event" && (
                <>
                  <BottomSheetTextInput
                    placeholder="Venue"
                    onChangeText={(text) => (venueRef.current = text)}
                    multiline={true}
                    numberOfLines={4}
                    textAlignVertical="top"
                    placeholderTextColor={COLORS.darkGrey}
                    style={styles.postTextInput}
                  />
                </>
              )}

              <BottomSheetTextInput
                placeholder="Description"
                onChangeText={(text) => (descriptionRef.current = text)}
                multiline={true}
                numberOfLines={4}
                textAlignVertical="top"
                placeholderTextColor={COLORS.darkGrey}
                style={styles.postTextInput}
              />

              {/* Picker */}
              <CategoryPicker
                postType={postType}
                selectedCategory={selectedCategory}
                setSelectedCategory={setSelectedCategory}
              />
            </View>

            <TouchableOpacity>
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

  photoContainer: {
    marginTop: 20,
    width: "45%",
    height: 150,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: COLORS.lightGrey,
    gap: 10,
  },

  photoContainerText: {
    color: COLORS.darkGrey,
    fontFamily: "Segoe_UI_Bold",
  },

  photoOptions: {
    flexDirection: "row",
    gap: 12,
  },

  photoOption: {
    backgroundColor: COLORS.whiteSecondary,
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
