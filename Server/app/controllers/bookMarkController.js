const User = require('../models/User');
const Blog = require('../models/Blog');
const mongoose=require('mongoose')

class BookmarkController {
    async addBookmark(req, res) {
        const { blogId } = req.body;
        const user = await User.findById(req.user.id);

        if (user.bookmarks.includes(blogId))
            return res.status(400).json({ message: 'Already Bookmarked' });

        user.bookmarks.push(blogId);
        await user.save();

        res.status(200).json({ message: 'Blog Bookmarked' });
    }

    async removeBookmark(req, res) {
        const { blogId } = req.body;
        const user = await User.findById(req.user.id);

        user.bookmarks = user.bookmarks.filter(id => id.toString() !== blogId);
        await user.save();

        res.status(200).json({ message: 'Bookmark Removed' });
    }

   async viewBookmarks(req, res) {
  try {
    // Validate ObjectId
    if (!mongoose.Types.ObjectId.isValid(req.user.id)) {
      return res.status(400).json({ message: 'Invalid user ID' });
    }

    const result = await User.aggregate([
      { $match: { _id: new mongoose.Types.ObjectId(req.user.id) } },
      {
        $lookup: {
          from: 'blogs', // ✅ Use correct collection name
          localField: 'bookmarks',
          foreignField: '_id',
          as: 'bookmarksDetails'
        }
      },
      {
        $project: {
          bookmarks: '$bookmarksDetails',
          _id: 0
        }
      }
    ]);

    const bookmarks = result[0]?.bookmarks || [];
    res.status(200).json({total: bookmarks.length,data:bookmarks});

  } catch (error) {
    console.error('Aggregation Error:', error);
    res.status(500).json({ message: 'Error fetching bookmarks', error: error.message });
  }
}

}

module.exports = new BookmarkController();
