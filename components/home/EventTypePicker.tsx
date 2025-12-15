import COLORS from "@/constants/colors";
import { Picker } from "@react-native-picker/picker";
import React from "react";
import { StyleSheet, View } from "react-native";

type Props = {
  selectedEventType: string;
  setSelectedEventType: (category: string) => void;
};

const EventTypePicker: React.FC<Props> = ({ selectedEventType, setSelectedEventType }) => {
  return (
    <View style={styles.pickerContainer}>
      <Picker
        style={styles.pickerStyles}
        selectedValue={selectedEventType}
        onValueChange={(itemValue, itemIndex) => setSelectedEventType(itemValue)}
      >
        <Picker.Item label="Event Type" value="none" enabled={false} />
        <Picker.Item label="🏛️ On-Campus Event" value="On-Campus Event" />
        <Picker.Item label="🚍 Off-Campus Event" value="Off-Campus Event" />
      </Picker>
    </View>
  );
};

const styles = StyleSheet.create({
  pickerContainer: {
    backgroundColor: COLORS.lightGrey,
    width: "90%",
    borderRadius: 10,
    alignItems: "center",
  },

  pickerStyles: {
    backgroundColor: COLORS.lightGrey,
    width: "95%",
    color: COLORS.darkGrey,
    fontFamily: "Segoe_UI_Bold",
    borderRadius: 10,
  },
});

export default EventTypePicker;
