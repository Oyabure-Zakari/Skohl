import COLORS from "@/constants/colors";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import React from "react";
import { TouchableOpacity } from "react-native";

type BookmarkBtnProps = {
  handleBookmark: () => void;
  isBookmarked: boolean;
  size: number;
};

const BookmarkBtn: React.FC<BookmarkBtnProps> = ({ handleBookmark, isBookmarked, size }) => {
  return (
    <TouchableOpacity onPress={handleBookmark}>
      <MaterialCommunityIcons
        name={isBookmarked ? "bookmark" : "bookmark-outline"}
        size={size}
        color={COLORS.yellow}
      />
    </TouchableOpacity>
  );
};

export default BookmarkBtn;
