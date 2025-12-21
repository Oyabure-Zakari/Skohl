import { RefObject } from "react";

type UseWebViewHandleMessageProps = {
  firstnameInputRef: RefObject<string>;
  surnameInputRef: RefObject<string>;
  textInputRef: RefObject<any>;
  selectedFaculty: string;
  setError: (value: string) => void;
  setIsWebViewOpen: (value: boolean) => void;
  setVerificationStatus: (value: string) => void;
};

export default UseWebViewHandleMessageProps;