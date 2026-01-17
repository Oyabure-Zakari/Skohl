import BioSkeletonUI from "@/components/editProfile/BioSkeletonUI";
import EditProfileHeader from "@/components/editProfile/EditProfileHeader";
import Fullname from "@/components/editProfile/Fullname";
import FullnameSkeletonUI from "@/components/editProfile/FullnameSkeletonUI";
import CustomButton from "@/components/reuseableComponents/CustomButton";
import CustomKeyboard from "@/components/reuseableComponents/CustomKeyboard";
import DeviceCamera from "@/components/reuseableComponents/DeviceCamera";
import PhotoOptions from "@/components/reuseableComponents/PhotoOptions";
import bioMaxLength from "@/constants/bioMaxLength";
import COLORS from "@/constants/colors";
import blurhash from "@/constants/expoBlurImage";
import IMAGES from "@/constants/images";
import { useAuth } from "@/contexts/AuthContext";
import { useUserProfile } from "@/hooks/userProfile";
import usePhotoStore from "@/store/photoStore";
import useEditProfileStyles from "@/styles/editProfile.styles";
import formatFullName from "@/utils/formatUserFullname";
import { Image } from "expo-image";
import { StatusBar } from "expo-status-bar";
import React, { useEffect, useRef, useState } from "react";
import { TextInput, TouchableOpacity, View } from "react-native";
import Animated, { FadeInDown } from "react-native-reanimated";

// Custom animated components
const AnimatedTouchableOpacity = Animated.createAnimatedComponent(TouchableOpacity);

export default function EditProfile() {
  // Currently logged in user
  const { userUid } = useAuth();

  // Fetch user via TanStack Query instead of local state
  const { data: user, isPending: isLoading } = useUserProfile(userUid);

  // States
  const [isCameraOpen, setIsCameraOpen] = useState(false);

  // Refs
  const textInputRef = useRef<TextInput>(null);
  const userBioTextRef = useRef(user?.bio || "");

  // zustand
  const photo = usePhotoStore((state) => state.image);
  const clearImage = usePhotoStore((state) => state.clearImage);

  // Styles
  const editProfileStyles = useEditProfileStyles();

  // Image
  const userImage = photo ? photo : user?.image;

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
            <PhotoOptions openCamera={() => setIsCameraOpen(true)} clearImage={clearImage} />

            {/* Text Input */}
            {isLoading ? (
              <BioSkeletonUI isLoading={isLoading} />
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
