import CustomButton from "@/components/reuseableComponents/CustomButton";
import FloatingActionButton from "@/components/reuseableComponents/FloatingActionButton";
import COLORS from "@/constants/colors";
import BottomSheet, { BottomSheetView } from "@gorhom/bottom-sheet";
import { Picker } from "@react-native-picker/picker";
import React, { useCallback, useMemo, useRef, useState } from "react";
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import StarRating from "react-native-star-rating-widget";

export default function ProductsScreen() {
  const [actionType, setActionType] = useState("Create Post");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [rating, setRating] = useState(0);

  const sheetRef = useRef<BottomSheet>(null);

  const snapPoints = useMemo(() => ["1%", "50%", "100%"], []);

  const handleSnapPress = useCallback((index: number) => {
    sheetRef.current?.snapToIndex(index);
  }, []);

  return (
    <GestureHandlerRootView style={styles.container}>
      <Text>Products Screen</Text>
      {actionType === "Send Feedback" ? (
        <BottomSheet
          ref={sheetRef}
          snapPoints={snapPoints}
          enableDynamicSizing={false}
          backgroundStyle={{
            borderRadius: 10,
            backgroundColor: COLORS.white,
            shadowColor: COLORS.darkBlue,
            shadowOffset: {
              width: 0,
              height: 2,
            },
            shadowOpacity: 0.25,
            shadowRadius: 3.84,
            elevation: 20,
          }}
        >
          <BottomSheetView
            style={{
              flex: 1,
              alignItems: "center",
            }}
          >
            {/* Action type */}
            <Text style={{ color: COLORS.darkGrey, fontFamily: "Segoe_UI_Bold" }}>
              {actionType}
            </Text>

            {/* Divider */}
            <View
              style={{ width: "100%", height: 2, backgroundColor: COLORS.lightGrey, marginTop: 20 }}
            />

            {/* Want to give us feedback? Text */}
            <Text
              style={{
                color: COLORS.darkBlue,
                fontFamily: "Segoe_UI_Bold",
                fontSize: 16,
                marginTop: 20,
              }}
            >
              {"We'd love your feedback!"}
            </Text>

            {/* Text Input */}
            <TextInput
              placeholder="Feedback"
              multiline={true}
              numberOfLines={4}
              textAlignVertical="top"
              placeholderTextColor={COLORS.darkGrey}
              style={{
                width: "90%",
                color: COLORS.darkGrey,
                fontFamily: "Segoe_UI_Bold",
                backgroundColor: COLORS.lightGrey,
                borderRadius: 10,
                paddingHorizontal: 16,
                marginVertical: 10,
              }}
            />

            {/* Rating */}
            <View style={{ gap: 10, alignItems: "center", paddingVertical: 20 }}>
              <Text
                style={{
                  color: COLORS.darkGrey,
                  fontFamily: "Segoe_UI_Bold",
                }}
              >
                Rate us
              </Text>

              <StarRating
                maxStars={5}
                starSize={30}
                step={"full"}
                rating={rating}
                onChange={setRating}
                color={COLORS.yellow}
                emptyColor={COLORS.yellow}
              />
            </View>

            <TouchableOpacity>
              <CustomButton text={"Post"} />
            </TouchableOpacity>
          </BottomSheetView>
        </BottomSheet>
      ) : (
        <BottomSheet
          ref={sheetRef}
          snapPoints={snapPoints}
          enableDynamicSizing={false}
          backgroundStyle={{
            borderRadius: 10,
            backgroundColor: COLORS.white,
            shadowColor: COLORS.darkBlue,
            shadowOffset: {
              width: 0,
              height: 2,
            },
            shadowOpacity: 0.25,
            shadowRadius: 3.84,
            elevation: 20,
          }}
        >
          <BottomSheetView
            style={{
              flex: 1,
              alignItems: "center",
            }}
          >
            {/* Action type */}
            <Text style={{ color: COLORS.darkGrey, fontFamily: "Segoe_UI_Bold" }}>
              {actionType}
            </Text>

            {/* Divider */}
            <View
              style={{ width: "100%", height: 2, backgroundColor: COLORS.lightGrey, marginTop: 20 }}
            />

            {/* What do you want to post? text */}
            <Text
              style={{
                color: COLORS.darkBlue,
                fontFamily: "Segoe_UI_Bold",
                fontSize: 16,
                marginTop: 10,
              }}
            >
              What would you like to post?
            </Text>

            {/* Post type */}
            <View style={{ flexDirection: "row", gap: 10, marginTop: 10 }}>
              <TouchableOpacity>
                <View
                  style={{
                    backgroundColor: COLORS.purple,
                    borderRadius: 5,
                    padding: 5,
                  }}
                >
                  <Text
                    style={{
                      color: COLORS.white,
                      fontFamily: "Segoe_UI_Bold",
                      fontSize: 12,
                      paddingHorizontal: 5,
                    }}
                  >
                    Post a product
                  </Text>
                </View>
              </TouchableOpacity>
              <TouchableOpacity>
                <View
                  style={{
                    borderColor: COLORS.purple,
                    borderWidth: 1,
                    borderRadius: 5,
                    padding: 5,
                  }}
                >
                  <Text
                    style={{
                      color: COLORS.purple,
                      fontFamily: "Segoe_UI_Bold",
                      fontSize: 12,
                      paddingHorizontal: 5,
                    }}
                  >
                    Post a service
                  </Text>
                </View>
              </TouchableOpacity>
              <TouchableOpacity>
                <View
                  style={{
                    borderColor: COLORS.purple,
                    borderWidth: 1,
                    borderRadius: 5,
                    padding: 5,
                  }}
                >
                  <Text
                    style={{
                      color: COLORS.purple,
                      fontFamily: "Segoe_UI_Bold",
                      fontSize: 12,
                      paddingHorizontal: 5,
                    }}
                  >
                    Post an event
                  </Text>
                </View>
              </TouchableOpacity>
            </View>

            {/* Image View */}
            <View
              style={{
                marginTop: 20,
                width: "45%",
                height: 150,
                borderRadius: 10,
                justifyContent: "center",
                alignItems: "center",
                backgroundColor: COLORS.lightGrey,
              }}
            >
              <Text
                style={{
                  color: COLORS.darkGrey,
                  fontFamily: "Segoe_UI_Bold",
                }}
              >
                Image
              </Text>
            </View>

            {/* View for picker and input field */}
            <View
              style={{
                margin: 20,
                width: "100%",
                justifyContent: "center",
                alignItems: "center",
                gap: 15,
              }}
            >
              {/* Text input view */}
              <View
                style={{
                  backgroundColor: COLORS.lightGrey,
                  width: "90%",
                  borderRadius: 10,
                  alignItems: "center",
                }}
              >
                <Picker
                  style={{
                    backgroundColor: COLORS.lightGrey,
                    width: "95%",
                    color: COLORS.darkGrey,
                    fontFamily: "Segoe_UI_Bold",
                    borderRadius: 10,
                  }}
                  selectedValue={selectedCategory}
                  onValueChange={(itemValue, itemIndex) => setSelectedCategory(itemValue)}
                >
                  <Picker.Item label="Category" value="none" enabled={false} />
                  <Picker.Item
                    label="📚 Books & Academic Materials"
                    value="Books & Academic Materials"
                  />
                  <Picker.Item label="💻 Electronics & Gadgets" value="Electronics & Gadgets" />
                  <Picker.Item label="🧰 Equipments" value="Equipments" />
                  <Picker.Item label="👕 Fashion & Clothing" value="Fashion & Clothing" />
                  <Picker.Item
                    label="🪑 Hostel & Room Essentials"
                    value="Hostel & Room Essentials"
                  />
                  <Picker.Item label="🍳 Kitchen & Food Items" value="Kitchen & Food Items" />
                  <Picker.Item label="🧴 Personal Care & Beauty" value="Personal Care & Beauty" />
                  <Picker.Item label="🏃‍♂️ Sportswear" value="Sportswear" />
                  <Picker.Item
                    label="✏️ Stationery & Office Supplies"
                    value="Stationery & Office Supplies"
                  />
                  <Picker.Item
                    label="🚲 Transportation & Mobility"
                    value="Transportation & Mobility"
                  />
                </Picker>
              </View>

              <TextInput
                placeholder="Title"
                placeholderTextColor={COLORS.darkGrey}
                style={{
                  width: "90%",
                  color: COLORS.darkGrey,
                  fontFamily: "Segoe_UI_Bold",
                  backgroundColor: COLORS.lightGrey,
                  borderRadius: 10,
                  paddingHorizontal: 16,
                }}
              />
              <TextInput
                placeholder="Price"
                placeholderTextColor={COLORS.darkGrey}
                style={{
                  width: "90%",
                  color: COLORS.darkGrey,
                  fontFamily: "Segoe_UI_Bold",
                  backgroundColor: COLORS.lightGrey,
                  borderRadius: 10,
                  paddingHorizontal: 16,
                }}
              />
              <TextInput
                placeholder="Description"
                multiline={true}
                numberOfLines={4}
                textAlignVertical="top"
                placeholderTextColor={COLORS.darkGrey}
                style={{
                  width: "90%",
                  color: COLORS.darkGrey,
                  fontFamily: "Segoe_UI_Bold",
                  backgroundColor: COLORS.lightGrey,
                  borderRadius: 10,
                  paddingHorizontal: 16,
                }}
              />
            </View>
            <TouchableOpacity>
              <CustomButton text={"Post"} />
            </TouchableOpacity>
          </BottomSheetView>
        </BottomSheet>
      )}

      <FloatingActionButton setActionType={setActionType} handleSnapPress={handleSnapPress} />
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
    justifyContent: "center",
    alignItems: "center",
  },
});
