import useEditPostStyles from "@/styles/editPost.styles";
import { Post } from "@/types/PostTypes";
import React, { useRef, useState } from "react";
import { Text, TextInput, View } from "react-native";
import EventCategoryPicker from "../bottomSheet/EventCategoryPicker";
import EventTypePicker from "../bottomSheet/EventTypePicker";
import ProductCategoryPicker from "../bottomSheet/ProductCategoryPicker";
import ServiceCategoryPicker from "../bottomSheet/ServiceCategoryPicker";
import InputFieldAndTitle from "./InputFieldAndTitle";

type EditPostFormProps = {
  postDetails: Post;
};

const EditPostForm: React.FC<EditPostFormProps> = ({ postDetails }) => {
  // Ref
  const inputRef = useRef<TextInput>(null);
  const titleRef = useRef("");
  const priceRef = useRef("");
  const serviceScheduleRef = useRef("");
  const eventVenueRef = useRef("");
  const eventTimeRef = useRef("");
  const eventDateRef = useRef("");
  const descriptionRef = useRef("");

  // States
  const [selectedProductCategory, setSelectedProductCategory] = useState("");
  const [selectedServiceCategory, setSelectedServiceCategory] = useState("");
  const [selectedEventType, setSelectedEventType] = useState("");
  const [selectedEventCategory, setSelectedEventCategory] = useState("");

  const editPostStyles = useEditPostStyles();
  return (
    <View style={editPostStyles.formContainer}>
      <InputFieldAndTitle
        title={"Title:"}
        ref={inputRef}
        defaultValue={postDetails?.title}
        onChangeText={(text: string) => (titleRef.current = text).trim()}
      />

      {postDetails?.postType !== "event" && (
        <InputFieldAndTitle
          title={"Price:"}
          ref={inputRef}
          defaultValue={postDetails?.price?.slice(1)}
          onChangeText={(text) => (priceRef.current = text).trim()}
          keyboardType={"numeric"}
        />
      )}

      {postDetails?.postType === "service" && (
        <InputFieldAndTitle
          title={"Schedule:"}
          ref={inputRef}
          defaultValue={postDetails?.serviceSchedule}
          onChangeText={(text) => (serviceScheduleRef.current = text).trim()}
        />
      )}

      {postDetails?.postType === "event" && (
        <>
          <InputFieldAndTitle
            title={"Venue:"}
            ref={inputRef}
            defaultValue={postDetails?.eventVenue}
            onChangeText={(text) => (eventVenueRef.current = text).trim()}
          />

          <InputFieldAndTitle
            title={"Time:"}
            ref={inputRef}
            defaultValue={postDetails?.eventTime}
            onChangeText={(text) => (eventTimeRef.current = text).trim()}
          />

          <InputFieldAndTitle
            title={"Date:"}
            ref={inputRef}
            defaultValue={postDetails?.eventDate}
            onChangeText={(text) => (eventDateRef.current = text).trim()}
          />
        </>
      )}

      <InputFieldAndTitle
        title={"Description:"}
        ref={inputRef}
        defaultValue={postDetails?.description}
        onChangeText={(text) => (descriptionRef.current = text).trim()}
        multiline={true}
      />

      {postDetails?.postType === "product" && (
        <>
          <Text style={editPostStyles.inputName}>Product Category:</Text>
          <ProductCategoryPicker
            selectedCategory={selectedProductCategory}
            setSelectedCategory={setSelectedProductCategory}
            defaultValue={postDetails?.category}
          />
        </>
      )}

      {postDetails?.postType === "service" && (
        <>
          <Text style={editPostStyles.inputName}>Service Category:</Text>
          <ServiceCategoryPicker
            selectedCategory={selectedServiceCategory}
            setSelectedCategory={setSelectedServiceCategory}
            defaultValue={postDetails?.category}
          />
        </>
      )}

      {postDetails?.postType === "event" && (
        <>
          <Text style={editPostStyles.inputName}>Event Type:</Text>
          <EventTypePicker
            selectedEventType={selectedEventType}
            setSelectedEventType={setSelectedEventType}
            defaultValue={postDetails?.eventType}
          />

          <Text style={[editPostStyles.inputName, { marginTop: 15 }]}>Event Category:</Text>
          <EventCategoryPicker
            selectedCategory={selectedEventCategory}
            setSelectedCategory={setSelectedEventCategory}
            defaultValue={postDetails?.category}
          />
        </>
      )}
    </View>
  );
};

export default EditPostForm;
