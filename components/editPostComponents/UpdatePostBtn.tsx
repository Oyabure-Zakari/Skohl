import React from "react";
import { TouchableOpacity } from "react-native";
import CustomButton from "../reuseableComponents/CustomButton";

type UpdatePostBtnProps = {
  handleUpdatePost: () => Promise<void>;
  isUpdatingPost: boolean;
};

const UpdatePostBtn: React.FC<UpdatePostBtnProps> = ({ handleUpdatePost, isUpdatingPost }) => {
  return (
    <TouchableOpacity onPress={handleUpdatePost} disabled={isUpdatingPost}>
      <CustomButton text={"Save Post"} isLoading={isUpdatingPost} />
    </TouchableOpacity>
  );
};

export default UpdatePostBtn;
