import { Post } from "./PostTypes";

type Bookmarks = {
  bookmarkId: string;
  bookmarkedBy: string;
} & Post; // Spread all Post fields at the root level

export default Bookmarks;
