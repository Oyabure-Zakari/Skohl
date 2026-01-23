// React
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
// React Native
import { ScrollView, View } from "react-native";
// Packages/Libraries
import BottomSheet from "@gorhom/bottom-sheet";
import { GestureHandlerRootView } from "react-native-gesture-handler";
// Components
import BottomSheetComponent from "@/components/bottomSheet/BottomSheetComponent";
import Header from "@/components/profile/Header";
import NoPostsOrBookmarks from "@/components/profile/NoPostsOrBookmarks";
import PostAndBookmarksBtn from "@/components/profile/PostAndBookmarksBtn";
import UserBio from "@/components/profile/UserBio";
import UserPosts from "@/components/profile/UserPosts";
import FloatingActionButton from "@/components/reuseableComponents/FloatingActionButton";
// Styles
import gestureHandlerRootViewStyle from "@/styles/gestureHandlerRootView.styles";
import useReuseableStyles from "@/styles/reuable.styles";
// Custom Hook
import { useAuth } from "@/contexts/AuthContext";
import postsCollectionRef from "@/firebase/collectionRef/postsCollectionRef";
import { useUserProfile } from "@/hooks/userProfile";
// Types
import { Post } from "@/types/PostTypes";
import { getDocs, orderBy, query, where } from "firebase/firestore";

export default function ProfileScreen() {
  // Currently logged in user
  const { userUid } = useAuth();

  // States
  const [activeButton, setActiveButton] = useState<"Posts" | "Bookmarks">("Posts");
  const [activeBottomSheet, setActiveBottomSheet] = useState<"Create Post" | "Send Feedback">(
    "Create Post"
  );

  // Refs
  const sheetRef = useRef<BottomSheet>(null);

  // Styles
  const reUseableStyles = useReuseableStyles();

  // Bottom Sheet snap points
  const snapPoints = useMemo(() => ["1%", "50%", "100%"], []);

  // Handlers
  const handleSnapPress = useCallback(() => {
    sheetRef.current?.snapToIndex(2);
  }, []);

  // Fetch user via TanStack Query instead of local state
  const { data: user, isPending: isLoading } = useUserProfile(userUid);

  // Fetch created by the user
  const [isLoadingCreatedPosts, setIsLoadingCreatedPosts] = useState(true);
  const [posts, setPosts] = useState<Post[]>([]);

  const fetchCreatedPosts = async () => {
    setIsLoadingCreatedPosts(true);
    try {
      const q = query(
        postsCollectionRef,
        where("postedBy.userUid", "==", userUid),
        orderBy("createdAt", "desc")
      );
      const snapshot = await getDocs(q);

      const fetchedPosts: Post[] = snapshot.docs.map((doc) => ({
        // id: doc.id,
        ...doc.data(),
      })) as Post[]; // cast as Post[] for TypeScript

      setPosts(fetchedPosts);
    } catch (error: any) {
      console.log(error.message);
    } finally {
      setIsLoadingCreatedPosts(false);
    }
  };

  useEffect(() => {
    fetchCreatedPosts();
  }, []);

  return (
    <GestureHandlerRootView style={gestureHandlerRootViewStyle.container}>
      {/* Header */}
      <Header user={user} />

      <ScrollView>
        {/* User Bio */}
        <UserBio isLoading={isLoading} user={user} />

        {/* Posts and Bookmarks Buttons */}
        <PostAndBookmarksBtn activeButton={activeButton} setActiveButton={setActiveButton} />

        {/* Divider*/}
        <View style={reUseableStyles.bottomSheetDivider} />

        {/* No Posts Or Bookmarks */}
        {posts.length === 0 && <NoPostsOrBookmarks activeButton={activeButton} />}

        {/* Created Posts  */}
        {activeButton === "Posts" && !isLoadingCreatedPosts && posts.length > 0 && (
          <UserPosts posts={posts} />
        )}
      </ScrollView>

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
