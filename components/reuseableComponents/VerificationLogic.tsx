import VerificationLogicType from "@/types/VerificationLogicType";
import React from "react";
import VerificationStatusComponent from "./VerificationStatusComponent";

const VerificationLogic: React.FC<VerificationLogicType> = ({
  VerificationStatus,
  closeVerificationComponent,
  goToRegistrationScreen,
}) => {
  return (
    <>
      {VerificationStatus === "Successful" ? (
        <VerificationStatusComponent
          message={
            "Verification Successful\nyour details matched with\nthe university's portal!"
          }
          isSuccessful={true}
          goToRegistrationScreen={goToRegistrationScreen}
        />
      ) : (
        <VerificationStatusComponent
          message={
            "Verification Failed\nyour details didn't match with\nthe university's portal!"
          }
          isSuccessful={false}
          closeVerificationComponent={closeVerificationComponent}
        />
      )}
    </>
  );
};

export default VerificationLogic;
