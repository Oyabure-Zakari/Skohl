import EditProfileHeader from "@/components/editProfile/EditProfileHeader";
import Fullname from "@/components/editProfile/Fullname";
import FullnameSkeletonUI from "@/components/editProfile/FullnameSkeletonUI";
import CustomButton from "@/components/reuseableComponents/CustomButton";
import CustomKeyboard from "@/components/reuseableComponents/CustomKeyboard";
import DeviceCamera from "@/components/reuseableComponents/DeviceCamera";
import bioMaxLength from "@/constants/bioMaxLength";
import COLORS from "@/constants/colors";
import blurhash from "@/constants/expoBlurImage";
import IMAGES from "@/constants/images";
import { useAuth } from "@/contexts/AuthContext";
import useExpoImagePicker from "@/hooks/expoImagePicker";
import { useUserProfile } from "@/hooks/userProfile";
import usePhotoStore from "@/store/photoStore";
import useCreatePostBottomSheetStyles from "@/styles/createPostBottomSheetStyles";
import useEditProfileStyles from "@/styles/editProfile.styles";
import formatFullName from "@/utils/formatUserFullname";
import { Entypo, MaterialCommunityIcons } from "@expo/vector-icons";
import { Image } from "expo-image";
import { useRouter } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { MotiView } from "moti";
import { Skeleton } from "moti/skeleton";
import React, { useEffect, useRef, useState } from "react";
import { TextInput, TouchableOpacity, View } from "react-native";
import Animated, { FadeInDown } from "react-native-reanimated";

// Custom animated components
const AnimatedTouchableOpacity = Animated.createAnimatedComponent(TouchableOpacity);

export default function EditProfile() {
  // Router
  const router = useRouter();

  // Currently logged in user
  const { userUid } = useAuth();

  // Fetch user via TanStack Query instead of local state
  const { data: user, isPending: isLoading } = useUserProfile(userUid);

  // States
  const [isCameraOpen, setIsCameraOpen] = useState(false);

  // Refs
  const textInputRef = useRef<TextInput>(null);
  const userBioTextRef = useRef(user?.bio || "");

  // Custom Hooks
  const { pickImage } = useExpoImagePicker(); // Image Picker

  // zustand
  const photo = usePhotoStore((state) => state.image);
  const clearImage = usePhotoStore((state) => state.clearImage);

  // Styles
  const createPostStyles = useCreatePostBottomSheetStyles();
  const editProfileStyles = useEditProfileStyles();

  // Image
  const userImage = photo ? photo : user?.image;

  const openCamera = () => setIsCameraOpen(true);

  // UseEffect to clear image
  useEffect(() => {
    clearImage();
  }, []);

  if (isCameraOpen) {
    return <DeviceCamera setIsCameraOpen={setIsCameraOpen} />;
  }

  const fullName = formatFullName(user?.fullName);

  const handleSaveProfile = () => {
    console.log("Image saved:", userImage);
    console.log("Bio saved:", userBioTextRef.current);
  };

  return (
    <>
      <StatusBar style="light" backgroundColor={COLORS.purple} />

      <CustomKeyboard>
        {/* Background Image */}
        <Image source={IMAGES.pattern2} style={editProfileStyles.pattern} />
        {/* Container */}
        <View style={editProfileStyles.container}>
          {/* Header */}
          <EditProfileHeader />

          {/* Form */}
          <View style={editProfileStyles.formContainer}>
            {/* Profile Picture */}
            <Image
              source={{ uri: userImage }}
              style={editProfileStyles.profilePicture}
              placeholder={{ blurhash }}
              contentFit="contain"
              transition={1000}
              alt="Profile Picture"
            />

            {/* Full Name */}
            {isLoading ? (
              <FullnameSkeletonUI isLoading={isLoading} />
            ) : (
              <Fullname fullName={fullName} />
            )}

            {/* Photo Options */}
            <View style={createPostStyles.photoOptions}>
              <AnimatedTouchableOpacity
                entering={FadeInDown.delay(400)}
                style={createPostStyles.photoOption}
                onPress={openCamera}
              >
                <MaterialCommunityIcons name="camera" size={25} color={COLORS.darkGrey} />
              </AnimatedTouchableOpacity>

              <AnimatedTouchableOpacity
                entering={FadeInDown.delay(600)}
                style={createPostStyles.photoOption}
                onPress={pickImage}
              >
                <Entypo name="images" size={25} color={COLORS.darkGrey} />
              </AnimatedTouchableOpacity>

              <AnimatedTouchableOpacity
                entering={FadeInDown.delay(800)}
                style={createPostStyles.photoOption}
                onPress={clearImage}
              >
                <MaterialCommunityIcons
                  name="image-off-outline"
                  size={25}
                  color={COLORS.darkGrey}
                />
              </AnimatedTouchableOpacity>
            </View>

            {/* Text Input */}
            {isLoading ? (
              <>
                {/* Skeleton */}
                <MotiView style={{ marginTop: 20, alignItems: "center" }}>
                  <Skeleton
                    show={isLoading}
                    colorMode="light"
                    width={"60%"}
                    height={100}
                  ></Skeleton>
                </MotiView>
              </>
            ) : (
              <TextInput
                ref={textInputRef}
                placeholder="Enter your bio here..."
                multiline
                maxLength={bioMaxLength}
                numberOfLines={5.1}
                textAlignVertical="top"
                placeholderTextColor={COLORS.darkGrey}
                style={editProfileStyles.textInput}
                defaultValue={user?.bio}
                onChangeText={(text) => (userBioTextRef.current = text)}
              />
            )}

            {/* Save Button */}
            <AnimatedTouchableOpacity
              entering={FadeInDown.delay(800)}
              style={{ marginTop: 20 }}
              onPress={handleSaveProfile}
            >
              <CustomButton text="Save" />
            </AnimatedTouchableOpacity>
          </View>
        </View>
      </CustomKeyboard>
    </>
  );
}
