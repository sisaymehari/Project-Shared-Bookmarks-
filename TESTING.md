# Testing

This file explains how each rubric point was tested.

To run the unit tests:

npm i
npm test

To test the website by hand, serve the folder over HTTP (opening `index.html` directly does not work with modules):

npx http-server


Before each manual test, clear old data: open the browser console and run `localStorage.clear()`, then refresh.

## Rubric points

| Rubric point | How it was tested |
| --- | --- |
| The website contains a drop-down which lists five users | Manual test: opened the page and counted the options in the drop-down. There is a "Select the User" prompt at the top, then User 1 to User 5. |
| Selecting a user displays the list of bookmarks for that user | Manual test: added a bookmark for User 1 and a different one for User 2. Switched between the users and checked that each one shows only their own bookmarks. |
| If there are no bookmarks, a message explains this | Manual test: cleared local storage, refreshed, selected each user in turn, and checked that every user shows "No bookmarks yet". |
| Bookmarks are shown in reverse chronological order | Unit tests in `bookmark.test.js` check that `sortBookmarks` puts the newest bookmark first. Also a manual test: added "First" then "Second" and checked "Second" is on top. |
| Each bookmark shows a title, description and created-at timestamp | Manual test: added a bookmark and checked all three are displayed. |
| The title is a link to the bookmark's URL | Manual test: clicked the title and checked that it opens the saved URL. |
| "Copy to clipboard" copies the URL | Manual test: clicked the button, pasted into the address bar, and checked that the pasted text is the bookmark's URL. |
| The like counter works independently and persists | Manual test: added two bookmarks, clicked Like three times on one, and checked the other stayed at 0. Closed the browser, opened the page again, selected the same user, and checked the count was still there. |
| The form has inputs for URL, title and description, and a submit button | Manual test: checked that the form has all three inputs and the "Add bookmark" button. |
| Submitting the form adds a bookmark for the relevant user only | Manual test: with User 1 selected, added a bookmark. Switched to User 2 and checked it does not appear there. Also tried to submit with no user selected and checked that the browser shows a message and nothing is saved. |
| After creating a bookmark, the list shows it | Manual test: submitted the form and checked the new bookmark appears straight away, the form is emptied, and the selected user stays the same. |
| The form can be used with the keyboard | Manual test: used only the Tab key to reach each input and the button, typed the values, and pressed Enter to submit. |
| 100% accessibility in Lighthouse (Desktop) for all views | Ran Lighthouse (Desktop, Accessibility, Snapshot) on two views: no user selected or a user with no bookmarks, and a user with bookmarks. Both scored 100%. |
| Unit tests for at least one non-trivial function | Unit tests in `bookmark.test.js` test `sortBookmarks` from `bookmarkUtils.js`. |
| No dead code | Read through `script.js`, `bookmarkUtils.js`, `index.html` and `style.css` and removed anything unused (for example the old `example.test.js`). |