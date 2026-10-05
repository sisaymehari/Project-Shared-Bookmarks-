// This is a placeholder file which shows how you can access functions defined in other files.
// It can be loaded into index.html.
// You can delete the contents of the file once you have understood how it works.
// Note that when running locally, in order to open a web page which uses modules, you must serve the directory over HTTP e.g. with https://www.npmjs.com/package/http-server
// You can't open the index.html file using a file:// URL.

import { getUserIds, getData, setData } from "./storage.js";

window.onload = function () {
  const users = getUserIds();
  const dropdown = document.querySelector("#user-select");
  const container = document.querySelector("#bookmarks-container");
  const form = document.querySelector("#bookmark-form");

  users.forEach(function (userId) {
    const option = document.createElement("option");
    option.value = userId;
    option.textContent = `User ${userId}`;
    dropdown.appendChild(option);
  });

  function showBookmarksForUser() {
    const selectedUserId = dropdown.value;
    const bookmarks = getData(selectedUserId);

    if (bookmarks === null) {
      container.innerText = "No bookmarks yet";
    } else {
      container.innerText = "";

      bookmarks.forEach(function (bookmark) {
        const bookmarkElement = document.createElement("div");

        const date = new Date(bookmark.createdAt);

        bookmarkElement.innerText = `${bookmark.title}\n${bookmark.description}\nCreated: ${date.toLocaleString()}`;

        const copyButton = document.createElement("button");
        copyButton.innerText = "Copy to clipboard";

        copyButton.addEventListener("click", function () {
          navigator.clipboard.writeText(bookmark.url);
        });

        bookmarkElement.appendChild(copyButton);
        container.appendChild(bookmarkElement);
      });
    }
  }

  dropdown.addEventListener("change", showBookmarksForUser);
  showBookmarksForUser();

  form.addEventListener("submit", function (event) {
    event.preventDefault();

    const url = document.querySelector("#bookmark-url").value;
    const title = document.querySelector("#bookmark-title").value;
    const description = document.querySelector("#bookmark-description").value;
    // create and save bookmark here

    const bookmark = {
      url: url,
      title: title,
      description: description,
      createdAt: new Date(),
    };

    const selectedUserId = dropdown.value;
    const bookmarks = getData(selectedUserId);
    const updatedBookmarks = bookmarks || [];

    updatedBookmarks.push(bookmark);

    setData(selectedUserId, updatedBookmarks);
    showBookmarksForUser();
  });
};
