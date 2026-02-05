import React, { useCallback, useMemo, useRef, useState } from "react";
import { FlatList, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { GestureHandlerRootView, ScrollView } from "react-native-gesture-handler";

import BottomSheet from "@gorhom/bottom-sheet";

import BottomSheetComponent from "@/components/bottomSheet/BottomSheetComponent";
import FloatingActionButton from "@/components/reuseableComponents/FloatingActionButton";

import COLORS from "@/constants/colors";
import blurhash from "@/constants/expoBlurImage";
import gestureHandlerRootViewStyle from "@/styles/gestureHandlerRootView.styles";
import useReuseableStyles from "@/styles/reuable.styles";
import { Image } from "expo-image";
import { useRouter } from "expo-router";

import { ProductCategoryType } from "@/types/ProductCategoryType";
import { MaterialCommunityIcons } from "@expo/vector-icons";

// Dummy data (you can replace with real data later)
const dummyPosts = [
  {
    id: "1",
    userImage: "https://randomuser.me/api/portraits/men/32.jpg",
    time: "2m ago",
    title: "iPhone 13 128GB - Very Clean",
    productImage: "https://images.unsplash.com/photo-1598327105666-5b89351aff97?w=500",
    category: "Smartphones",
    price: "₦320,000",
    userName: "John Doe",
  },
  {
    id: "2",
    userImage: "https://randomuser.me/api/portraits/women/44.jpg",
    time: "15m ago",
    title: "Gas Cooker - 4 Burners",
    productImage: "https://images.unsplash.com/photo-1583258292688-d0213dc5a3c8?w=500",
    category: "Kitchen Appliances",
    price: "₦85,000",
    userName: "Jane Smith",
  },
  {
    id: "3",
    userImage: "https://randomuser.me/api/portraits/men/65.jpg",
    time: "1h ago",
    title: "Canon EOS 250D with Lens",
    productImage: "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=500",
    category: "Cameras",
    price: "₦290,000",
    userName: "Mike Johnson",
  },
  {
    id: "4",
    userImage: "https://randomuser.me/api/portraits/women/71.jpg",
    time: "3h ago",
    title: "Brand New Nike Air Force 1",
    productImage: "https://images.unsplash.com/photo-1600185365483-26d7a4cc184e?w=500",
    category: "Shoes",
    price: "₦68,000",
    userName: "Emily Davis",
  },
];

export default function HomeScreen() {
  // Styles
  const reUseableStyles = useReuseableStyles();
  // States
  const [activeBottomSheet, setActiveBottomSheet] = useState<"Create Post" | "Send Feedback">(
    "Create Post",
  );
  const [activeProductCategory, setActiveProductCategory] = useState<ProductCategoryType>("none");

  // Refs
  const sheetRef = useRef<BottomSheet>(null);

  // Bottom Sheet snap points
  const snapPoints = useMemo(() => ["1%", "50%", "100%"], []);

  // Handlers
  const handleSnapPress = useCallback(() => {
    sheetRef.current?.snapToIndex(2);
  }, []);

  const router = useRouter();

  const productCategories = [
    "none",
    "Books & Academic Materials",
    "Electronics & Gadgets",
    "Equipments",
    "Fashion & Clothing",
    "Hostel & Room Essentials",
    "Kitchen & Food Items",
    "Personal Care & Beauty",
    "Sportswear",
    "Stationery & Office Supplies",
    "Transportation & Mobility",
  ];

  const PostCard = ({ item }: { item: (typeof dummyPosts)[0] }) => {
    return (
      <TouchableOpacity style={styles.card}>
        {/* Header: user image + name + time */}
        <View style={styles.header}>
          <Image
            source={{ uri: item.userImage }}
            style={styles.userAvatar}
            placeholder={{ blurhash }}
            contentFit="contain"
            transition={1000}
            alt="Profile Picture"
          />
          <View style={styles.userInfo}>
            <Text style={styles.userName}>{item.userName}</Text>
            <Text style={styles.time}>{item.time}</Text>
          </View>
        </View>

        {/* Title */}
        <Text style={styles.title} numberOfLines={2}>
          {item.title}
        </Text>

        {/* Product image */}
        <Image
          source={{ uri: item.productImage }}
          style={styles.productImage}
          placeholder={{ blurhash }}
          contentFit="cover"
          transition={1000}
          alt="Product Picture"
        />

        {/* Category + Price */}
        <View style={styles.meta}>
          <Text style={styles.category}>{item.category}</Text>
          <Text style={styles.price}>{item.price}</Text>
        </View>

        {/* Action buttons */}
        <View style={styles.actions}>
          <TouchableOpacity style={styles.actionBtn}>
            <MaterialCommunityIcons name="bookmark-outline" size={22} color="#666" />
          </TouchableOpacity>

          <TouchableOpacity style={styles.actionBtn}>
            <MaterialCommunityIcons name="chat-outline" size={22} color="#666" />
          </TouchableOpacity>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <GestureHandlerRootView style={gestureHandlerRootViewStyle.container}>
      {/* Header */}
      <View style={homeStyles.header}>
        {/* User Name */}
        <Text style={homeStyles.userName}>Hey,{"\n"}Halima</Text>
        {/* User Image */}
        <TouchableOpacity onPress={() => router.push("/(private)/(tabs)/Profile")}>
          <Image
            source={{ uri: "https://i.pravatar.cc/300" }}
            style={{ width: 60, height: 60, borderRadius: 30 }}
            placeholder={{ blurhash }}
            contentFit="contain"
            transition={1000}
            alt="Profile Picture"
          />
        </TouchableOpacity>
      </View>

      {/* Divider*/}
      <View style={homeStyles.divider} />

      {/* Category Container */}
      <View style={homeStyles.categoryContainer}>
        {/* Category Title */}
        <Text style={homeStyles.categoryTitle}>Category</Text>
        {/* Category Buttons */}
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{ gap: 6 }}
        >
          {productCategories.map((category) => (
            <TouchableOpacity
              key={category}
              style={[
                activeProductCategory === category
                  ? reUseableStyles.activeButton
                  : reUseableStyles.inactiveButton,
              ]}
              onPress={() => setActiveProductCategory(category as ProductCategoryType)}
            >
              <Text
                style={[
                  activeProductCategory === category
                    ? reUseableStyles.activeText
                    : reUseableStyles.inactiveText,
                ]}
              >
                {category === "none" ? "All" : category}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      {/* Product List */}
      <FlatList
        data={dummyPosts}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <PostCard item={item} />}
        contentContainerStyle={{ paddingVertical: 16 }}
        showsVerticalScrollIndicator={false}
      />

      {/* Bottom Sheet */}
      <BottomSheetComponent
        sheetRef={sheetRef}
        snapPoints={snapPoints}
        activeBottomSheet={activeBottomSheet}
      />

      {/* Floating Action Button */}
      <FloatingActionButton
        setActiveBottomSheet={setActiveBottomSheet}
        handleSnapPress={handleSnapPress}
      />
    </GestureHandlerRootView>
  );
}

const homeStyles = StyleSheet.create({
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 16,
  },

  userName: {
    fontSize: 18,
    fontFamily: "Segoe_UI_Bold",
    color: COLORS.darkBlue,
  },

  divider: {
    width: "100%",
    height: 2,
    backgroundColor: COLORS.lightGrey,
    marginTop: 10,
  },

  categoryContainer: {
    marginTop: 20,
    paddingHorizontal: 4,
  },

  categoryTitle: {
    fontSize: 18,
    fontFamily: "Segoe_UI_Bold",
    color: COLORS.purple,
    paddingHorizontal: 16,
    marginBottom: 6,
  },
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f8f9fa",
  },
  card: {
    backgroundColor: "white",
    borderRadius: 12,
    marginHorizontal: 16,
    marginVertical: 8,
    padding: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 3,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
  },
  userAvatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 12,
  },
  userInfo: {
    flex: 1,
  },
  userName: {
    fontSize: 15,
    fontWeight: "600",
    color: "#111",
  },
  time: {
    fontSize: 12,
    color: "#888",
    marginTop: 2,
  },
  title: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#222",
    marginBottom: 12,
  },
  productImage: {
    width: "100%",
    height: 220,
    borderRadius: 10,
    marginBottom: 12,
  },
  meta: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
  },
  category: {
    fontSize: 13,
    color: "#555",
    backgroundColor: "#f0f0f0",
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 16,
  },
  price: {
    fontSize: 17,
    fontWeight: "700",
    color: "#27ae60",
  },
  actions: {
    flexDirection: "row",
    justifyContent: "flex-end",
    gap: 16,
  },
  actionBtn: {
    padding: 8,
    borderRadius: 8,
    backgroundColor: "#f0f0f0",
  },
});
