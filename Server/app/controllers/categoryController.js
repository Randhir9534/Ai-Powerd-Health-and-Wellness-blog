const Category = require('../models/Category');

class CategoryController {
    async categoriesView(req, res) {
        const data= await Category.find()
    try {
      res.render("categories", {
        title: "Add category",
        role: req.cookies.adminRole,
        title: req.cookies.adminName,
        image: req.cookies.adminImg,
        data
      });
    } catch (error) {
      console.log("Category view error", error);
    }
  }
    async createCategory(req, res) {
        try {
        const { name, description } = req.body;

        const newCategory = new Category({
            name,
            description
        });

        await newCategory.save();
         req.flash('success_msg', 'Category created successfully!');
        res.redirect('/categories/view');
    } catch (err) {
        res.status(500).send('Error creating category');
    }
}
    async getCategories(req, res) {
        const categories = await Category.find();
        res.status(200).json(categories);
    }

    async updateCategory(req, res) {
        const category = await Category.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.status(200).json(category);
    }

    async deleteCategory(req, res) {
        const id=req.params.id
        await Category.findByIdAndDelete(id);
         req.flash('danger_msg', 'Category deleted successfully!');
        res.redirect('/categories/view');
    }
}

module.exports = new CategoryController();