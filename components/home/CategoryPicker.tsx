import React from "react";
import EventCategoryPicker from "./EventCategoryPicker";
import EventTypePicker from "./EventTypePicker";
import ProductCategoryPicker from "./ProductCategoryPicker";
import ServiceCategoryPicker from "./ServiceCategoryPicker";

type Props = {
  postType: "Post a Product" | "Post a Service" | "Post an Event";
  selectedCategory: string;
  setSelectedCategory: (category: string) => void;
};

const CategoryPicker: React.FC<Props> = ({ postType, selectedCategory, setSelectedCategory }) => {
  return (
    <>
      {postType === "Post a Product" && (
        <ProductCategoryPicker
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
        />
      )}

      {postType === "Post a Service" && (
        <ServiceCategoryPicker
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
        />
      )}

      {postType === "Post an Event" && (
        <>
          <EventTypePicker
            selectedCategory={selectedCategory}
            setSelectedCategory={setSelectedCategory}
          />

          <EventCategoryPicker
            selectedCategory={selectedCategory}
            setSelectedCategory={setSelectedCategory}
          />
        </>
      )}
    </>
  );
};

export default CategoryPicker;
