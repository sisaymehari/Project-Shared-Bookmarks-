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

      [...bookmarks].reverse().forEach(function (bookmark) {
        const bookmarkElement = document.createElement("div");

        const titleLink = document.createElement("a");
        titleLink.href = bookmark.url;
        titleLink.textContent = bookmark.title;

        const descriptionElement = document.createElement("p");
        descriptionElement.textContent = bookmark.description;

        const date = new Date(bookmark.createdAt);
        const createdAtElement = document.createElement("p");
        createdAtElement.textContent = `Created: ${date.toLocaleString()}`;

        const copyButton = document.createElement("button");
        copyButton.innerText = "Copy to clipboard";

        copyButton.addEventListener("click", function () {
          navigator.clipboard.writeText(bookmark.url);
        });

        const likeButton = document.createElement("button");
        likeButton.textContent = `Like (${bookmark.likes})`;

        likeButton.addEventListener("click", function () {
          bookmark.likes += 1;
          setData(selectedUserId, bookmarks);
          showBookmarksForUser();
        });

        bookmarkElement.append(
          titleLink,
          descriptionElement,
          createdAtElement,
          copyButton,
          likeButton
        );
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

    const bookmark = {
      url: url,
      title: title,
      description: description,
      createdAt: new Date(),
      likes: 0,
    };

    const selectedUserId = dropdown.value;
    const bookmarks = getData(selectedUserId);
    const updatedBookmarks = bookmarks || [];

    updatedBookmarks.push(bookmark);

    setData(selectedUserId, updatedBookmarks);
    showBookmarksForUser();
    form.reset();
  });
};