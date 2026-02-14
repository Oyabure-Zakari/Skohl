import COLORS from "@/constants/colors";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import React from "react";
import { TouchableOpacity } from "react-native";

type BookmarkBtnProps = {
  handleBookmark: () => void;
  isBookmarked: boolean;
};

const BookmarkBtn: React.FC<BookmarkBtnProps> = ({ handleBookmark, isBookmarked }) => {
  return (
    <TouchableOpacity onPress={handleBookmark}>
      <MaterialCommunityIcons
        name={isBookmarked ? "bookmark" : "bookmark-outline"}
        size={22}
        color={COLORS.yellow}
      />
    </TouchableOpacity>
  );
};

export default BookmarkBtn;
