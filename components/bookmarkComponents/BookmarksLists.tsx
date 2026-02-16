import IMAGES from "@/constants/images";
import Bookmarks from "@/types/BookmarksType";
import { FlashList } from "@shopify/flash-list";
import { Image } from "expo-image";
import React from "react";
import { useWindowDimensions, View } from "react-native";
import Animated, { FadeInDown } from "react-native-reanimated";
import BookmarkCard from "./BookmarksCard";

type BookmarksListsProps = {
  bookmarks: Bookmarks[];
  isInOtherUserProfile?: boolean; // Is to prevent the user from navigating to the other user's profile if we're already on the user's profile
};

const BookmarksLists: React.FC<BookmarksListsProps> = ({ bookmarks, isInOtherUserProfile }) => {
  const { fontScale } = useWindowDimensions();

  return (
    <>
      {bookmarks.length === 0 ? (
        <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
          <Image
            source={IMAGES.noRecord}
            style={{ width: 200, height: 200 }}
            contentFit="contain"
            transition={1000}
            alt="No Record"
          />
          <Animated.Text
            entering={FadeInDown.delay(400)}
            style={{
              fontSize: fontScale * 16,
              fontFamily: "Segoe_UI_Bold_Italic",
              textAlign: "center",
            }}
          >
            No bookmarks found
          </Animated.Text>
        </View>
      ) : (
        <FlashList
          data={bookmarks}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <BookmarkCard bookmark={item} isInOtherUserProfile={isInOtherUserProfile} />
          )}
          contentContainerStyle={{ paddingVertical: 16 }}
          showsVerticalScrollIndicator={false}
        />
      )}
    </>
  );
};

export default BookmarksLists;
