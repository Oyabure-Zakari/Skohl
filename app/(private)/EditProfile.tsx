// React
import React, { useEffect, useRef, useState } from "react";
// React Native
import { TextInput, View } from "react-native";
// Expo
import { Image } from "expo-image";
import { StatusBar } from "expo-status-bar";
// Components
import BioSkeletonUI from "@/components/editProfile/BioSkeletonUI";
import BioTextInput from "@/components/editProfile/BioTextInput";
import EditProfileHeader from "@/components/editProfile/EditProfileHeader";
import Fullname from "@/components/editProfile/Fullname";
import FullnameSkeletonUI from "@/components/editProfile/FullnameSkeletonUI";
import SaveProfileButton from "@/components/editProfile/SaveProfileButton";
import CustomKeyboard from "@/components/reuseableComponents/CustomKeyboard";
import DeviceCamera from "@/components/reuseableComponents/DeviceCamera";
import PhotoOptions from "@/components/reuseableComponents/PhotoOptions";
import bioMaxLength from "@/constants/bioMaxLength";
// Constants
import COLORS from "@/constants/colors";
import blurhash from "@/constants/expoBlurImage";
import IMAGES from "@/constants/images";
// Contexts
import { useAuth } from "@/contexts/AuthContext";
// Custom Hooks
import { useUserProfile } from "@/hooks/userProfile";
// Zustand
import usePhotoStore from "@/store/photoStore";
// Styles
import useEditProfileStyles from "@/styles/editProfile.styles";
// Utils
import formatFullName from "@/utils/formatUserFullname";

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
              <BioTextInput
                textInputRef={textInputRef}
                bioMaxLength={bioMaxLength}
                user={user}
                userBioTextRef={userBioTextRef}
              />
            )}

            {/* Save Button */}
            <SaveProfileButton handleSaveProfile={handleSaveProfile} />
          </View>
        </View>
      </CustomKeyboard>
    </>
  );
}
