const iseventFormValid = (
  eventTopicRef: React.RefObject<string>,
  eventVenueRef: React.RefObject<string>,
  timeRef: React.RefObject<string>,
  dateRef: React.RefObject<string>,
  eventDescriptionRef: React.RefObject<string>,
  selectedEventType: string,
  selectedEventCategory: string
) => {
  if (
    !eventTopicRef.current.trim() ||
    !eventVenueRef.current.trim() ||
    !timeRef.current.trim() ||
    !dateRef.current.trim() ||
    !eventDescriptionRef.current.trim() ||
    !selectedEventType.trim() ||
    !selectedEventCategory.trim()
  ) {
    throw new Error("All fields are required");
  }

  return true;
};

export default iseventFormValid;
