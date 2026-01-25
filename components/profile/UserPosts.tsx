import PostCard from "@/components/profile/PostCard";
import { Post } from "@/types/PostTypes";
import { FlatList, View } from "react-native";

interface UserPostsProps {
  posts: Post[];
}

const UserPosts: React.FC<UserPostsProps> = ({ posts }) => {
  return (
    // Card container
    <FlatList
      data={posts}
      keyExtractor={(item) => item.id}
      numColumns={2} // ← Two columns!
      columnWrapperStyle={{
        justifyContent: "space-between",
        paddingHorizontal: 12,
      }}
      renderItem={({ item }) => (
        <View style={{ flex: 1, maxWidth: "50%", paddingHorizontal: 6 }}>
          <PostCard post={item} />
        </View>
      )}
      contentContainerStyle={{
        paddingTop: 20,
        paddingBottom: 100, // Add some padding at the bottom
      }}
      showsVerticalScrollIndicator={false}
      scrollEnabled={false} // prevents the FlatList from handling its own scroll, letting the outer ScrollView control scrolling instead.
    />
  );
};

export default UserPosts;
