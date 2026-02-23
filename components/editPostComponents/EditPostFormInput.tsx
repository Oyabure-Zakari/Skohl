import { Post } from "@/types/PostTypes";
import React from "react";
import { TextInput } from "react-native";
import InputFieldAndTitle from "./InputFieldAndTitle";

type EditPostFormInputProps = {
  postDetails: Post;
  inputRef: React.RefObject<TextInput | null>;
  titleRef: React.RefObject<string>;
  priceRef: React.RefObject<string>;
  serviceScheduleRef: React.RefObject<string>;
  eventVenueRef: React.RefObject<string>;
  eventTimeRef: React.RefObject<string>;
  eventDateRef: React.RefObject<string>;
  descriptionRef: React.RefObject<string>;
};

const EditPostFormInput: React.FC<EditPostFormInputProps> = ({
  postDetails,
  inputRef,
  titleRef,
  priceRef,
  serviceScheduleRef,
  eventVenueRef,
  eventTimeRef,
  eventDateRef,
  descriptionRef,
}) => {
  return (
    <>
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
    </>
  );
};

export default EditPostFormInput;
