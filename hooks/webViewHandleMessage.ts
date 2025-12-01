import doDetailsMatch from "@/utils/doDetailsMatch";
import studentData from "@/utils/webViewUtils/studentData";
import { useCallback, useState } from "react";
import { WebViewMessageEvent } from "react-native-webview";

type UseWebViewHandleMessageProps = {
  firstname: string;
  surname: string;
  selectedFaculty: string;
  setError: (value: string) => void;
  setIsWebViewOpen: (value: boolean) => void;
  setVerificationStatus: (value: string) => void;
};

type StudentProfileType = {
  profileFirstname: string;
  profileSurname: string;
  profileReligion: string;
  profileGender: string;
  profileFaculty: string;
}

const useWebViewHandleMessage = ({
  firstname,
  surname,
  selectedFaculty,
  setError,
  setIsWebViewOpen,
  setVerificationStatus,
}: UseWebViewHandleMessageProps) => {
  // Holds the successfully verified student profile data (from webview)
  const [studentProfile, setStudentProfile] = useState<StudentProfileType>()
  
  // Handles messages sent from WebView (via postMessage)
  const handleWebViewMessage = useCallback(
    (event: WebViewMessageEvent) => {
      try {
        const msg = JSON.parse(event.nativeEvent.data);

        // Only process messages of type "FORM_DATA" with valid payload
        if (
          msg.type === "FORM_DATA" &&
          msg.payload &&
          Object.keys(msg.payload).length > 0
        ) {
          setIsWebViewOpen(false);

          // Extract and format student data from the portal
          const {
            studentFirstname,
            studentSurname,
            studentFaculty,
          } = studentData(msg.payload);

          // Compare user-entered values with data scraped from student portal
          const isFirstname = doDetailsMatch(firstname, studentFirstname);
          const isSurname = doDetailsMatch(surname, studentSurname);
          const isFaculty = doDetailsMatch(selectedFaculty, studentFaculty);

          // If all three core details match → verification successful
          if (isFirstname && isSurname && isFaculty) {
            // Save full profile data from the portal 
            const data = {
              profileFirstname: msg.payload.firstname,
              profileSurname: msg.payload.surname,
              profileFaculty: msg.payload.faculty,
              profileReligion: msg.payload.religion,
              profileGender: msg.payload.gender,
            }
            // Store verified profile
            setStudentProfile({...data})
            setVerificationStatus("Successful");
          } else {
            setVerificationStatus("Failed");
          }
        }
      } catch (error: any) {
        setError(error.message || "Verification failed");
      }
    },
    // Dependencies: re-create handler only if these values change
    [firstname, surname,  selectedFaculty, setError, setIsWebViewOpen, setVerificationStatus]
  );

  return {studentProfile, handleWebViewMessage };
};

export default useWebViewHandleMessage;