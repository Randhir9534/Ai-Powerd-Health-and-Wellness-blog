const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const connectDB = require('./app/config/db');
const cors=require('cors')
const path=require('path')
const fs=require('fs')
const session=require('express-session')
const cookieParser = require("cookie-parser");
const flash=require('connect-flash')
const authRoutes = require('./app/router/authRoutes');
const blogRoutes = require('./app/router/blogRoutes');
const categoryRoutes = require('./app/router/categoryRoutes');
const bookmarkRoutes = require('./app/router/bookmarkRoutes');
const subscriptionRoutes = require('./app/router/SubsRoutes');
// const errorMiddleware = require('./middlewares/error.middleware');
const adminRoute = require("./app/router/routing");
const app = express();

dotenv.config();
// Connect MongoDB
connectDB()

// cors for connect with react
app.use(cors({
  origin:"https://ai-powerd-health-and-wellness-blog-eight.vercel.app"
}))

app.use(express.urlencoded({ extended: true })); 
app.use(express.json()); 

// View engine
app.set("view engine", "ejs");
app.set("views", "views");

// Cookie & session
app.use(
  session({
    secret: "keyboardcat",
    resave: false,
    saveUninitialized: false,
    cookie: {
      maxAge: 1000 * 60 * 60 * 24,
    },
  })
);
app.use(cookieParser());
app.use(flash())
app.use((req, res, next) => {
    res.locals.success_msg = req.flash('success_msg') || null;
    res.locals.error_msg = req.flash('error_msg') || null;
    next();
});


// ========== static ================
app.use(express.static('public'));
app.use('uploads',express.static(path.join(__dirname,'/uploads')))
app.use('/uploads',express.static('uploads'))

// Routes
app.use(adminRoute);
app.use('/api/auth', authRoutes);
app.use('/blogs', blogRoutes);
app.use('/categories', categoryRoutes);
app.use('/api/bookmarks', bookmarkRoutes);
app.use('/subscription', subscriptionRoutes);

// app.use(errorMiddleware);


const PORT = 9001;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));


