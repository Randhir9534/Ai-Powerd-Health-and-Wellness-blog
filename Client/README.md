# WellnessBloom Blog Platform

A modern **Health & Wellness Blogging Platform** built with **React**, **MUI**, **React Query**, and **GSAP**, backed by a secure and dynamic **Node.js/Express** API.

---

## 🚀 Features

### 🔐 Authentication
- **User Registration & Login** with token-based authentication.
- **Profile Fetching** for personalized user data.

### 📝 Blogs
- Paginated blog fetching with tag-based filtering.
- Bookmark your favorite blogs.
- Like/unlike blog posts (with real-time like count).
- Post and fetch comments for each blog.
- Dark mode toggle.

### 📦 API Endpoints Used
All API interactions are managed using an `axiosInstance` and cleanly organized in `Functions/Content.js` and `Functions/Auth.js`.

#### Authentication
- `POST /register` – Register new users
- `POST /login` – Login existing users
- `GET /profile` – Fetch user profile

#### Blog Operations
- `GET /blogs/get` – Fetch blogs with pagination and tag filter
- `GET /blogs/:id` – Fetch a single blog by ID
- `POST /blogs/like` – Like or unlike a blog post
- `POST /comments` – Add a comment to a blog
- `GET /reviews` – Fetch all comments

#### Bookmarks
- `GET /bookmarks` – Get user's bookmarked blogs
- `POST /bookmarks/add` – Add a blog to bookmarks
- `DELETE /bookmarks/remove` – Remove blog from bookmarks

#### Other
- `POST /subscribe` – Subscribe to newsletters

---

## 🛠️ Tech Stack

- **Frontend:** React, React Query, MUI (Material UI), GSAP
- **Backend:** Node.js, Express, MongoDB
- **Auth:** JWT-based authentication

---

## 📁 Folder Structure




# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.

You don't have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)
