import React from "react";
import VerificationStatusComponent from "./VerificationStatusComponent";

type VerificationLogicType = {
  VerificationStatus: string;
  closeOverlay: () => void;
};

const VerificationLogic: React.FC<VerificationLogicType> = ({
  VerificationStatus,
  closeOverlay,
}) => {
  return (
    <>
      {VerificationStatus === "Successful" ? (
        <VerificationStatusComponent
          message={
            "Verification Successful\nyour details matched with\nthe university's portal!"
          }
          isSuccessful={true}
          closeOverlay={closeOverlay}
        />
      ) : (
        <VerificationStatusComponent
          message={
            "Verification Failed\nyour details didn't match with\nthe university's portal!"
          }
          isSuccessful={false}
          closeOverlay={closeOverlay}
        />
      )}
    </>
  );
};

export default VerificationLogic;
