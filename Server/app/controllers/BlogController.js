const Blog = require("../models/Blog");
const Category = require("../models/Category");
const Comment = require("../models/Comment");
const fs = require("fs");
const path = require("path");

class BlogController {
  async blogView(req, res) {
    const data = await Category.find();
    try {
      res.render("create-blog", {
        title: "Add Blog",
        role: req.cookies.adminRole,
        title: req.cookies.adminName,
        image: req.cookies.adminImg,
        data,
      });
    } catch (error) {
      console.log("Blog view error", error);
    }
  }
  async createBlog(req, res) {
    // console.log("req",req.user.admin._id);

    const { title, content, category, tags } = req.body;
    const blogData = new Blog({
      title,
      content,
      category,
      tags,
      authorId: req.user.admin.id,
    });
    if (req.file) {
      blogData.image = req.file.path;
    }
    const blog = await blogData.save();
    res.redirect("/blogs/inventoryTable");
    req.flash("success_msg", "Blog created successfully!");
    // res.status(201).json(blog);
  }

  async getBlogs(req, res) {
    try {

      const page = parseInt(req.query._page) || 1;
      const perPage = parseInt(req.query._per_page) || 3;
      const skip = (page - 1) * perPage;
      
      const { tags } = req.query;

      let matchStage = {};
      if (tags) {
        const tagRegex = new RegExp(tags, "i"); // case-insensitive match
        matchStage = { tags: tagRegex };
      }

      const blogs = await Blog.aggregate([
        { $match: matchStage },
        {
          $lookup: {
            from: "categories",
            localField: "category",
            foreignField: "_id",
            as: "categoryDetails",
          },
        },
        { $unwind: "$categoryDetails" },
      ]).skip(skip).limit(perPage);

      res.status(200).json(blogs);
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Server error" });
    }
  }

  async toggleLike(req, res) {
    try {
      const userId = req.user.id;
      const { blogId } = req.body;

      const blog = await Blog.findById(blogId);
      if (!blog) return res.status(404).json({ message: "Blog not found" });

      const index = blog.likes.indexOf(userId);
      if (index > -1) {
        blog.likes.splice(index, 1);
      } else {
        blog.likes.push(userId);
      }

      await blog.save();
      return res.status(200).json({ message: "Toggled like", likes: blog.likes.length });
    } catch (err) {
      return res.status(500).json({ message: "Server error", error: err.message });
    }
  }

  async blogTableView(req, res) {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = 7;
    const skip = (page - 1) * limit;

    const total = await Blog.countDocuments();

    const data = await Blog.aggregate([
      {
        $lookup: {
          from: "categories", // collection name in MongoDB
          localField: "category",
          foreignField: "_id",
          as: "categoryInfo"
        }
      },
      {
        $unwind: {
          path: "$categoryInfo",
          preserveNullAndEmptyArrays: true // optional: keeps blogs without category
        }
      },
      { $sort: { createdAt: -1 } },
      { $skip: skip },
      { $limit: limit }
    ]);

    const totalPages = Math.ceil(total / limit);

    res.render("inventoryTable", {
      title: "Inventory Table",
      role: req.cookies.adminRole,
      name: req.cookies.adminName,         // fixed repeated 'title'
      image: req.cookies.adminImg,
      data,
      currentPage: page,
      totalPages,
    });
  } catch (error) {
    console.log("Blog view error", error);
    res.status(500).send("Server Error");
  }
}

  async getBlogById(req, res) {
    try {
      const blog = await Blog.findById(req.params.id);
      if (!blog) {
        return res.status(404).json({ message: "Blog not found" });
      }
      res.status(200).json(blog);
    } catch (error) {
      res.status(500).json({ message: "Something went wrong" });
    }
  }
  async editView(req, res) {
    const id = req.params.id;
    const blog = await Blog.findById(id);
    const categories = await Category.find();
    try {
      res.render("edit-blog", {
        title: "Edit Blog",
        role: req.cookies.adminRole,
        title: req.cookies.adminName,
        image: req.cookies.adminImg,
        blog,
        categories,
      });
      // return res.status(200).json(blog);
    } catch (error) {
      console.log("Blog edit view error", error);
    }
  }

  async updateBlog(req, res) {
    try {
      const id = req.params.id;
      const { title, category, content, tags } = req.body;

      const updateData = {
        title,
        category,
        content,
        tags,
      };

      // If new image is uploaded, add to updateData
      if (req.file) {
        const blog = await Blog.findById(id);
        if (blog && blog.image) {
          // Delete the old image from server
          const oldImagePath = path.join(__dirname, "/uploads", blog.image);
          if (fs.existsSync(oldImagePath)) {
            fs.unlinkSync(oldImagePath);
          }
        }

        updateData.image = req.file.path;
      }

      await Blog.findByIdAndUpdate(id, updateData);

      req.flash("success_msg", "Blog updated successfully!");
      res.redirect("/blogs/inventoryTable");
    } catch (error) {
      console.error("Error updating blog:", error);
      req.flash("danger_msg", "Something went wrong!");
      res.redirect("/blogs/inventoryTable");
    }
  }

  async deleteBlog(req, res) {
    await Blog.findByIdAndDelete(req.params.id);
    req.flash("danger_msg", "Blog deleted successfully!");
    res.redirect("/blogs/inventoryTable");
    res.status(200).json({ message: "Blog Deleted" });
  }
  // ✅ Add a comment
  async addComment(req, res) {
    try {
      const { blogId, text } = req.body;

      if (!req.user || !req.user.id) {
        return res.status(401).json({ message: "Unauthorized" });
      }

      const comment = new Comment({
        blogId,
        text,
        userId: req.user.id, // ✅ set userId from auth middleware
      });

      await comment.save();
      res.status(201).json({ message: "Comment added successfully", comment });
    } catch (error) {
      console.error("Error adding comment:", error);
      res.status(500).json({ message: "Error adding comment", error });
    }
  }

  // ✅ Get comments for a blog with user info
  async getAllCommentsWithDetails(req, res) {
    try {
      const comments = await Comment.aggregate([
        {
          $lookup: {
            from: "users",
            localField: "userId",
            foreignField: "_id",
            as: "user",
          },
        },
        { $unwind: "$user" },

        {
          $lookup: {
            from: "blogs",
            localField: "blogId",
            foreignField: "_id",
            as: "blog",
          },
        },
        { $unwind: "$blog" },

        {
          $project: {
            text: 1,
            createdAt: 1,
            userImg: "$user.image",
            userName: "$user.name",
            blogTitle: "$blog.title",
            blogImg: "$blog.image",
          },
        },
        { $sort: { createdAt: -1 } },
      ]);

      res.status(200).json({ comments });
    } catch (error) {
      res.status(500).json({ message: "Error fetching comments", error });
    }
  }
}

module.exports = new BlogController();
