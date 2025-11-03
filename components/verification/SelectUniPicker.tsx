import COLORS from "@/constants/colors";
import { Picker } from "@react-native-picker/picker";
import React from "react";

type SelectUniPickerProps = {
  selectedUniversity: string;
  setSelectedUniversity: React.Dispatch<React.SetStateAction<string>>;
};
const SelectUniPicker: React.FC<SelectUniPickerProps> = ({
  selectedUniversity,
  setSelectedUniversity,
}) => {
  return (
    <Picker
      style={{
        backgroundColor: COLORS.lightGrey,
        marginBottom: 30,
      }}
      selectedValue={selectedUniversity}
      onValueChange={(itemValue, itemIndex) => setSelectedUniversity(itemValue)}
    >
      <Picker.Item
        label="Select University"
        value="none"
        style={{ color: COLORS.darkGrey }}
        enabled={false}
      />
      <Picker.Item
        label="Ahmadu Bello University"
        value="ABU"
        style={{ color: COLORS.darkGrey }}
      />
    </Picker>
  );
};

export default SelectUniPicker;
