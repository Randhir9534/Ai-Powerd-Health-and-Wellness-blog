import React, { useEffect, useRef } from "react";
import {
  Container,
  Typography,
  Box,
  Grid,
  Card,
  CardContent,
} from "@mui/material";
import {
  FaHeartbeat,
  FaHandsHelping,
  FaUserShield,
  FaLinkedin,
  FaTwitter,
} from "react-icons/fa";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import "./About.css";

gsap.registerPlugin(ScrollTrigger);

const AboutPage = () => {
  const missionRefs = useRef([]);
  const teamRefs = useRef([]);
  const titleRef = useRef();
  const aboutTextRef = useRef();

  const teamMembers = [
    {
      name: "Dr. Sarah Johnson",
      role: "Chief Medical Officer",
      image:
        "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&h=500",
    },
    {
      name: "Michael Chen",
      role: "Nutrition Specialist",
      image:
        "https://images.unsplash.com/photo-1594824476967-48c8b964273f?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&h=600",
    },
    {
      name: "Emma Rodriguez",
      role: "Mental Health Expert",
      image:
        "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&h=500",
    },
  ];

  useEffect(() => {
    // Animate title and about text on load
    gsap.from(titleRef.current, {
      duration: 1,
      y: -50,
      opacity: 0,
      ease: "power3.out",
    });

    gsap.from(aboutTextRef.current.children, {
      duration: 1,
      y: 30,
      opacity: 0,
      stagger: 0.2,
      delay: 0.5,
      ease: "power2.out",
    });

    // ScrollTrigger for mission section
    missionRefs.current.forEach((ref, i) => {
      gsap.from(ref, {
        scrollTrigger: {
          trigger: ref,
          start: "top 80%",
        },
        opacity: 0,
        y: 50,
        duration: 1,
        ease: "power3.out",
        delay: i * 0.2,
      });
    });

    // ScrollTrigger for team section
    teamRefs.current.forEach((ref, i) => {
      gsap.from(ref, {
        scrollTrigger: {
          trigger: ref,
          start: "top 85%",
        },
        opacity: 0,
        scale: 0.9,
        duration: 1,
        ease: "back.out(1.7)",
        delay: i * 0.2,
      });
    });
  }, []);

  return (
    <>
      <Box className="about-background">
        <Container maxWidth="lg">
          <Box className="section-title" ref={titleRef}>
            <Typography variant="h3" component="h3" className="section-title-text">
              About WellnessBloom
            </Typography>
          </Box>
          <Grid container spacing={4} alignItems="center" ref={aboutTextRef}>
            <Grid item xs={12} md={6}>
              <Typography variant="body1" paragraph className="about-text">
                Welcome to WellnessBloom, your trusted resource for holistic health and wellness.
                Founded in 2020, we've grown from a small blog to a comprehensive platform serving millions of readers worldwide.
              </Typography>
              <Typography variant="body1" paragraph className="about-text">
                Our mission is simple: to provide science-backed, practical health information that empowers you to make the best choices for your wellbeing.
              </Typography>
              <Typography variant="body1" paragraph className="about-text">
                What sets us apart is our team of certified health professionals who review all our content to ensure accuracy and reliability.
              </Typography>
            </Grid>
          </Grid>
        </Container>
      </Box>

      <Box className="mission-section">
        <Container maxWidth="lg">
          <Box className="section-title">
            <Typography variant="h3" component="h3" className="section-title-text">
              Our Core Values
            </Typography>
          </Box>
          <Grid container spacing={4}>
            {[
              {
                icon: <FaHeartbeat className="mission-icon" />,
                title: "Evidence-Based",
                text: "We rely on peer-reviewed research and consult medical professionals to ensure our content is accurate and trustworthy.",
              },
              {
                icon: <FaHandsHelping className="mission-icon" />,
                title: "Holistic Approach",
                text: "We address all aspects of wellness - physical, mental, emotional, and spiritual - for comprehensive health.",
              },
              {
                icon: <FaUserShield className="mission-icon" />,
                title: "Privacy Focused",
                text: "Your data security is our priority. We never share personal information without your consent.",
              },
            ].map((item, i) => (
              <Grid item xs={12} md={4} key={i}>
                <Card className="mission-card" ref={(el) => (missionRefs.current[i] = el)}>
                  <CardContent>
                    {item.icon}
                    <Typography variant="h5" component="h3" className="mission-title">
                      {item.title}
                    </Typography>
                    <Typography variant="body1" className="mission-text">
                      {item.text}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      <Box className="team-section">
        <Container maxWidth="lg">
          <Box className="section-title">
            <Typography variant="h3" component="h3" className="section-title-text">
              Meet Our Team
            </Typography>
          </Box>
          <Grid container spacing={4} justifyContent="center">
            {teamMembers.map((member, i) => (
              <Grid item key={i} xs={12} sm={6} md={4}>
                <Card className="team-member-card" ref={(el) => (teamRefs.current[i] = el)}>
                  <Box className="member-image-container">
                    <img src={member.image} alt={member.name} className="member-image" />
                  </Box>
                  <CardContent className="member-info">
                    <Typography variant="h5" component="h3" className="member-name">
                      {member.name}
                    </Typography>
                    <Typography variant="subtitle1" className="member-role">
                      {member.role}
                    </Typography>
                    <Box className="social-links">
                      <a href="#" className="social-link"><FaLinkedin /></a>
                      <a href="#" className="social-link"><FaTwitter /></a>
                    </Box>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>
    </>
  );
};

export default AboutPage;
