import DeviceCamera from "@/components/bottomSheet/createPostComponent/Camera";
import CustomButton from "@/components/reuseableComponents/CustomButton";
import CustomKeyboard from "@/components/reuseableComponents/CustomKeyboard";
import COLORS from "@/constants/colors";
import blurhash from "@/constants/expoBlurImage";
import { useAuth } from "@/contexts/AuthContext";
import useExpoImagePicker from "@/hooks/expoImagePicker";
import { useUserProfile } from "@/hooks/userProfile";
import usePhotoStore from "@/store/photoStore";
import useCreatePostBottomSheetStyles from "@/styles/createPostBottomSheetStyles";
import useEditProfileStyles from "@/styles/editProfile.styles";
import formatFullName from "@/utils/formatUserFullname";
import { Entypo, Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { Image } from "expo-image";
import { useRouter } from "expo-router";
import { StatusBar } from "expo-status-bar";
import React, { useEffect, useRef, useState } from "react";
import { Text, TextInput, TouchableOpacity, View } from "react-native";
import Animated, { FadeInDown, FadeInUp } from "react-native-reanimated";

// Custom animated components
const AnimatedTouchableOpacity = Animated.createAnimatedComponent(TouchableOpacity);

export default function EditProfile() {
  // Router
  const router = useRouter();

  // States
  const [isCameraOpen, setIsCameraOpen] = useState(false);

  // Refs
  const textInputRef = useRef(null);
  const bioTextRef = useRef("");

  // Custom Hooks
  const { pickImage } = useExpoImagePicker(); // Image Picker

  // zustand
  const photo = usePhotoStore((state) => state.image);
  const clearImage = usePhotoStore((state) => state.clearImage);

  // Styles
  const createPostStyles = useCreatePostBottomSheetStyles();
  const editProfileStyles = useEditProfileStyles();

  // Currently logged in user
  const { userUid } = useAuth();

  // Fetch user via TanStack Query instead of local state
  const { data: user, isPending: isLoading } = useUserProfile(userUid);

  // Image
  const userImage = photo ? photo : user?.image;

  // Functions
  const openCamera = () => setIsCameraOpen(true);

  // UseEffect to clear image
  useEffect(() => {
    clearImage();
  }, []);

  if (isCameraOpen) {
    return <DeviceCamera setIsCameraOpen={setIsCameraOpen} />;
  }

  const fullName = formatFullName(user?.fullName);

  return (
    <>
      <StatusBar style="dark" backgroundColor={COLORS.white} />

      <CustomKeyboard>
        <View style={editProfileStyles.container}>
          {/* Header */}
          <View style={editProfileStyles.header}>
            {/* Back Button */}
            <TouchableOpacity onPress={() => router.back()}>
              <Ionicons name="arrow-back-sharp" size={24} color={COLORS.darkBlue} />
            </TouchableOpacity>

            {/* Title */}
            <Text style={editProfileStyles.title}>Edit Profile</Text>
          </View>

          <View style={editProfileStyles.formContainer}>
            {/* Profile Picture */}
            <Image
              source={{ uri: userImage }}
              style={{ width: 150, height: 150, borderRadius: 100 }}
              placeholder={{ blurhash }}
              contentFit="contain"
              transition={1000}
              alt="Profile Picture"
            />

            {/* Full Name */}
            <Animated.Text entering={FadeInUp.delay(600)} style={editProfileStyles.fullName}>
              {fullName}
            </Animated.Text>

            {/* Photo Options */}
            <View style={createPostStyles.photoOptions}>
              <AnimatedTouchableOpacity
                entering={FadeInDown.delay(200)}
                style={createPostStyles.photoOption}
                onPress={openCamera}
              >
                <MaterialCommunityIcons name="camera" size={25} color={COLORS.darkGrey} />
              </AnimatedTouchableOpacity>

              <AnimatedTouchableOpacity
                entering={FadeInDown.delay(400)}
                style={createPostStyles.photoOption}
                onPress={pickImage}
              >
                <Entypo name="images" size={25} color={COLORS.darkGrey} />
              </AnimatedTouchableOpacity>

              <AnimatedTouchableOpacity
                entering={FadeInDown.delay(600)}
                style={createPostStyles.photoOption}
                onPress={clearImage}
              >
                <MaterialCommunityIcons name="cancel" size={25} color={COLORS.darkGrey} />
              </AnimatedTouchableOpacity>
            </View>

            {/* Text Input */}
            <TextInput
              ref={textInputRef}
              placeholder="Bio"
              multiline
              numberOfLines={4}
              textAlignVertical="top"
              placeholderTextColor={COLORS.darkGrey}
              style={editProfileStyles.textInput}
              onChangeText={(text) => (bioTextRef.current = text)}
            />

            {/* Save Button */}
            <AnimatedTouchableOpacity entering={FadeInDown.delay(800)} style={{ marginTop: 20 }}>
              <CustomButton text="Save" />
            </AnimatedTouchableOpacity>
          </View>
        </View>
      </CustomKeyboard>
    </>
  );
}
