import useReuseableStyles from "@/styles/reuable.styles";
import { ProductCategoryType } from "@/types/ProductCategoryType";
import React from "react";
import { ScrollView, Text, TouchableOpacity } from "react-native";

type ProductCategoryButtonsProps = {
  activeProductCategory: ProductCategoryType;
  setActiveProductCategory: React.Dispatch<React.SetStateAction<ProductCategoryType>>;
  productCategories: string[];
};

const ProductCategoryButtons: React.FC<ProductCategoryButtonsProps> = ({
  activeProductCategory,
  setActiveProductCategory,
  productCategories,
}) => {
  // Styles
  const reUseableStyles = useReuseableStyles();

  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={{ gap: 6 }}
    >
      {/* Category Buttons */}
      {productCategories.map((category) => (
        <TouchableOpacity
          key={category}
          style={[
            activeProductCategory === category
              ? reUseableStyles.activeButton
              : reUseableStyles.inactiveButton,
          ]}
          onPress={() => setActiveProductCategory(category as ProductCategoryType)}
        >
          <Text
            style={[
              activeProductCategory === category
                ? reUseableStyles.activeText
                : reUseableStyles.inactiveText,
            ]}
          >
            {category === "none" ? "All" : category}
          </Text>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
};

export default ProductCategoryButtons;
