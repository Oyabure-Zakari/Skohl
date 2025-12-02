// Checks is the input value matches the extracted value
const doDetailsMatch = (inputValue:string, extractedValue:string ): boolean => {
  return (
    inputValue.trim().toLowerCase() === extractedValue.trim().toLowerCase()
  );
};

export default doDetailsMatch;
