import React, { useState, useEffect } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import axios from "axios";
import {
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  CardActions,
  CardMedia,
  Button,
  TextField,
  Chip,
  Box,
  IconButton,
  Modal,
  FormControlLabel,
  Switch,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { FaRegBookmark, FaBookmark } from "react-icons/fa";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import CommentIcon from "@mui/icons-material/Comment";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./Blog.css";

import {
  addBookmark,
  fetchBlogs,
  fetchUserBookmarks,
  postComment,
  toggleLike,
} from "../../../Functions/Content";

gsap.registerPlugin(ScrollTrigger);
const BlogPage = () => {
  const [page, setPage] = useState(1);
  const [darkMode, setDarkMode] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [tagFilter, setTagFilter] = useState("");
  const [bookmarkedIds, setBookmarkedIds] = useState([]);
  const [likeCounts, setLikeCounts] = useState({});
  const [likedBlogs, setLikedBlogs] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [commentText, setCommentText] = useState("");
  const [selectedBlogId, setSelectedBlogId] = useState(null);
  const navigate = useNavigate();

  const {
    data: blogs = [],
    isLoading,
    error,
  } = useQuery({
    queryKey: ["blogs", page, tagFilter],
    queryFn: () => fetchBlogs(page, tagFilter),
  });

  const { data: userBookmarks = [], refetch: refetchBookmarks } = useQuery({
    queryKey: ["userBookmarks"],
    queryFn: fetchUserBookmarks,
    onSuccess: (data) => setBookmarkedIds(data),
  });

  const bookmarkMutation = useMutation({
    mutationFn: addBookmark,
    onSuccess: (_, blogId) => {
      setBookmarkedIds((prev) => [...prev, blogId]);
      refetchBookmarks();
      toast.success("Blog bookmarked!");
    },
    onError: () => {
      toast.error("Failed to bookmark blog.");
    },
  });

  const commentMutation = useMutation({
    mutationFn: postComment,
    onSuccess: (data) => {
      toast.success("Comment added!");
      handleCloseModal();
    },
    onError: (err) => {
      toast.error(err?.response?.data?.message || "Failed to add comment");
    },
  });

  const handleBookmark = (blogId) => {
    if (!bookmarkedIds.includes(blogId)) {
      bookmarkMutation.mutate(blogId);
    } else {
      toast.info("Already bookmarked");
    }
  };

  const likeMutation = useMutation({
  mutationFn: toggleLike,
  onSuccess: (data, blogId) => {
    setLikedBlogs((prev) =>
      prev.includes(blogId)
        ? prev.filter((id) => id !== blogId)
        : [...prev, blogId]
    );

    setLikeCounts((prev) => ({
      ...prev,
      [blogId]: data.likes,
    }));
  },
  onError: (err) => {
    toast.error(err?.response?.data?.message || "Failed to like blog.");
  },
});


  const handleLike = (blogId) => {
  likeMutation.mutate(blogId);
};


  const handleOpenCommentModal = (blogId) => {
    setSelectedBlogId(blogId);
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
    setCommentText("");
    setSelectedBlogId(null);
  };

  const handleSubmitComment = () => {
    if (!commentText.trim() || !selectedBlogId) {
      toast.warn("Please write something!");
      return;
    }
    commentMutation.mutate({ blogId: selectedBlogId, text: commentText });
  };
  useEffect(() => {
    const counts = {};
    const liked = [];

    blogs.forEach((blog) => {
      counts[blog._id] = blog.likes?.length || 0;
      if (blog.likes?.includes(localStorage.getItem("userId"))) {
        liked.push(blog._id);
      }
    });

    setLikeCounts(counts);
    setLikedBlogs(liked);
  }, [blogs]);

  useEffect(() => {
    gsap.from(".blog-card", {
      opacity: 0,
      y: 30,
      duration: 1,
      stagger: 0.5,
      delay: 0.8,
      ease: "power3.out",
      scrollTrigger: {
        trigger: ".blog-card",
        start: "top 85%",
        toggleActions: "play none none none",
      },
    });
  }, [blogs]);

  return (
    <>
      <ToastContainer position="top-right" autoClose={3000} />
      <div className={darkMode ? "dark-mode" : "light-mode"}>
        <Container maxWidth="lg" className="home-container">
          <span className="page-eyebrow">WellnessBloom Library</span>
          <Typography variant="h3" gutterBottom className="title">
            Health & Wellness Blogs
          </Typography>
          <div className="title-divider" />

          <Box className="filter-section">
            <TextField
              label="Search by Tag"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              size="small"
              variant="outlined"
              className="filter-input"
            />

            <Button
              variant="contained"
              onClick={() => setTagFilter(searchTerm.trim())}
              className="filter-button"
            >
              Filter
            </Button>

            <FormControlLabel
              className="dark-mode-toggle"
              control={
                <Switch
                  checked={darkMode}
                  onChange={() => setDarkMode(!darkMode)}
                />
              }
              label="Dark Mode"
            />
          </Box>

          {isLoading && (
            <Typography className="blog-state-text">Loading...</Typography>
          )}
          {error && (
            <Typography className="blog-state-text blog-state-error">
              Error loading blogs
            </Typography>
          )}

          <Grid container spacing={3}>
            {blogs.map((blog) => {
              const isBookmarked = bookmarkedIds.includes(blog._id);
              const isLiked = likedBlogs.includes(blog._id);

              return (
                <Grid item xs={12} md={4} key={blog._id} className="grid-item">
                  <Card className="blog-card">
                    <div className="blog-card-media-wrap">
                      <CardMedia
                        component="img"
                        height="200"
                        image={`https://ai-powerd-health-and-wellness-blog.onrender.com/${blog.image}`}
                        alt={blog.title}
                        className="blog-card-media"
                      />
                    </div>
                    <CardContent className="blog-card-content">
                      <Typography variant="h5" gutterBottom className="blog-title">
                        {blog.title}
                      </Typography>
                      <Typography variant="body2" className="blog-content">
                        {blog.content.substring(0, 100)}...
                      </Typography>
                      <Box className="blog-tags-row">
                        {blog.tags.map((tag, index) => (
                          <Chip
                            key={index}
                            label={tag}
                            size="small"
                            className="blog-tag"
                          />
                        ))}
                      </Box>
                    </CardContent>
                    <CardActions className="blog-card-actions">
                      <Button
                        size="small"
                        className="blog-read-more"
                        onClick={() => navigate(`/blogs/${blog._id}`)}
                      >
                        Read More
                      </Button>

                      <IconButton onClick={() => handleBookmark(blog._id)}>
                        {isBookmarked ? (
                          <FaBookmark color="#2e7d32" />
                        ) : (
                          <FaRegBookmark />
                        )}
                      </IconButton>

                      <Box display="flex" alignItems="center">
                        <IconButton onClick={() => handleLike(blog._id)}>
                          {likedBlogs.includes(blog._id) ? (
                            <FavoriteIcon color="error" />
                          ) : (
                            <FavoriteBorderIcon />
                          )}
                        </IconButton>
                        <Typography variant="body2" className="like-count">
                          {likeCounts[blog._id] || 0}
                        </Typography>
                      </Box>

                      <IconButton
                        onClick={() => handleOpenCommentModal(blog._id)}
                      >
                        <CommentIcon />
                      </IconButton>
                    </CardActions>
                  </Card>
                </Grid>
              );
            })}
          </Grid>
          <Box className="pagination-row">
            <Button
              variant="outlined"
              className="pagination-button"
              disabled={page === 1}
              onClick={() => setPage((prev) => prev - 1)}
            >
              Previous
            </Button>
            <span className="pagination-page">Page {page}</span>
            <Button
              variant="outlined"
              className="pagination-button"
              onClick={() => setPage((prev) => prev + 1)}
              disabled={blogs?.length < 3} // Disable if fewer blogs than per_page
            >
              Next
            </Button>
          </Box>
        </Container>

        {/* Comment Modal */}
        <Modal open={openModal} onClose={handleCloseModal}>
          <Box className="comment-modal">
            <Typography variant="h6" gutterBottom className="comment-modal-title">
              Leave a Comment
            </Typography>
            <TextField
              fullWidth
              multiline
              rows={4}
              value={commentText}
              onChange={(e) => setCommentText(e.target.value)}
              placeholder="Write your comment..."
              className="comment-modal-input"
            />
            <Box mt={2} textAlign="right">
              <Button
                onClick={handleSubmitComment}
                variant="contained"
                className="comment-modal-submit"
              >
                Submit
              </Button>
            </Box>
          </Box>
        </Modal>
      </div>
    </>
  );
};

export default BlogPage;
