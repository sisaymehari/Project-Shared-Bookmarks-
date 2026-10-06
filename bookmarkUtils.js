export function sortBookmarks(bookmarks) {
  return [...bookmarks].sort(function (a, b) {
    return new Date(b.createdAt) - new Date(a.createdAt);
  });
}
