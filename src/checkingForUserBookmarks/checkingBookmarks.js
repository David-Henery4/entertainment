const checkingBookmarks = (data) => {
  const content = data[0];
  const bookmarks = data[1];
  const userBookmarks = bookmarks[0].bookmarks;
  const checkingForBookmarks = content.map((item) => {
    userBookmarks.forEach((bookmarkedItem) => {
      if (item.id === bookmarkedItem.id) {
        item.isBookmarked = true;
      }
    });
    return item;
  });
  return checkingForBookmarks;
};

export default checkingBookmarks;
