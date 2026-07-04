import React, { useEffect, useRef, useState } from "react";
import { Container, Typography, Button, Grid } from "@mui/material";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import SpaIcon from "@mui/icons-material/Spa";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import "./Home.css";

import BlogPage from "../Blog/Blog";
import TermsPage from "../StaticPages/Terms/Terms";
import PrivacyPolicyPage from "../StaticPages/PrivacyPolicy/PrivacyPolicy";

gsap.registerPlugin(ScrollTrigger);

const HomePage = () => {
  const heroRef = useRef(null);
  const [darkMode, setDarkMode] = useState(false);

  const scrollToBlogs = () => {
    document
      .querySelector(".home-container")
      ?.scrollIntoView({ behavior: "smooth" });
  };

  // ---- Hero entrance animation ----
  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

      tl.from(".hero-badge", { opacity: 0, y: -20, duration: 0.6 })
        .from(
          ".hero-title .char",
          { opacity: 0, y: 40, rotateX: -40, stagger: 0.03, duration: 0.8 },
          "-=0.2"
        )
        .from(".hero-subtitle", { opacity: 0, y: 20, duration: 0.7 }, "-=0.4")
        .from(
          ".hero-cta",
          { opacity: 0, y: 16, scale: 0.92, duration: 0.6 },
          "-=0.35"
        )
        .from(
          ".hero-scroll-cue",
          { opacity: 0, duration: 0.6 },
          "-=0.2"
        );

      // slow ambient zoom on the background
      if (window.innerWidth > 768) {
        gsap.fromTo(
          heroRef.current,
          { backgroundSize: "112%" },
          {
            backgroundSize: "100%",
            duration: 6,
            ease: "power1.out",
          }
        );
      }

      // ambient glow drift — slow, subtle, professional
      gsap.to(".hero-glow-1", {
        x: 60,
        y: -30,
        duration: 14,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });
      gsap.to(".hero-glow-2", {
        x: -50,
        y: 40,
        duration: 16,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });

      // scroll cue bounce
      gsap.to(".hero-scroll-cue", {
        y: 8,
        duration: 1,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });
    }, heroRef);

    return () => ctx.revert();
  }, []);

  const heroTitle = "Our Wellness Journey";

  return (
    <>

      <section className="hero-section" ref={heroRef}>
        <span className="hero-glow hero-glow-1" />
        <span className="hero-glow hero-glow-2" />

        <Container maxWidth="md">
          <span className="hero-badge">
            <SpaIcon fontSize="small" /> Health &amp; Wellness Blog
          </span>

          <Typography variant="h2" className="hero-title" aria-label={heroTitle}>
            {heroTitle.split("").map((char, i) => (
              <span className="char" key={i}>
                {char === " " ? "\u00A0" : char}
              </span>
            ))}
          </Typography>

          <Typography variant="subtitle1" className="hero-subtitle">
            Discover the story behind WellnessBloom and our commitment to your
            health and happiness
          </Typography>

          <Button
            className="hero-cta"
            variant="contained"
            size="large"
            onClick={scrollToBlogs}
          >
            Explore Blogs
          </Button>
        </Container>

        <button
          className="hero-scroll-cue"
          onClick={scrollToBlogs}
          aria-label="Scroll to blogs"
        >
          <KeyboardArrowDownIcon />
        </button>
      </section>


      <div className={darkMode ? "dark-mode" : "light-mode"}>
        <BlogPage />

        <TermsPage />
        <PrivacyPolicyPage />
      </div>
    </>
  );
};

export default HomePage;