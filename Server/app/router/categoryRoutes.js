const express = require('express');
const categoryController = require('../controllers/categoryController');
const router=express.Router()
// const auth = require('../middleware/AdminCheck');

router.get('/view', categoryController.categoriesView);
router.post('/create', categoryController.createCategory);
router.get('/get', categoryController.getCategories);
router.put('/update/:id', categoryController.updateCategory);
router.get('/delete/:id', categoryController.deleteCategory);

module.exports = router;