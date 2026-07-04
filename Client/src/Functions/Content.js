import { end_points } from "../Api/api";
import axiosInstance from "../Api/axiosInstance";

// --------------- HOME ------------------------

// ======== Fetch Blog ==========
let fetchBlogApi=end_points.FetchBlogs
export const fetchBlogs = async (pageNo = 1, tagFilter = "") => {
  const queryParams = new URLSearchParams();
  queryParams.append("_page", pageNo);
  queryParams.append("_per_page", 6); // You can adjust per page count

  if (tagFilter) {
    queryParams.append("tags", tagFilter);
  }

  const { data } = await axiosInstance.get(`${fetchBlogApi}?${queryParams.toString()}`);
  return data;
};

// Fetch bookmarks
let BookMarksApi=end_points.BookMarks
export const fetchUserBookmarks = async () => {
  const { data } = await axiosInstance.get(BookMarksApi);
  return data.bookmarks;
};

// Add bookmark
let addBookmarkApi=end_points.AddBookmarks
export const addBookmark = async (blogId) => {
  const { data } = await axiosInstance.post(
    addBookmarkApi,
    { blogId }
  );
  return data;
};
// liked blogs
let likedApi=end_points.toggleLike
export const toggleLike = async (blogId) => {
  const { data } = await axiosInstance.post(
    likedApi,
    { blogId },
  );
  return data;
};

// Post comment
let postCommentsApi=end_points.PostComments
export const postComment = async ({ blogId, text }) => {
  const { data } = await axiosInstance.post(
    postCommentsApi,
    { blogId, text }
  );
  return data;
};
// Get All Comment
let reviewApi=end_points.review
export const fetchReviews = async () => {
  const { data } = await axiosInstance.get(reviewApi);
  return data.comments;
};

// ---------------------  Blog-Details ----------------------
let singleBlogApi=end_points.FetchBlogs
export const fetchBlogDetails = async (id) => {
  const { data } = await axiosInstance.get(`${singleBlogApi}/${id}`);
  console.log("Single blog data:", data);
  return data;
};

// ---------------------- BookMarks --------------------------
//  Fetch Bookmarks
let viewBookmarksApi=end_points.viewBookmarks
export const fetchBookmarks = async () => {
  const { data } = await axiosInstance.get(viewBookmarksApi);
  return data;
};

//  Remove Bookmarks
let removeBookmarksApi=end_points.removeBookmarks
export const removeBookmarkApi = async (blogId) => {
  await axiosInstance.delete(removeBookmarksApi, {
    data: { blogId }
  });
};
// ------------------------- Footer -----------------------------
//  SubsCriber
let subsApi=end_points.Subscription
export const subscribeUser = async (formData) => {
  const { data } = await axiosInstance.post(
    subsApi,
    formData
  );
  return data;
};