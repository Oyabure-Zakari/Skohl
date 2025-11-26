import doDetailsMatch from "@/utils/doDetailsMatch";
import studentData from "@/utils/webViewUtils/studentData";
import { useCallback, useState } from "react";
import { WebViewMessageEvent } from "react-native-webview";

type UseWebViewHandleMessageProps = {
  firstname: string;
  surname: string;
  faculty: string;
  setError: (value: string) => void;
  setShowWebView: (value: boolean) => void;
  setVerificationStatus: (value: string) => void;
};

type StudentProfileType = {
  profileFirstname: string;
  profileSurname: string;
  profileFaculty: string;
  profileReligion: string;
  profileGender: string;
  profileUniversity: string;
  profileImage: string;
}

const useWebViewHandleMessage = ({
  firstname,
  surname,
  faculty,
  setError,
  setShowWebView,
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
          setShowWebView(false);

          // Extract and format student data from the portal
          const {
            studentFirstname,
            studentSurname,
            studentFaculty,
          } = studentData(msg.payload);

          // Compare user-entered values with data scraped from student portal
          const isFirstname = doDetailsMatch(firstname, studentFirstname);
          const isSurname = doDetailsMatch(surname, studentSurname);
          const isFaculty = doDetailsMatch(faculty, studentFaculty);

          // If all three core details match → verification successful
          if (isFirstname && isSurname && isFaculty) {
            // Save full profile data from the portal 
            const data = {
              profileFirstname: msg.payload.firstname,
              profileSurname: msg.payload.surname,
              profileFaculty: msg.payload.faculty,
              profileReligion: msg.payload.religion,
              profileGender: msg.payload.gender,
              profileUniversity: "",
              profileImage: ""
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
    [firstname, surname, faculty, setError, setShowWebView, setVerificationStatus]
  );

  return {studentProfile, handleWebViewMessage };
};

export default useWebViewHandleMessage;