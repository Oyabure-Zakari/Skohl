// React
import React, { useEffect, useRef, useState } from "react";
// React Native
import { TouchableOpacity, View } from "react-native";
// Components
import CustomButton from "@/components/reuseableComponents/CustomButton";
import ProductCategoryPicker from "../ProductCategoryPicker";
import DeviceCamera from "./Camera";
import PhotoSection from "./ImageSection";
// Connstants
import COLORS from "@/constants/colors";
// Styles
import useCreatePostBottomSheetStyles from "@/styles/createPostBottomSheetStyles";
// Packages
import { BottomSheetTextInput } from "@gorhom/bottom-sheet";
// Zustand
import FormErrorText from "@/components/reuseableComponents/FormErrorText";
import OverlayLoadingIndicator from "@/components/reuseableComponents/OverlayLoadingIndicator";
import { useAuth } from "@/contexts/AuthContext";
import usersCollectionRef from "@/firebase/collectionRef/usersCollectionRef";
import { db } from "@/firebase/firebase.config";
import usePhotoStore from "@/store/photoStore";
import {
  addDoc,
  collection,
  doc,
  getDocs,
  query,
  serverTimestamp,
  updateDoc,
  where,
} from "firebase/firestore";

type PostProductFormProps = {
  postType: "Post a Product" | "Post a Service" | "Post an Event";
};

