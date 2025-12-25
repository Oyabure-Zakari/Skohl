import COLORS from "@/constants/colors";
import SelectFacultyPickerProps from "@/types/SelectFacultyPickerProps";
import { Picker } from "@react-native-picker/picker";
import React from "react";
import { View } from "react-native";

const SelectFacultyPicker: React.FC<SelectFacultyPickerProps> = ({
  selectedFaculty,
  setSelectedFaculty,
}) => {
  return (
    <View style={{ borderRadius: 10, overflow: "hidden" }}>
      <Picker
        style={{
          backgroundColor: COLORS.lightGrey,
          paddingHorizontal: 20,
          fontFamily: "Segoe_UI_Bold",
        }}
        selectedValue={selectedFaculty}
        onValueChange={(itemValue, itemIndex) => setSelectedFaculty(itemValue)}
      >
        <Picker.Item
          label="Select Faculty"
          value="none"
          style={{ color: COLORS.darkGrey, fontFamily: "Segoe_UI_Bold" }}
          enabled={false}
        />
        <Picker.Item
          label="Administration"
          value="Administration"
          style={{ color: COLORS.darkGrey, fontFamily: "Segoe_UI_Bold" }}
        />

        <Picker.Item
          label="Agriculture"
          value="Agriculture"
          style={{ color: COLORS.darkGrey, fontFamily: "Segoe_UI_Bold" }}
        />

        <Picker.Item
          label="Arts"
          value="Arts"
          style={{ color: COLORS.darkGrey, fontFamily: "Segoe_UI_Bold" }}
        />

        <Picker.Item
          label="Basic Clinical Sciences"
          value="Basic Clinical Sciences"
          style={{ color: COLORS.darkGrey, fontFamily: "Segoe_UI_Bold" }}
        />

        <Picker.Item
          label="Basic Medical Sciences"
          value="Basic Medical Sciences"
          style={{ color: COLORS.darkGrey, fontFamily: "Segoe_UI_Bold" }}
        />

        <Picker.Item
          label="Education"
          value="Education"
          style={{ color: COLORS.darkGrey, fontFamily: "Segoe_UI_Bold" }}
        />

        <Picker.Item
          label="Engineering"
          value="Engineering"
          style={{ color: COLORS.darkGrey, fontFamily: "Segoe_UI_Bold" }}
        />

        <Picker.Item
          label="Environmental Design"
          value="Environmental Design"
          style={{ color: COLORS.darkGrey, fontFamily: "Segoe_UI_Bold" }}
        />

        <Picker.Item
          label="Law"
          value="Law"
          style={{ color: COLORS.darkGrey, fontFamily: "Segoe_UI_Bold" }}
        />

        <Picker.Item
          label="Life Sciences"
          value="Life Sciences"
          style={{ color: COLORS.darkGrey, fontFamily: "Segoe_UI_Bold" }}
        />

        <Picker.Item
          label="Management Sciences"
          value="Management Sciences"
          style={{ color: COLORS.darkGrey, fontFamily: "Segoe_UI_Bold" }}
        />

        <Picker.Item
          label="Physical Sciences"
          value="Physical Sciences"
          style={{ color: COLORS.darkGrey, fontFamily: "Segoe_UI_Bold" }}
        />

        <Picker.Item
          label="Pharmacy"
          value="Pharmacy"
          style={{ color: COLORS.darkGrey, fontFamily: "Segoe_UI_Bold" }}
        />

        <Picker.Item
          label="Social Sciences"
          value="Social Sciences"
          style={{ color: COLORS.darkGrey, fontFamily: "Segoe_UI_Bold" }}
        />

        <Picker.Item
          label="Veterinary Medicine"
          value="Veterinary Medicine"
          style={{ color: COLORS.darkGrey, fontFamily: "Segoe_UI_Bold" }}
        />
      </Picker>
    </View>
  );
};

export default SelectFacultyPicker;
