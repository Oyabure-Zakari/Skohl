export default function bookmarkLogic(
  isBookmarked: boolean,
  isOwnerOfTheBookmark: boolean,
  addToBookmarks: () => void,
  removeFromBookmarks: () => void,
) {
  if (!isBookmarked) {
    addToBookmarks(); // Add to bookmarks if not bookmarked
  } else {
    isOwnerOfTheBookmark && removeFromBookmarks(); // Remove from bookmarks if bookmarked by the current user
  }
}