const PostProductForm: React.FC<PostProductFormProps> = ({ postType }) => {
  // Refs for form values
  const productNameRef = useRef("");
  const productPriceRef = useRef("");
  const productDescriptionRef = useRef("");
  // States
  const [error, setError] = useState("");
  const [isCameraOpen, setIsCameraOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedProductCategory, setSelectedProductCategory] = useState("");

  // Styles
  const createPostStyles = useCreatePostBottomSheetStyles();

  // Current user uid from auth context
  const { userUid } = useAuth();

  // Zustand
  const photo = usePhotoStore((state) => state.image);
  const clearPhoto = usePhotoStore((state) => state.clearImage);

  // UseEffect to clear image
  useEffect(() => {
    clearPhoto();
  }, [postType]);

  const isProductFormValid = () => {
    if (!photo) {
      setError("Please add a photo");
      return false;
    }
    if (
      !productNameRef.current.trim() ||
      !productPriceRef.current.trim() ||
      !productDescriptionRef.current.trim() ||
      !selectedProductCategory
    ) {
      setError("All fields are required");
      return false;
    }

    setError("");
    return true;
  };

  const generateImageUrl = async (): Promise<string | null> => {
    if (!photo) {
      setError("No image selected");
      console.log("Cloudinary: No image selected");

      return null;
    }

    const detectImageType = () => {
      if (photo.toLowerCase().endsWith(".jpg") || photo.toLowerCase().endsWith(".jpeg"))
        return "jpeg";
      else if (photo.toLowerCase().endsWith(".png")) return "png";
    };

    const imageType = detectImageType();
    if (!imageType) {
      setError("Unsupported image format");
      console.log("Cloudinary: Unsupported image format");
      return null;
    }

    const detectExtension = () => {
      if (photo.toLowerCase().endsWith(".jpg") || photo.toLowerCase().endsWith(".jpeg"))
        return "jpeg";
      else if (photo.toLowerCase().endsWith(".png")) return "png";
    };

    const extension = detectExtension();
    if (!extension) {
      setError("Extension not found");
      console.log("Cloudinary: Extension not found");
      return null;
    }

    try {
      const formData = new FormData();
      formData.append("file", {
        uri: photo,
        type: `image/${imageType}`,
        name: `upload.${extension}`,
      } as any);
      formData.append("upload_preset", process.env.EXPO_PUBLIC_CLOUDINARY_UPLOADPRESET!);
      formData.append("cloud_name", process.env.EXPO_PUBLIC_CLOUDINARY_CLOUDNAME!);

      const response = await fetch(
        `https://api.cloudinary.com/v1_1/${process.env.EXPO_PUBLIC_CLOUDINARY_CLOUDNAME}/image/upload`,
        {
          method: "POST",
          body: formData,
        }
      );

      if (!response.ok) {
        const errorText = await response.text();
        setError(`Upload failed: ${response.status} ${errorText}`);
        console.log(`Cloudinary: Upload failed: ${response.status} ${errorText}`);
        return null;
      }

      const data = await response.json();
      console.log("Cloudinary Image uploaded");
      return data.secure_url || null;
    } catch (err: any) {
      setError(`Network error: ${err.message}`);
      console.log(`Cloudibary Network error: ${err.message}`);
      return null;
    }
  };

  const postProduct = async () => {
    try {
      // Variables to hold user's info
      let fullName;
      let image;

      // Query user document
      const q = query(usersCollectionRef, where("uid", "==", userUid));
      const snapshot = await getDocs(q);

      // Get user's info
      snapshot.forEach((doc) => {
        const data = doc.data();
        fullName = `${data.surname} ${data.firstname}`;
        image = data.image;
      });

      // Upload image to cloudinary and get URL
      const uploadedImage = await generateImageUrl();
      console.log("Uploaded Image:", uploadedImage);

      // Add document
      const docRef = await addDoc(collection(db, "products"), {
        id: "",
        name: productNameRef.current.trim(),
        price: `₦${productPriceRef.current.trim()}`,
        description: productDescriptionRef.current.trim(),
        category: selectedProductCategory.trim(),
        photo: uploadedImage,
        postType: "product",
        postedBy: { userUid, fullName, image },
        createdAt: serverTimestamp(),
      });

      console.log("Firebase: product added successfully");

      // Update document with its own ID
      await updateDoc(doc(db, "products", docRef.id), { id: docRef.id });
    } catch (error: any) {
      setError(error.message);
      console.log("Firebase: ", error.message);
    }
  };
  const handlePostProduct = async () => {
    if (isProductFormValid()) {
      try {
        setIsLoading(true);
        await postProduct();
        console.log("Product posted!");
      } catch (error: any) {
        setError(error.message);
        console.log(error.message);
      } finally {
        setIsLoading(false);
      }
    }
  };

  if (isCameraOpen) {
    return <DeviceCamera setIsCameraOpen={setIsCameraOpen} />;
  }

  if (isLoading) {
    return <OverlayLoadingIndicator />;
  }

  return (
    <>
      {/* Photo Section */}
      <PhotoSection
        photoText={"Product Photo"}
        photo={photo}
        openCamera={() => setIsCameraOpen(true)}
      />

      {/* Form Section */}
      <View style={createPostStyles.formContainer}>
        <FormErrorText error={error} />
        <BottomSheetTextInput
          placeholder="Product Name"
          onChangeText={(text) => {
            productNameRef.current = text;
            if (error) setError("");
          }}
          style={createPostStyles.input}
          placeholderTextColor={COLORS.darkGrey}
        />

        <BottomSheetTextInput
          placeholder="Price"
          keyboardType="numeric"
          onChangeText={(text) => {
            productPriceRef.current = text;
            if (error) setError("");
          }}
          style={createPostStyles.input}
          placeholderTextColor={COLORS.darkGrey}
        />

        <BottomSheetTextInput
          placeholder="Description"
          onChangeText={(text) => {
            productDescriptionRef.current = text;
            if (error) setError("");
          }}
          style={createPostStyles.input}
          placeholderTextColor={COLORS.darkGrey}
        />

        <ProductCategoryPicker
          selectedCategory={selectedProductCategory}
          setSelectedCategory={setSelectedProductCategory}
        />
      </View>

      {/* Post Button Section */}
      <TouchableOpacity onPress={handlePostProduct}>
        <CustomButton text="Post" />
      </TouchableOpacity>
    </>
  );
};

export default PostProductForm;
