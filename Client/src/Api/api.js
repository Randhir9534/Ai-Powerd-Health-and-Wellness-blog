const base_url=`${process.env.REACT_APP_API_URL}/`;
export const end_points={
    // Auth
    Register:"api/auth/register",
    Login:"api/auth/login",
    Profile:"api/auth/profile",
    generateDietPlan:"api/auth/generate",
    // content
    FetchBlogs:"blogs/get",
    BookMarks:"api/bookmarks",
    AddBookmarks:"api/bookmarks/add",
    toggleLike:"blogs/like",
    PostComments:"blogs/comments/add",
    review:"blogs/comments",
    viewBookmarks:"api/bookmarks/view",
    removeBookmarks:"api/bookmarks/delete",
    Subscription:"subscription/subscribe",
}
export default base_url;
