import React, { useEffect } from 'react'; 
import { Container, Typography, Box, Divider, Grid } from '@mui/material';
import gsap from 'gsap';
import './PrivacyPolicy.css';
import ScrollTrigger from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);
const PrivacyPolicyPage = () => {
  useEffect(() => {
    gsap.from(".privacy-image", {
        y: 1000,
        duration: 1.5,
        delay: 0.8,
        rotate: 720,
        filter: "grayscale(100%)",
        scrollTrigger: {
          trigger: ".privacy-image",
          start: "top 90%",
          toggleActions: "play none none none"
        }
      });
    gsap.from('.privacy-section,.privacy-section-list2', {
      opacity: 0,
      y: 50,
      duration: 1.5,
      delay:0.5,
      stagger: 0.2,
      ease: 'power2.out',
      scrollTrigger:{
        trigger:".privacy-section",
        start:"top 85%",
        toggleActions:"play none none none"
      }
    });
  }, []);

  return (
    <Box sx={{ py: 6 }}>
      <Container maxWidth="lg">
        <Typography variant="h3" gutterBottom className="privacy-section heading">
          Privacy Policy
        </Typography>
        <Typography variant="subtitle1" className="privacy-section subtitle" gutterBottom>
          Last Updated: June 5, 2025
        </Typography>
        <hr/>
        <Grid container spacing={4} alignItems="center" className="privacy-section">
          <Grid item xs={12} md={6}>
            <img 
              src="https://images.unsplash.com/photo-1669355106052-b7456721510c?q=80&w=1928&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" 
              alt="Privacy Hero" 
              className="privacy-image"
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <Typography variant="body1" paragraph>
              At <strong style={{color:"green"}}>WellnessBloom</strong>, your privacy is a top priority. This Privacy Policy outlines how we collect, use,
              and protect your information when you use our health & wellness blog platform.
            </Typography>
          </Grid>
        </Grid>

        <Grid container spacing={4} alignItems="center" className="privacy-section-list2">
          <Grid item xs={12} md={6} order={{ xs: 2, md: 1 }}>
            <Typography variant="h5" gutterBottom>
             <strong>Information We Collect</strong> 
            </Typography>
            <Typography variant="body1" paragraph>
              We may collect the following information when you interact with WellnessBloom:
              <ul>
                <li>Personal identification information (Name, email address, etc.)</li>
                <li>Subscription preferences</li>
                <li>Blog interaction history (likes, bookmarks)</li>
                <li>Feedback and contact messages</li>
              </ul>
            </Typography>
          </Grid>
          <Grid item xs={12} md={6} order={{ xs: 1, md: 2 }}>
            <img 
              src="https://images.unsplash.com/photo-1535914254981-b5012eebbd15?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" 
              alt="Information Collected" 
              className="privacy-image"
            />
          </Grid>
        </Grid>

        <Grid container spacing={4} alignItems="center" className="privacy-section">
          <Grid item xs={12} md={6}>
            <img 
              src="https://images.unsplash.com/photo-1604480132715-bd70038b74df?q=80&w=1218&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" 
              alt="Usage of Information" 
              className="privacy-image"
            />
          </Grid>
          <Grid item xs={12} md={6} className="privacy-section-list">
            <Typography variant="h5" gutterBottom>
             <strong>How We Use Your Information</strong> 
            </Typography>
            <Typography variant="body1" paragraph>
              We use the information collected to:
              <ul>
                <li>Personalize your reading experience</li>
                <li>Send curated wellness newsletters and updates</li>
                <li>Improve our content and user experience</li>
                <li>Respond to your messages and support queries</li>
              </ul>
            </Typography>
          </Grid>
        </Grid>

        <Grid container spacing={4} alignItems="center" className="privacy-section">
          <Grid item xs={12} md={6} >
            <Typography variant="h5" gutterBottom>
             <strong>Data Protection & Security</strong> 
            </Typography>
            <Typography variant="body1" paragraph>
              We implement appropriate security measures to prevent unauthorized access or disclosure of your personal data.
              However, no method of transmission over the internet is completely secure, so we cannot guarantee its absolute safety.
            </Typography>
          </Grid>
          <Grid item xs={12} md={6} >
            <img 
              src="https://images.unsplash.com/photo-1676291920753-dd019397927a?q=80&w=1171&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" 
              alt="Data Protection" 
              className="privacy-image"
            />
          </Grid>
        </Grid>
        <Grid container spacing={4} alignItems="center" className="privacy-section">
          <Grid item xs={12} md={6}>
            <Typography variant="h5" gutterBottom>
             <strong>Your Rights</strong> 
            </Typography>
            <Typography variant="body1" paragraph>
              You have the right to access, update, or delete your personal data at any time. Please contact us at support@wellnessbloom.com
              for any data-related inquiries.
            </Typography>
          </Grid>
        </Grid>
        <Typography variant="h6" gutterBottom className="privacy-section">
         <i style={{color:"green"}}>Thank you for trusting WellnessBloom. Your privacy matters to us.</i> 
        </Typography>
      </Container>
    </Box>
  );
};

export default PrivacyPolicyPage;
