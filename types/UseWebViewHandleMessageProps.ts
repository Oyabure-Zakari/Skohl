import { RefObject } from "react";
import { TextInput } from "react-native";

type UseWebViewHandleMessageProps = {
  firstnameInputRef: RefObject<string>;
  surnameInputRef: RefObject<string>;
  textInputRef: React.RefObject<TextInput | null>;
  selectedFaculty: string;
  setError: (value: string) => void;
  setIsWebViewOpen: (value: boolean) => void;
  setVerificationStatus: (value: string) => void;
};

export default UseWebViewHandleMessageProps;