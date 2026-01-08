// React
import React from "react";
// React Native
import { Text, View } from "react-native";
// Expo
import { MaterialCommunityIcons, MaterialIcons } from "@expo/vector-icons";
// Constants
import COLORS from "@/constants/colors";
// Styles
import useProfileScreenStyles from "@/styles/profile.styles";
// Packages
import formatFullName from "@/utils/formatUserFullname";
import formatDate from "@/utils/formateDate";
import { MotiView } from "moti";
import { Skeleton } from "moti/skeleton";

type UserBioProps = {
  isLoading: boolean;
  user: any;
};

const UserBio: React.FC<UserBioProps> = ({ isLoading, user }) => {
  // Format fullname and date
  const userFullname = formatFullName(user?.fullName);
  const joinedDate = formatDate(user);

  // Styles
  const profileStyles = useProfileScreenStyles();

  return (
    <View style={profileStyles.bioContainer}>
      {isLoading ? (
        <>
          {/* Skeleton */}
          <MotiView style={{ marginBottom: 6 }}>
            <Skeleton show={isLoading} colorMode="light" width={"60%"}></Skeleton>
          </MotiView>
          <MotiView style={{ marginBottom: 6 }}>
            <Skeleton show={isLoading} colorMode="light" width={"40%"}></Skeleton>
          </MotiView>
        </>
      ) : (
        <>
          {/* Full Name */}
          <Text numberOfLines={1} style={profileStyles.bioText1}>
            {userFullname}
          </Text>

          {/* Faculty */}
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <MaterialCommunityIcons name="school-outline" size={20} color={COLORS.darkGrey} />
            <Text style={profileStyles.bioText2}> {user?.faculty} </Text>
          </View>

          {/* Joined Date */}
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <MaterialIcons name="date-range" size={20} color={COLORS.darkGrey} />
            <Text style={profileStyles.bioText2}>Joined {joinedDate}</Text>
          </View>

          {/* Display bio if available */}
          {user?.bio && (
            <Text
              numberOfLines={4}
              style={[profileStyles.bioText2, { fontSize: 12, marginTop: 4 }]}
            >
              {user?.bio}
            </Text>
          )}
        </>
      )}
    </View>
  );
};

export default UserBio;
