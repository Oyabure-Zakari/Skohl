import CustomButton from "@/components/reuseableComponents/CustomButton";
import COLORS from "@/constants/colors";
import { BottomSheetTextInput } from "@gorhom/bottom-sheet";
import React, { useRef, useState } from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import ProductCategoryPicker from "../ProductCategoryPicker";

type PostProductFormProps = {
  photo: string;
};

const PostProductForm: React.FC<PostProductFormProps> = ({ photo }) => {
  // Refs for form values
  const productNameRef = useRef("");
  const productPriceRef = useRef("");
  const productDescriptionRef = useRef("");
  // State
  const [error, setError] = useState("");
  const [selectedProductCategory, setSelectedProductCategory] = useState("");

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

  const handlePostProduct = () => {
    if (isProductFormValid()) {
      console.log("Product posted!");
      // After posting either failed or successful, reset, photo, and form fields
    }
  };

  return (
    <>
      <View style={styles.formContainer}>
        <BottomSheetTextInput
          placeholder="Post Name"
          onChangeText={(text) => {
            productNameRef.current = text;
            if (error) setError("");
          }}
          style={styles.input}
          placeholderTextColor={COLORS.darkGrey}
        />
        <BottomSheetTextInput
          placeholder="Price"
          keyboardType="numeric"
          onChangeText={(text) => {
            productPriceRef.current = text;
            if (error) setError("");
          }}
          style={styles.input}
          placeholderTextColor={COLORS.darkGrey}
        />
        <BottomSheetTextInput
          placeholder="Description"
          onChangeText={(text) => {
            productDescriptionRef.current = text;
            if (error) setError("");
          }}
          style={styles.input}
          placeholderTextColor={COLORS.darkGrey}
        />
        <ProductCategoryPicker
          selectedCategory={selectedProductCategory}
          setSelectedCategory={setSelectedProductCategory}
        />
      </View>

      <TouchableOpacity onPress={handlePostProduct}>
        <CustomButton text="Post" />
      </TouchableOpacity>
    </>
  );
};

export default PostProductForm;

const styles = StyleSheet.create({
  formContainer: {
    marginBottom: 20,
    width: "100%",
    alignItems: "center",
    gap: 15,
  },

  input: {
    width: "90%",
    backgroundColor: COLORS.lightGrey,
    borderRadius: 10,
    paddingHorizontal: 16,
    paddingVertical: 12,
    color: COLORS.darkGrey,
    fontFamily: "Segoe_UI_Bold",
    minHeight: 48,
  },
});
