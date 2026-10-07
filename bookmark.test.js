import assert from "node:assert";
import test from "node:test";

import { sortBookmarks } from "./bookmarkUtils.js";

test("sorts bookmarks with newest first", () => {
  const bookmarks = [
    {
      title: "Old bookmark",
      createdAt: "2026-10-01T10:00:00Z",
    },
    {
      title: "New bookmark",
      createdAt: "2026-10-06T10:00:00Z",
    },
  ];

  const result = sortBookmarks(bookmarks);

  assert.equal(result[0].title, "New bookmark");
});
