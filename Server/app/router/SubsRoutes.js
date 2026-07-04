const router = require('express').Router();
const subscriptionController = require('../controllers/SubsController');
// const Auth = require('../middleware/Auth');

router.get('/view', subscriptionController.subsView);
router.post('/subscribe',subscriptionController.subscribe);

module.exports = router;