const router = require('express').Router();
const bookmarkController = require('../controllers/bookMarkController');
const Auth = require('../middleware/Auth');

router.post('/add', Auth, bookmarkController.addBookmark);
router.delete('/delete',Auth, bookmarkController.removeBookmark);
router.get('/view', Auth, bookmarkController.viewBookmarks);

module.exports = router;