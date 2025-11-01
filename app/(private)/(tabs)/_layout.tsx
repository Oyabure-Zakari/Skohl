import COLORS from "@/constants/colors";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import Fontisto from "@expo/vector-icons/Fontisto";
import Ionicons from "@expo/vector-icons/Ionicons";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { Tabs } from "expo-router";
import React from "react";

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: COLORS.darkBlue,
        tabBarInactiveTintColor: COLORS.darkGrey,
        headerShown: false,
        tabBarStyle: { paddingBottom: 60, paddingTop: 20 },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "",
          tabBarIcon: ({ color, size }) => (
            <MaterialIcons name="home-filled" size={20} color={color} />
          ),
        }}
      />

      <Tabs.Screen
        name="Services"
        options={{
          title: "",
          tabBarIcon: ({ color, size }) => (
            <FontAwesome5 name="suitcase" size={20} color={color} />
          ),
        }}
      />

      <Tabs.Screen
        name="Events"
        options={{
          title: "",
          tabBarIcon: ({ color, size }) => (
            <Fontisto name="calendar" size={20} color={color} />
          ),
        }}
      />

      <Tabs.Screen
        name="ChatsList"
        options={{
          title: "",
          tabBarIcon: ({ color, size }) => (
            <MaterialIcons name="chat" size={20} color={color} />
          ),
        }}
      />

      <Tabs.Screen
        name="Profile"
        options={{
          title: "",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="person-sharp" size={20} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}
