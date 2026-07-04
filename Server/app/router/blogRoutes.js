const router = require('express').Router();
const blogController = require('../controllers/BlogController');
const BlogImage = require('../helper/BlogImage');
const admin = require('../middleware/AdminCheck');
const Auth= require("../middleware/Auth")

router.get('/create-blog', blogController.blogView);
router.post('/create', admin,BlogImage.single("image"), blogController.createBlog);
router.get('/get', blogController.getBlogs);
router.post('/like', Auth, blogController.toggleLike);
router.get("/inventoryTable", blogController.blogTableView);
router.get('/get/:id', blogController.getBlogById);
router.get('/edit/:id', blogController.editView);
router.post('/update/:id', admin,BlogImage.single("image"), blogController.updateBlog);
router.post('/delete/:id', admin, blogController.deleteBlog);
router.post('/comments/add', Auth,blogController.addComment);
router.get('/comments',blogController.getAllCommentsWithDetails);


module.exports = router;