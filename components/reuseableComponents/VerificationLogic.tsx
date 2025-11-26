import React from "react";
import VerificationStatusComponent from "./VerificationStatusComponent";

type VerificationLogicType = {
  VerificationStatus: string;
  closeVerificationComponent: () => void;
};

const VerificationLogic: React.FC<VerificationLogicType> = ({
  VerificationStatus,
  closeVerificationComponent,
}) => {
  return (
    <>
      {VerificationStatus === "Successful" ? (
        <VerificationStatusComponent
          message={
            "Verification Successful\nyour details matched with\nthe university's portal!"
          }
          isSuccessful={true}
          closeVerificationComponent={closeVerificationComponent}
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
