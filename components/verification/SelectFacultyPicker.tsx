import COLORS from "@/constants/colors";
import { Picker } from "@react-native-picker/picker";
import React from "react";

type SelectFacultyPickerProps = {
  selectedFaculty: string;
  setSelectedFaculty: React.Dispatch<React.SetStateAction<string>>;
};
const SelectFacultyPicker: React.FC<SelectFacultyPickerProps> = ({
  selectedFaculty,
  setSelectedFaculty,
}) => {
  return (
    <Picker
      style={{
        backgroundColor: COLORS.lightGrey,
        marginBottom: 30,
      }}
      selectedValue={selectedFaculty}
      onValueChange={(itemValue, itemIndex) => setSelectedFaculty(itemValue)}
    >
      <Picker.Item
        label="Select Faculty"
        value="none"
        style={{ color: COLORS.darkGrey }}
        enabled={false}
      />
      <Picker.Item
        label="Administration"
        value="Administration"
        style={{ color: COLORS.darkGrey }}
      />

      <Picker.Item
        label="Agriculture"
        value="Agriculture"
        style={{ color: COLORS.darkGrey }}
      />

      <Picker.Item
        label="Arts"
        value="Arts"
        style={{ color: COLORS.darkGrey }}
      />

      <Picker.Item
        label="Basic Clinical Sciences"
        value="Basic Clinical Sciences"
        style={{ color: COLORS.darkGrey }}
      />

      <Picker.Item
        label="Basic Medical Sciences"
        value="Basic Medical Sciences"
        style={{ color: COLORS.darkGrey }}
      />

      <Picker.Item
        label="Education"
        value="Education"
        style={{ color: COLORS.darkGrey }}
      />

      <Picker.Item
        label="Engineering"
        value="Engineering"
        style={{ color: COLORS.darkGrey }}
      />

      <Picker.Item
        label="Environmental Design"
        value="Environmental Design"
        style={{ color: COLORS.darkGrey }}
      />

      <Picker.Item label="Law" value="Law" style={{ color: COLORS.darkGrey }} />

      <Picker.Item
        label="Life Sciences"
        value="Life Sciences"
        style={{ color: COLORS.darkGrey }}
      />

      <Picker.Item
        label="Management Sciences"
        value="Management Sciences"
        style={{ color: COLORS.darkGrey }}
      />

      <Picker.Item
        label="Physical Sciences"
        value="Physical Sciences"
        style={{ color: COLORS.darkGrey }}
      />

      <Picker.Item
        label="Pharmacy"
        value="Pharmacy"
        style={{ color: COLORS.darkGrey }}
      />

      <Picker.Item
        label="Social Sciences"
        value="Social Sciences"
        style={{ color: COLORS.darkGrey }}
      />

      <Picker.Item
        label="Veterinary Medicine"
        value="Veterinary Medicine"
        style={{ color: COLORS.darkGrey }}
      />
    </Picker>
  );
};

export default SelectFacultyPicker;
