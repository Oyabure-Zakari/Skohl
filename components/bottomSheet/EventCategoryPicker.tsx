import COLORS from "@/constants/colors";
import { Picker } from "@react-native-picker/picker";
import React from "react";
import { StyleSheet, View } from "react-native";

type Props = {
  selectedCategory: string;
  setSelectedCategory: (category: string) => void;
  defaultValue?: string;
};

const EventCategoryPicker: React.FC<Props> = ({
  selectedCategory,
  setSelectedCategory,
  defaultValue,
}) => {
  return (
    <View style={styles.pickerContainer}>
      <Picker
        style={styles.pickerStyles}
        selectedValue={selectedCategory}
        onValueChange={(itemValue, itemIndex) => setSelectedCategory(itemValue)}
      >
        <Picker.Item
          label={defaultValue ? defaultValue : "Event Category"}
          value="none"
          enabled={false}
          style={{ fontFamily: "Segoe_UI_Bold" }}
        />
        <Picker.Item
          label="🎭 Arts & Culture"
          value="Arts & Culture"
          style={{ fontFamily: "Segoe_UI_Bold" }}
        />
        <Picker.Item
          label="💼 Business & Entrepreneurship"
          value="Business & Entrepreneurship"
          style={{ fontFamily: "Segoe_UI_Bold" }}
        />
        <Picker.Item
          label="🎤 Concerts & Music Shows"
          value="Concerts & Music Shows"
          style={{ fontFamily: "Segoe_UI_Bold" }}
        />
        <Picker.Item
          label="🧠 Debates & Intellectual Forums"
          value="Debates & Intellectual Forums"
          style={{ fontFamily: "Segoe_UI_Bold" }}
        />
        <Picker.Item
          label="🎓 Educational & Academic Events"
          value="Educational & Academic Events"
          style={{ fontFamily: "Segoe_UI_Bold" }}
        />
        <Picker.Item
          label="🎉 Freshers’ & Orientation Events"
          value="Freshers’ & Orientation Events"
          style={{ fontFamily: "Segoe_UI_Bold" }}
        />
        <Picker.Item
          label="🤝 General Meetups & Networking"
          value="General Meetups & Networking"
          style={{ fontFamily: "Segoe_UI_Bold" }}
        />
        <Picker.Item
          label="🏥 Health & Wellness"
          value="Health & Wellness"
          style={{ fontFamily: "Segoe_UI_Bold" }}
        />
        <Picker.Item
          label="💡 Innovation & Hackathons"
          value="Innovation & Hackathons"
          style={{ fontFamily: "Segoe_UI_Bold" }}
        />
        <Picker.Item
          label="🤲 Justice, Advocacy & Awareness"
          value="Justice, Advocacy & Awareness"
          style={{ fontFamily: "Segoe_UI_Bold" }}
        />
        <Picker.Item
          label="🎯 Knowledge Sharing & Workshops"
          value="Knowledge Sharing & Workshops"
          style={{ fontFamily: "Segoe_UI_Bold" }}
        />
        <Picker.Item
          label="🏫 Leadership & Student Politics"
          value="Leadership & Student Politics"
          style={{ fontFamily: "Segoe_UI_Bold" }}
        />
        <Picker.Item
          label="🌍 NGO & Community Outreach"
          value="NGO & Community Outreach"
          style={{ fontFamily: "Segoe_UI_Bold" }}
        />
        <Picker.Item
          label="🎊 Parties & Social Events"
          value="Parties & Social Events"
          style={{ fontFamily: "Segoe_UI_Bold" }}
        />
        <Picker.Item
          label="❓ Quizzes & Competitions"
          value="Quizzes & Competitions"
          style={{ fontFamily: "Segoe_UI_Bold" }}
        />
        <Picker.Item
          label="📚 Research & Conferences"
          value="Research & Conferences"
          style={{ fontFamily: "Segoe_UI_Bold" }}
        />
        <Picker.Item
          label="🕌 Religious Programs"
          value="Religious Programs"
          style={{ fontFamily: "Segoe_UI_Bold" }}
        />
        <Picker.Item
          label="⚽ Sports & Games"
          value="Sports & Games"
          style={{ fontFamily: "Segoe_UI_Bold" }}
        />
        <Picker.Item
          label="💻 Tech & Coding Events"
          value="Tech & Coding Events"
          style={{ fontFamily: "Segoe_UI_Bold" }}
        />
        <Picker.Item
          label="🎒 Undergraduate-Focused Events"
          value="Undergraduate-Focused Events"
          style={{ fontFamily: "Segoe_UI_Bold" }}
        />
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

export default EventCategoryPicker;
