import DeviceCamera from "@/components/bottomSheet/createPostComponent/Camera";
import CustomButton from "@/components/reuseableComponents/CustomButton";
import CustomKeyboard from "@/components/reuseableComponents/CustomKeyboard";
import COLORS from "@/constants/colors";
import blurhash from "@/constants/expoBlurImage";
import useExpoImagePicker from "@/hooks/expoImagePicker";
import usePhotoStore from "@/store/photoStore";
import useCreatePostBottomSheetStyles from "@/styles/createPostBottomSheetStyles";
import { Entypo, Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { Image } from "expo-image";
import { useRouter } from "expo-router";
import React, { useRef, useState } from "react";
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";

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

  // Functions
  const openCamera = () => setIsCameraOpen(true);

  if (isCameraOpen) {
    return <DeviceCamera setIsCameraOpen={setIsCameraOpen} />;
  }

  return (
    <CustomKeyboard>
      <View style={editProfileStyles.container}>
        {/* Header */}
        <View style={editProfileStyles.header}>
          {/* Back Button */}
          <TouchableOpacity onPress={() => router.back()}>
            <Ionicons name="arrow-back-sharp" size={24} color={COLORS.darkGrey} />
          </TouchableOpacity>

          {/* Title */}
          <Text style={editProfileStyles.title}>Edit Profile</Text>
        </View>

        <View style={editProfileStyles.formContainer}>
          {!photo ? (
            <View style={createPostStyles.photoPlaceholder}>
              <Text style={createPostStyles.photoText}>Image</Text>
            </View>
          ) : (
            <Image
              source={{ uri: photo }}
              style={createPostStyles.postPhoto}
              placeholder={{ blurhash }}
              contentFit="contain"
              transition={1000}
            />
          )}

          {/* Photo Options */}
          <View style={createPostStyles.photoOptions}>
            <TouchableOpacity style={createPostStyles.photoOption} onPress={openCamera}>
              <MaterialCommunityIcons name="camera" size={25} color={COLORS.darkGrey} />
            </TouchableOpacity>

            <TouchableOpacity style={createPostStyles.photoOption} onPress={pickImage}>
              <Entypo name="images" size={25} color={COLORS.darkGrey} />
            </TouchableOpacity>

            <TouchableOpacity style={createPostStyles.photoOption} onPress={clearImage}>
              <MaterialCommunityIcons name="cancel" size={25} color={COLORS.darkGrey} />
            </TouchableOpacity>
          </View>

          {/* Text Input */}
          <TextInput
            ref={textInputRef}
            placeholder="Edit bio"
            multiline
            numberOfLines={4}
            textAlignVertical="top"
            placeholderTextColor={COLORS.darkGrey}
            style={editProfileStyles.textInput}
            onChangeText={(text) => (bioTextRef.current = text)}
          />
        </View>
      </View>

      {/* Save Button */}
      <TouchableOpacity>
        <CustomButton text="Save" />
      </TouchableOpacity>
    </CustomKeyboard>
  );
}

const editProfileStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
  },

  header: {
    paddingHorizontal: 16,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },

  title: {
    color: COLORS.darkBlue,
    fontFamily: "Segoe_UI_Bold",
    fontSize: 16,
  },

  formContainer: {
    flex: 1,
    marginTop: 40,
    alignItems: "center",
  },

  textInput: {
    width: "90%",
    backgroundColor: COLORS.lightGrey,
    borderRadius: 10,
    paddingHorizontal: 16,
    paddingVertical: 12,
    marginVertical: 30,
    color: COLORS.darkGrey,
    fontFamily: "Segoe_UI_Bold",
  },
});
