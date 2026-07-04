const express = require('express');
const authController = require('../controllers/authController');
const UserImage = require('../helper/UserImage');
const Auth = require('../middleware/Auth');
const { generatePlan } = require('../controllers/Dietcontroller');
const router=express.Router()

router.post('/register',UserImage.single('image'),authController.register);
router.post('/login', authController.login);
router.get('/profile',Auth,authController.Profile);
router.post("/generate", generatePlan);

module.exports = router;