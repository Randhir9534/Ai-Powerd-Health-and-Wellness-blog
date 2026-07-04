
# 🧘‍♂️ WellnessBloom – Health & Wellness Blog Platform

A full-stack MERN (MongoDB, Express.js, React.js, Node.js) based blog application designed for users to explore, engage with, and contribute to content focused on holistic health and wellness. It supports role-based access, blog management, bookmarks, likes, and subscriptions.

---

-----------------------------------------------------|
## 🙋‍♀️ Admin Details======================            |
                                                     |
# Log in =>                                          |
# email id= (randhir@yopmail.com)                    |
# Password= (123456)                                 |
-----------------------------------------------------|

## 🔗 Live Features
- ✅ User registration/login with email verification
- ✅ JWT-based authentication
- ✅ Role-based access control (Admin, User)
- ✅ Blog creation, update, and categorization
- ✅ Like & bookmark functionality for blogs
- ✅ Commenting system
- ✅ GSAP-powered frontend animations
- ✅ Subscription via email
- ✅ Admin panel for content moderation
- ✅ MongoDB cloud integration

---

## 📁 Project Structure
```
├── app/
│   ├── config/            # Database connection
│   ├── controllers/       # Controller logic (Auth, Blogs, Bookmarks, etc.)
│   ├── models/            # Mongoose models
│   ├── router/            # Route files
│   └── views/             # EJS templates (optional for admin panel)
├── public/                # Static files (images, CSS)
├── uploads/               # Uploaded blog images
├── .env                   # Environment variables
├── app.js                 # Entry point (Express server)
└── package.json
```

---

## ⚙️ Environment Variables (.env)
```env
MONGO_URL=<Your MongoDB URI>
JWT_SECRET_KEY=<Your JWT Secret>
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=<Your Gmail>
EMAIL_PASS=<App Password>
EMAIL_FROM=<From Email>
BASE_URL=http://localhost:5000
```

---

## 🧪 API Endpoints (Simplified)

### Auth
```
POST   /api/auth/register      # Register user
POST   /api/auth/login         # Login user
GET    /api/auth/profile       # Get user profile
```

### Blogs
```
GET    /blogs/get              # Fetch all blogs
POST   /blogs/create           # Create a blog (Admin)
PUT    /blogs/update/:id       # Update blog
DELETE /blogs/delete/:id       # Delete blog
```

### Bookmarks & Likes
```
GET    /api/bookmarks          # Get user's bookmarks
POST   /api/bookmarks/add      # Bookmark a blog
POST   /blogs/like             # Toggle like for blog
```

### Comments
```
POST   /blogs/comment          # Add comment
GET    /blogs/comments/:id     # Get comments for a blog
```

---

## 🚀 Run Locally

### 1. Clone the repo
```bash
git clone https://github.com/your-username/wellness-bloom.git
cd wellness-bloom
```

### 2. Install dependencies
```bash
npm install
```

### 3. Setup environment
Create a `.env` file and fill in your config (see above)

### 4. Start backend server
```bash
node app.js
```

---

## 🌐 Frontend
- React-based frontend (assumed to be in a separate folder like `client/`)
- Uses:
  - Material-UI (MUI)
  - GSAP for animations
  - React Query for fetching

---

## 🙋‍♀️ Roles
- **Admin**:
  - Can manage users, categories, and blogs
- **User**:
  - Can like, comment, bookmark, and view content

---

## 📬 Contact
Built by [Randhir Kumar Singh](mailto:samirsinghj183@gmail.com) – for learning and personal development projects.
