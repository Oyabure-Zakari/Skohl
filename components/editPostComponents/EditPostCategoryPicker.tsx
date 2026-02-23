import EventCategoryPicker from "@/components/bottomSheet/EventCategoryPicker";
import EventTypePicker from "@/components/bottomSheet/EventTypePicker";
import ProductCategoryPicker from "@/components/bottomSheet/ProductCategoryPicker";
import ServiceCategoryPicker from "@/components/bottomSheet/ServiceCategoryPicker";
import useEditPostStyles from "@/styles/editPost.styles";
import { Text } from "react-native";

type EditPostCategoryPickerProps = {
  postType: "event" | "service" | "product";
  category: string;
  eventType: string;
  selectedProductCategory: string;
  selectedServiceCategory: string;
  selectedEventCategory: string;
  selectedEventType: string;
  setSelectedProductCategory: React.Dispatch<React.SetStateAction<string>>;
  setSelectedServiceCategory: React.Dispatch<React.SetStateAction<string>>;
  setSelectedEventCategory: React.Dispatch<React.SetStateAction<string>>;
  setSelectedEventType: React.Dispatch<React.SetStateAction<string>>;
};

const EditPostCategoryPicker: React.FC<EditPostCategoryPickerProps> = ({
  postType,
  category,
  eventType,
  selectedProductCategory,
  selectedServiceCategory,
  selectedEventCategory,
  selectedEventType,
  setSelectedProductCategory,
  setSelectedServiceCategory,
  setSelectedEventCategory,
  setSelectedEventType,
}) => {
  const editPostStyles = useEditPostStyles();
  return (
    <>
      {postType === "product" && (
        <>
          <Text style={editPostStyles.inputName}>Product Category:</Text>
          <ProductCategoryPicker
            selectedCategory={selectedProductCategory}
            setSelectedCategory={setSelectedProductCategory}
            defaultValue={category}
          />
        </>
      )}

      {postType === "service" && (
        <>
          <Text style={editPostStyles.inputName}>Service Category:</Text>
          <ServiceCategoryPicker
            selectedCategory={selectedServiceCategory}
            setSelectedCategory={setSelectedServiceCategory}
            defaultValue={category}
          />
        </>
      )}

      {postType === "event" && (
        <>
          <Text style={editPostStyles.inputName}>Event Type:</Text>
          <EventTypePicker
            selectedEventType={selectedEventType}
            setSelectedEventType={setSelectedEventType}
            defaultValue={eventType}
          />

          <Text style={[editPostStyles.inputName, { marginTop: 15 }]}>Event Category:</Text>
          <EventCategoryPicker
            selectedCategory={selectedEventCategory}
            setSelectedCategory={setSelectedEventCategory}
            defaultValue={category}
          />
        </>
      )}
    </>
  );
};

export default EditPostCategoryPicker;
