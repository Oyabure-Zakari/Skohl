import COLORS from "@/constants/colors";
import { Picker } from "@react-native-picker/picker";
import React from "react";
import { StyleSheet, View } from "react-native";

type Props = {
  selectedCategory: string;
  setSelectedCategory: (category: string) => void;
};

const ServiceCategoryPicker: React.FC<Props> = ({ selectedCategory, setSelectedCategory }) => {
  return (
    <View style={styles.pickerContainer}>
      <Picker
        style={styles.pickerStyles}
        selectedValue={selectedCategory}
        onValueChange={(itemValue, itemIndex) => setSelectedCategory(itemValue)}
      >
        <Picker.Item label="Service Category" value="none" enabled={false} />
        <Picker.Item label="📚 Academic & Educational" value="Academic & Educational" />
        <Picker.Item
          label="📢 Advertising & Business Services"
          value="Advertising & Business Services"
        />
        <Picker.Item label="💄 Beauty & Fashion" value="Beauty & Fashion" />
        <Picker.Item label="🎨 Creative & Media" value="Creative & Media" />
        <Picker.Item label="🎉 Events & Catering" value="Events & Catering" />
        <Picker.Item label="🛍️ Errands & Daily Services" value="Errands & Daily Services" />
        <Picker.Item label="🏋️ Lifestyle & Wellness" value="Lifestyle & Wellness" />
        <Picker.Item label="🔧 Repairs & Maintenance" value="Repairs & Maintenance" />
        <Picker.Item label="💻 Tech & Digital Services" value="Tech & Digital Services" />
        <Picker.Item label="🚗 Transportation & Logistics" value="Transportation & Logistics" />
        <Picker.Item label="🧾 Virtual & Freelance Services" value="Virtual & Freelance Services" />
      </Picker>
    </View>
  );
};

const styles = StyleSheet.create({
  pickerStyles: {
    backgroundColor: COLORS.lightGrey,
    width: "95%",
    color: COLORS.darkGrey,
    fontFamily: "Segoe_UI_Bold",
    borderRadius: 10,
  },

  pickerContainer: {
    backgroundColor: COLORS.lightGrey,
    width: "90%",
    borderRadius: 10,
    alignItems: "center",
  },
});

export default ServiceCategoryPicker;
