const isServiceFormValid = (
  jobTitleRef: React.RefObject<string>,
  servicePriceRef: React.RefObject<string>,
  serviceScheduleRef: React.RefObject<string>,
  serviceDescriptionRef: React.RefObject<string>,
  selectedServiceCategory: string
) => {
  if (
    !jobTitleRef.current.trim() ||
    !servicePriceRef.current.trim() ||
    !serviceScheduleRef.current.trim() ||
    !serviceDescriptionRef.current.trim() ||
    !selectedServiceCategory
  ) {
    throw new Error("All fields are required");
  }

  return true;
};

export default isServiceFormValid;
