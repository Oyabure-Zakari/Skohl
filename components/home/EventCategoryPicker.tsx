import COLORS from "@/constants/colors";
import { Picker } from "@react-native-picker/picker";
import React from "react";
import { StyleSheet, View } from "react-native";

type Props = {
  selectedCategory: string;
  setSelectedCategory: (category: string) => void;
};

const EventCategoryPicker: React.FC<Props> = ({ selectedCategory, setSelectedCategory }) => {
  return (
    <View style={styles.pickerContainer}>
      <Picker
        style={styles.pickerStyles}
        selectedValue={selectedCategory}
        onValueChange={(itemValue, itemIndex) => setSelectedCategory(itemValue)}
      >
        <Picker.Item label="Event Category" value="none" enabled={false} />
        <Picker.Item label="🎭 Arts & Culture" value="Arts & Culture" />
        <Picker.Item label="💼 Business & Entrepreneurship" value="Business & Entrepreneurship" />
        <Picker.Item label="🎤 Concerts & Music Shows" value="Concerts & Music Shows" />
        <Picker.Item
          label="🧠 Debates & Intellectual Forums"
          value="Debates & Intellectual Forums"
        />
        <Picker.Item
          label="🎓 Educational & Academic Events"
          value="Educational & Academic Events"
        />
        <Picker.Item
          label="🎉 Freshers’ & Orientation Events"
          value="Freshers’ & Orientation Events"
        />
        <Picker.Item label="🤝 General Meetups & Networking" value="General Meetups & Networking" />
        <Picker.Item label="🏥 Health & Wellness" value="Health & Wellness" />
        <Picker.Item label="💡 Innovation & Hackathons" value="Innovation & Hackathons" />
        <Picker.Item
          label="🤲 Justice, Advocacy & Awareness"
          value="Justice, Advocacy & Awareness"
        />
        <Picker.Item
          label="🎯 Knowledge Sharing & Workshops"
          value="Knowledge Sharing & Workshops"
        />
        <Picker.Item
          label="🏫 Leadership & Student Politics"
          value="Leadership & Student Politics"
        />
        <Picker.Item label="🌍 NGO & Community Outreach" value="NGO & Community Outreach" />
        <Picker.Item label="🎊 Parties & Social Events" value="Parties & Social Events" />
        <Picker.Item label="❓ Quizzes & Competitions" value="Quizzes & Competitions" />
        <Picker.Item label="📚 Research & Conferences" value="Research & Conferences" />
        <Picker.Item label="🕌 Religious Programs" value="Religious Programs" />
        <Picker.Item label="⚽ Sports & Games" value="Sports & Games" />
        <Picker.Item label="💻 Tech & Coding Events" value="Tech & Coding Events" />
        <Picker.Item label="🎒 Undergraduate-Focused Events" value="Undergraduate-Focused Events" />
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
