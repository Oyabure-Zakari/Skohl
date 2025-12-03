import useVerificationStore from "@/store/verificatonStore";
import UseWebViewHandleMessageProps from "@/types/UseWebViewHandleMessageProps";
import doDetailsMatch from "@/utils/doDetailsMatch";
import { WebViewMessageEvent } from "react-native-webview";

const useWebViewHandleMessage = ({
  firstnameInputRef,
  surnameInputRef,
  selectedFaculty,
  setError,
  setIsWebViewOpen,
  setVerificationStatus,
}: UseWebViewHandleMessageProps) => {
  // Hook created in zustand to get
  const getVerificationToken = useVerificationStore(
    (state) => state.getVerificationToken
  );

  // Handles messages sent from WebView (via postMessage)
  const handleWebViewMessage = (event: WebViewMessageEvent) => {
    try {
      const msg = JSON.parse(event.nativeEvent.data);

      // Only process messages of type "FORM_DATA" with valid payload
      if (
        msg.type === "FORM_DATA" &&
        msg.payload &&
        Object.keys(msg.payload).length > 0
      ) {
        setIsWebViewOpen(false);

        // Extract student data from the portal
        const studentFirstname = msg.payload.firstname;
        const studentSurname = msg.payload.surname;
        const studentFaculty = msg.payload.faculty;

        // Compare user-entered values with data scraped from student portal
        const isFirstname = doDetailsMatch(firstnameInputRef.current, studentFirstname);
        const isSurname = doDetailsMatch(surnameInputRef.current, studentSurname);
        const isFaculty = doDetailsMatch(selectedFaculty, studentFaculty);

        // If all three core details match → verification successful
        if (isFirstname && isSurname && isFaculty) {
          getVerificationToken(msg.payload); // Use zustand to generate verification token
          setVerificationStatus("Successful");
        } else {
          setVerificationStatus("Failed");
        }
      }
    } catch (error: any) {
      setError(error.message || "Verification failed");
    }
  };

  return { handleWebViewMessage };
};

export default useWebViewHandleMessage;
