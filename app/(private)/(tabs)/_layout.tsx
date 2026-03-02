import COLORS from "@/constants/colors";
import {
  Entypo,
  Feather,
  FontAwesome5,
  FontAwesome6,
  MaterialCommunityIcons,
  MaterialIcons,
  Octicons,
} from "@expo/vector-icons";
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
          tabBarIcon: ({ color, focused }) =>
            focused ? (
              <Octicons name="home-fill" size={20} color={color} />
            ) : (
              <Feather name="home" size={20} color={color} />
            ),
        }}
      />

      <Tabs.Screen
        name="Services"
        options={{
          title: "",
          tabBarIcon: ({ color, focused }) =>
            focused ? (
              <FontAwesome5 name="briefcase" size={20} color={color} />
            ) : (
              <Octicons name="briefcase" size={20} color={color} />
            ),
        }}
      />

      <Tabs.Screen
        name="Events"
        options={{
          title: "",
          tabBarIcon: ({ color, focused }) =>
            focused ? (
              <Entypo name="calendar" size={20} color={color} />
            ) : (
              <Octicons name="calendar" size={20} color={color} />
            ),
        }}
      />

      <Tabs.Screen
        name="ChatsList"
        options={{
          title: "",
          tabBarIcon: ({ color, focused }) =>
            focused ? (
              <MaterialIcons name="message" size={20} color={color} />
            ) : (
              <MaterialCommunityIcons name="message-reply-outline" size={20} color={color} />
            ),
        }}
      />

      <Tabs.Screen
        name="Profile"
        options={{
          title: "",
          tabBarIcon: ({ color, focused }) =>
            focused ? (
              <FontAwesome5 name="user-alt" size={20} color={color} />
            ) : (
              <FontAwesome6 name="user" size={20} color={color} />
            ),
        }}
      />
    </Tabs>
  );
}
