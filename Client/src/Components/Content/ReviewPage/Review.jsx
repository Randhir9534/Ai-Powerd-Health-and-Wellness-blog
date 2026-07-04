import React, { useEffect, useRef } from "react";
import { useQuery } from "@tanstack/react-query";
import gsap from "gsap";
import {
  Container,
  Typography,
  Box,
  CircularProgress,
} from "@mui/material";
import RateReviewIcon from "@mui/icons-material/RateReview";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import NotesIcon from "@mui/icons-material/Notes";
import { fetchReviews } from "../../../Functions/Content";
import "./review.css";

const ReviewPage = () => {
  const {
    data: reviews = [],
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["reviews"],
    queryFn: fetchReviews,
  });

  const headerRef = useRef(null);
  const pulseRef = useRef(null);
  const gridRef = useRef(null);

  // Header + signature pulse-line entrance (runs once on mount)
  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

      tl.from(".review-eyebrow", { y: -16, opacity: 0, duration: 0.5 })
        .from(".review-title", { y: 16, opacity: 0, duration: 0.6 }, "-=0.3")
        .from(".review-subtitle", { y: 12, opacity: 0, duration: 0.5 }, "-=0.35");

      const path = pulseRef.current?.querySelector(".pulse-path");
      const dot = pulseRef.current?.querySelector(".pulse-dot");

      if (path) {
        const length = path.getTotalLength();
        gsap.set(path, { strokeDasharray: length, strokeDashoffset: length });
        tl.to(
          path,
          { strokeDashoffset: 0, duration: 1.2, ease: "power2.inOut" },
          "-=0.2"
        );
      }
      if (dot) {
        gsap.to(dot, {
          repeat: -1,
          yoyo: true,
          duration: 1.4,
          scale: 1.3,
          transformOrigin: "center",
          ease: "sine.inOut",
        });
      }
    }, headerRef);

    return () => ctx.revert();
  }, []);

  // Card stagger entrance whenever reviews load
  useEffect(() => {
    if (!reviews.length) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".review-card",
        { y: 36, opacity: 0, scale: 0.96 },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 0.7,
          ease: "power3.out",
          stagger: 0.12,
        }
      );
    }, gridRef);

    return () => ctx.revert();
  }, [reviews]);

  return (
    <div className="review-page">
      <Container maxWidth="lg">
        <div ref={headerRef} className="review-header">
          <span className="review-eyebrow">
            <RateReviewIcon />
            Patient &amp; Reader Feedback
          </span>
          <Typography variant="h4" className="review-title">
            Blog Reviews
          </Typography>
          <Typography variant="subtitle1" className="review-subtitle">
            Here&apos;s what readers are saying about our blogs
          </Typography>

          {/* Signature element: animated pulse / heartbeat line */}
          <svg
            ref={pulseRef}
            className="pulse-divider"
            viewBox="0 0 440 56"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              className="pulse-path"
              d="M0,28 L130,28 L150,8 L170,48 L190,12 L210,28 L440,28"
            />
            <circle className="pulse-dot" cx="440" cy="28" r="4" />
          </svg>
        </div>

        {isLoading && (
          <Box className="review-loading">
            <CircularProgress sx={{ color: "#0f766e" }} />
          </Box>
        )}

        {isError && (
          <Box className="review-error">
            <Typography component="p">Failed to load reviews.</Typography>
          </Box>
        )}

        {!isLoading && !isError && reviews.length === 0 && (
          <Typography className="review-empty">
            No reviews yet — be the first to share your thoughts.
          </Typography>
        )}

        <div className="review-grid" ref={gridRef}>
          {reviews.map((review, index) => (
            <div className="review-card" key={review._id || index}>
              <div className="review-card-body">
                <div>
                  <div className="review-card-top">
                    <img
                      className="review-blog-thumb"
                      src={`https://ai-powerd-health-and-wellness-blog.onrender.com/${review.blogImg}`}
                      alt={review.blogTitle}
                    />
                    <p className="review-blog-title">
                      <NotesIcon />
                      {review.blogTitle}
                    </p>
                  </div>

                  <span className="review-comment-label">Comment</span>
                  <p className="review-comment-text">{review.text}</p>
                </div>

                <div className="review-card-footer">
                  <div className="review-author">
                    <img
                      className="review-author-avatar"
                      src={`http://localhost:9001/${review.userImg}`}
                      alt={review.userName}
                    />
                    <span className="review-author-name">
                      {review.userName}
                    </span>
                  </div>
                  <span className="review-date">
                    <CalendarTodayIcon />
                    {new Date(review.createdAt).toLocaleDateString()}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </Container>
    </div>
  );
};

export default ReviewPage;
