import React, { useEffect, useState } from "react";
import {
  Container,
  Typography,
  Box,
  Grid,
  Switch,
  FormControlLabel,
} from "@mui/material";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import "./Terms.css";

gsap.registerPlugin(ScrollTrigger);
const TermsPage = () => {
  useEffect(() => {
  gsap.from(".image", {
    y: 1000,
    duration: 1.5,
    delay: 0.5,
    rotate: 720,
    filter: "grayscale(100%)",
    scrollTrigger: {
      trigger: ".tt",
      start: "top 90%",
      toggleActions: "play none none none"
    }
  });

}, []);


  return (
    <Box
      // className={darkMode ? "dark-mode" : "light-mode"}
      sx={{ minHeight: "100vh", py: 4 }}
    >
      <Container maxWidth="lg" className="static-container" >

        <Typography
           className="tt"
          variant="h3"
          gutterBottom
          sx={{ fontWeight: "bold", textAlign: "center", color: "#4caf50" }}
        >
          WellnessBloom Terms & Conditions
        </Typography>
        <hr/>
        <Box sx={{ flexGrow: 1 }}>
      <Grid container spacing={3}>
        <Grid size={{ xs: 12, md: 6 }}>
          <div  className='image'><img style={{width:"358px"}} src='https://images.unsplash.com/photo-1483721310020-03333e577078?q=80&w=1228&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'></img></div>
        </Grid>
        <Grid size={{ xs: 12, md: 6 }}>
          <div className="desc" >Welcome to WellnessBloom! These Terms & Conditions govern your access to and use of our health & wellness blog. By continuing to browse or use our site, you accept these terms in full.</div>
        </Grid>
        <Grid size={{ xs: 12, md: 6 }}>
          <div  className="desc">All content provided on WellnessBloom is for informational and educational purposes only. It is not intended as a substitute for professional medical advice, diagnosis, or treatment. Always seek the advice of your physician or other qualified health provider with any questions you may have regarding a medical condition.</div>
        </Grid>
        <Grid size={{ xs: 12, md: 6 }}>
          <div className='image'><img style={{width:"358px"}}  src='https://images.unsplash.com/photo-1604480132736-44c188fe4d20?q=80&w=1290&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'></img></div>
        </Grid>
        <Grid size={{ xs: 12, md: 6 }}>
          <div className='image'><img style={{width:'358px'}}  src='https://images.unsplash.com/photo-1604480132738-bc508cb80a2f?q=80&w=1332&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'></img></div>
        </Grid>
        <Grid size={{ xs: 12, md: 6 }}>
          <div  className="desc">We reserve the right to modify or replace these Terms & Conditions at any time. Continued use of the website after any changes indicates your acceptance of the new terms.</div>
        </Grid>
        <Grid size={{ xs: 12, md: 6 }}>
          <div  className="desc">WellnessBloom may contain links to third-party websites for your convenience. We do not endorse and are not responsible for their content, practices, or availability.</div>
        </Grid>
        <Grid size={{ xs: 12, md: 6 }}>
          <div className='image'><img style={{width:"358px"}}  src='https://images.unsplash.com/photo-1604480133395-484d7dd2bf54?q=80&w=1285&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'></img></div>
        </Grid>
      </Grid>
    </Box>
      </Container>
    </Box>
  );
};

export default TermsPage;
