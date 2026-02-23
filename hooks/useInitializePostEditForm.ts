import { Post } from "@/types/PostTypes";
import { useEffect } from "react";

type UseInitializePostEditFormProps = {
  postDetails: Post;
  titleRef: React.RefObject<string | undefined>;
  descriptionRef: React.RefObject<string | undefined>;
  priceRef: React.RefObject<string | undefined>;
  serviceScheduleRef: React.RefObject<string | undefined>;
  eventVenueRef: React.RefObject<string | undefined>;
  eventTimeRef: React.RefObject<string | undefined>;
  eventDateRef: React.RefObject<string | undefined>;
  setSelectedEventType: (type: string) => void;
  setSelectedProductCategory: (category: string) => void;
  setSelectedServiceCategory: (category: string) => void;
  setSelectedEventCategory: (category: string) => void;
};

export default function useInitializePostEditForm({
  postDetails,
  titleRef,
  descriptionRef,
  priceRef,
  serviceScheduleRef,
  eventVenueRef,
  eventTimeRef,
  eventDateRef,
  setSelectedEventType,
  setSelectedProductCategory,
  setSelectedServiceCategory,
  setSelectedEventCategory,
}: UseInitializePostEditFormProps) {
  useEffect(() => {
    if (postDetails) {
      titleRef.current = postDetails?.title;
      descriptionRef.current = postDetails?.description;

      // Strip the ₦ symbol — price is stored with it in Firestore but edited without it in the input
      if (postDetails?.postType !== "event")
        priceRef.current = postDetails?.price?.slice(1) as string;

      if (postDetails?.postType === "service")
        serviceScheduleRef.current = postDetails?.serviceSchedule as string;

      if (postDetails?.postType === "event") {
        eventVenueRef.current = postDetails?.eventVenue as string;
        eventTimeRef.current = postDetails?.eventTime as string;
        eventDateRef.current = postDetails?.eventDate as string;
        setSelectedEventType(postDetails?.eventType as string);
      }

      setSelectedProductCategory(postDetails?.category);
      setSelectedServiceCategory(postDetails?.category);
      setSelectedEventCategory(postDetails?.category);
    }
  }, [
    postDetails,
    titleRef,
    descriptionRef,
    priceRef,
    serviceScheduleRef,
    eventVenueRef,
    eventTimeRef,
    eventDateRef,
    setSelectedEventType,
    setSelectedProductCategory,
    setSelectedServiceCategory,
    setSelectedEventCategory,
  ]);
}
