import React, { useEffect, useMemo, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import {
  Container,
  Typography,
  Box,
  Chip,
  Grid,
  Card,
  CardContent,
  CardActions,
  Button,
  CardMedia,
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import CalendarTodayOutlinedIcon from "@mui/icons-material/CalendarTodayOutlined";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import "./BlogDetails.css";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import { fetchBlogDetails } from "../../../Functions/Content";
import { end_points } from "../../../Api/api";
import axiosInstance from "../../../Api/axiosInstance";

gsap.registerPlugin(ScrollTrigger);

const BlogDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const pageRef = useRef(null);

  const {
    data: blog,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["blog", id],
    queryFn: () => fetchBlogDetails(id),
    enabled: !!id,
  });

  let api = end_points.FetchBlogs;
  const { data: allBlogs = [] } = useQuery({
    queryKey: ["allBlogs"],
    queryFn: async () => {
      const { data } = await axiosInstance.get(api);
      return data;
    },
  });

  // ---- Robust related-posts logic ----
  // Falls back through category -> shared tags -> most recent posts,
  // so a blog always shows related posts instead of an empty/inconsistent list.
  const relatedBlogs = useMemo(() => {
    if (!blog || !allBlogs.length) return [];

    const others = allBlogs.filter((b) => b._id !== blog._id && b._id !== id);

    let byCategory = [];
    if (blog.category) {
      byCategory = others.filter((b) => b.category === blog.category);
    }

    let result = byCategory;

    if (result.length === 0 && blog.tags?.length) {
      result = others.filter((b) =>
        b.tags?.some((tag) => blog.tags.includes(tag))
      );
    }

    if (result.length === 0) {
      result = [...others].sort(
        (a, b) => new Date(b.date) - new Date(a.date)
      );
    }

    return result.slice(0, 3);
  }, [allBlogs, blog, id]);

  useEffect(() => {
    if (!blog) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

      tl.from(".blog-hero-image", { opacity: 0, scale: 1.05, duration: 1 })
        .from(
          ".blog-meta-row",
          { opacity: 0, y: 14, duration: 0.5 },
          "-=0.55"
        )
        .from(
          ".blog-detail-title",
          { opacity: 0, y: 20, duration: 0.6 },
          "-=0.4"
        )
        .from(
          ".blog-tag-chip",
          { opacity: 0, y: 10, stagger: 0.06, duration: 0.4 },
          "-=0.3"
        )
        .from(
          ".blog-content",
          { opacity: 0, y: 16, duration: 0.6, stagger: 0.08 },
          "-=0.25"
        );

      gsap.from(".related-card", {
        opacity: 0,
        y: 24,
        duration: 0.7,
        stagger: 0.12,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".related-section",
          start: "top 85%",
          toggleActions: "play none none none",
        },
      });
    }, pageRef);

    return () => ctx.revert();
  }, [blog, relatedBlogs]);

  const contentParagraphs = useMemo(() => {
    if (!blog?.content) return [];
    return blog.content
      .split(/\n\s*\n|\n/)
      .map((p) => p.trim())
      .filter(Boolean);
  }, [blog]);

  const readingTime = useMemo(() => {
    if (!blog?.content) return null;
    const words = blog.content.trim().split(/\s+/).length;
    return Math.max(1, Math.round(words / 200));
  }, [blog]);

  if (isLoading) {
    return (
      <Container maxWidth="md" className="blog-state-container">
        <Typography className="blog-state-text">Loading article…</Typography>
      </Container>
    );
  }

  if (error || !blog) {
    return (
      <Container maxWidth="md" className="blog-state-container">
        <Typography className="blog-state-text blog-state-error">
          Blog not found.
        </Typography>
      </Container>
    );
  }

  return (
    <div className="blog-detail-page" ref={pageRef}>
      <Container maxWidth="md" className="blog-detail-container">
        <Button
          startIcon={<ArrowBackIcon />}
          className="blog-back-button"
          onClick={() => navigate(-1)}
        >
          Back
        </Button>

        {/* Hero image */}
        <Box className="blog-hero-wrap">
          <img
            className="blog-hero-image"
            src={`https://ai-powerd-health-and-wellness-blog.onrender.com/${blog.image}`}
            alt={blog.title}
          />
        </Box>

        {/* Meta row */}
        <Box className="blog-meta-row">
          <span className="blog-meta-item">
            <PersonOutlineIcon fontSize="small" />
            {blog.authorId}
          </span>
          <span className="blog-meta-divider">•</span>
          <span className="blog-meta-item">
            <CalendarTodayOutlinedIcon fontSize="small" />
            {new Date(blog.date).toLocaleDateString(undefined, {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </span>
          {readingTime && (
            <>
              <span className="blog-meta-divider">•</span>
              <span className="blog-meta-item">
                <AccessTimeIcon fontSize="small" />
                {readingTime} min read
              </span>
            </>
          )}
        </Box>

        <Typography variant="h3" className="blog-detail-title">
          {blog.title}
        </Typography>

        <Box className="blog-tags-row">
          {blog.tags && blog.tags.length > 0 ? (
            blog.tags.map((tag, index) => (
              <Chip
                label={tag}
                key={index}
                size="small"
                className="blog-tag-chip"
              />
            ))
          ) : (
            <Typography variant="body2" className="blog-no-tags">
              No tags available
            </Typography>
          )}
        </Box>

        <div className="blog-divider" />

        <div className="blog-article-body">
          {contentParagraphs.map((para, idx) => (
            <Typography
              key={idx}
              variant="body1"
              className={`blog-content${idx === 0 ? " blog-content-first" : ""}`}
            >
              {para}
            </Typography>
          ))}
        </div>

        <Box marginTop={6} className="related-section">
          <Typography variant="h5" className="related-heading">
            Related Posts
          </Typography>

          <Grid container spacing={3}>
            {relatedBlogs.length === 0 && (
              <Grid item xs={12}>
                <Typography className="blog-no-tags">
                  No related posts found.
                </Typography>
              </Grid>
            )}
            {relatedBlogs.map((relatedBlog) => (
              <Grid size={{ xs: 12, sm: 6, md: 6, lg: 6 }} key={relatedBlog._id}>
                <Card className="related-card">
                  <CardMedia
                    component="img"
                    height="170"
                    image={`https://ai-powerd-health-and-wellness-blog.onrender.com/${relatedBlog.image}`}
                    alt={relatedBlog.title}
                    className="related-card-media"
                  />
                  <CardContent className="related-card-content">
                    <Typography variant="h6" className="related-card-title">
                      {relatedBlog.title}
                    </Typography>
                    <Typography variant="body2" className="related-card-text">
                      {relatedBlog.content.substring(0, 80)}...
                    </Typography>
                  </CardContent>
                  <CardActions className="related-card-actions">
                    <Button
                      size="small"
                      className="related-card-button"
                      onClick={() => navigate(`/blogs/${relatedBlog._id}`)}
                    >
                      Read More →
                    </Button>
                  </CardActions>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Box>
      </Container>
    </div>
  );
};

export default BlogDetailPage;
