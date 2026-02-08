import useHomeStyles from "@/styles/homeStyles";
import useReuseableStyles from "@/styles/reuable.styles";
import { EventCategoryType } from "@/types/EventCategoryType";
import { ProductCategoryType } from "@/types/ProductCategoryType";
import { ServiceCategoryType } from "@/types/ServiceCategoryType";
import React from "react";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";

type PostCategoryButtonsProps = {
  activePostCategory: ProductCategoryType | ServiceCategoryType | EventCategoryType;
  setActivePostCategory: React.Dispatch<
    React.SetStateAction<ProductCategoryType | ServiceCategoryType | EventCategoryType>
  >;
  postCategories: string[];
  screen: string;
};

const PostCategoryButtons: React.FC<PostCategoryButtonsProps> = ({
  activePostCategory,
  setActivePostCategory,
  postCategories,
  screen,
}) => {
  // Styles
  const reUseableStyles = useReuseableStyles();
  const homeStyles = useHomeStyles();

  return (
    <View style={homeStyles.categoryContainer}>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ gap: 6 }}
      >
        {/* Category Buttons */}
        {postCategories.map((category) => (
          <TouchableOpacity
            key={category}
            style={[
              activePostCategory === category
                ? reUseableStyles.activeButton
                : reUseableStyles.inactiveButton,
            ]}
            onPress={() => {
              switch (screen) {
                case "Home Screen":
                  setActivePostCategory(category as ProductCategoryType);
                  break;

                case "Service Screen":
                  setActivePostCategory(category as ServiceCategoryType);
                  break;

                case "Event Screen":
                  setActivePostCategory(category as EventCategoryType);
                  break;

                default:
                  setActivePostCategory("none");
                  break;
              }
            }}
          >
            <Text
              style={[
                activePostCategory === category
                  ? reUseableStyles.activeText
                  : reUseableStyles.inactiveText,
              ]}
            >
              {category === "none" ? "All" : category}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
};

export default PostCategoryButtons;
