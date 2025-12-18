import COLORS from "@/constants/colors";
import { Picker } from "@react-native-picker/picker";
import React from "react";
import { StyleSheet, View } from "react-native";

type Props = {
  selectedCategory: string;
  setSelectedCategory: (category: string) => void;
};

const ProductCategoryPicker: React.FC<Props> = ({ selectedCategory, setSelectedCategory }) => {
  return (
    <View style={styles.pickerContainer}>
      <Picker
        style={styles.pickerStyles}
        selectedValue={selectedCategory}
        onValueChange={(itemValue, itemIndex) => setSelectedCategory(itemValue)}
      >
        <Picker.Item label="Product Category" value="none" enabled={false} />
        <Picker.Item label="📚 Books & Academic Materials" value="Books & Academic Materials" />
        <Picker.Item label="💻 Electronics & Gadgets" value="Electronics & Gadgets" />
        <Picker.Item label="🧰 Equipments" value="Equipments" />
        <Picker.Item label="👕 Fashion & Clothing" value="Fashion & Clothing" />
        <Picker.Item label="🪑 Hostel & Room Essentials" value="Hostel & Room Essentials" />
        <Picker.Item label="🍳 Kitchen & Food Items" value="Kitchen & Food Items" />
        <Picker.Item label="🧴 Personal Care & Beauty" value="Personal Care & Beauty" />
        <Picker.Item label="🏃‍♂️ Sportswear" value="Sportswear" />
        <Picker.Item label="✏️ Stationery & Office Supplies" value="Stationery & Office Supplies" />
        <Picker.Item label="🚲 Transportation & Mobility" value="Transportation & Mobility" />
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

export default ProductCategoryPicker;
