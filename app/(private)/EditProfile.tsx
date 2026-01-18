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
import { db } from "@/firebase/firebase.config";
import postImageUrl from "@/utils/cloudinary/postImageUrl";
import extractPublicId from "@/utils/extractPublicId";
import formatFullName from "@/utils/formatUserFullname";
import { doc, updateDoc } from "firebase/firestore";
import Toast from "react-native-toast-message";

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

  const handleSaveProfile = async () => {
    // Check if image is from cloudinary, if not, upload
    let uploadedImage;
    if (!userImage.includes("cloudinary")) uploadedImage = await postImageUrl(userImage);

    // Check if user did not make any changes
    if (userImage === user?.image && userBioTextRef.current === user?.bio) {
      // Show toast
      Toast.show({
        type: "error",
        text1: "Profile not updated",
        text2: "You did not make any changes",
        text1Style: { fontSize: 16, fontFamily: "Segoe_UI_Bold" },
        text2Style: { fontSize: 12, fontFamily: "Segoe_UI_Bold" },
      });
    } else {
      await updateDoc(doc(db, "users", user?.uid), {
        bio: userBioTextRef.current,
        image: uploadedImage ? uploadedImage : user?.image,
      });
      //TODO: Delete previously uploaded image from cloudinary i.e user?.image
      const publicId = extractPublicId(user?.image);
      console.log(publicId);
      Toast.show({
        type: "success",
        text1: "Profile updated",
        text2: "Your profile has been updated successfully",
        text1Style: { fontSize: 16, fontFamily: "Segoe_UI_Bold" },
        text2Style: { fontSize: 12, fontFamily: "Segoe_UI_Bold" },
      });
    }
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
