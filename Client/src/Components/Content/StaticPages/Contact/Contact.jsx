import React from 'react';
import { Container, Typography, TextField, Button, Box } from '@mui/material';
import './Contact.css';

const ContactPage = () => {
  return (
    <Box className="contact-section">
      <Container maxWidth="lg" className="contact-container">
        <span className="contact-eyebrow">We'd love to hear from you</span>
        <Typography variant="h3" gutterBottom className="contact-title">
          Contact Us
        </Typography>
        <Typography variant="body1" paragraph className="contact-subtitle">
          Have questions? We're here to help!
        </Typography>

        <Box className="contact-content">
          {/* Left Column - Map */}
          <Box className="map-wrapper">
            <iframe
              title="Our Location"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3153.0196120715323!2d-122.4217784846817!3d37.77492977975921!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8085815d6e5c0d91%3A0x8a7885d4f8cb6e3e!2sSan%20Francisco%2C%20CA%2C%20USA!5e0!3m2!1sen!2sin!4v1655123456789!5m2!1sen!2sin"
              width="100%"
              height="100%"
              style={{ border: '0' }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>

            <Box className="map-info">
              <Typography variant="h6">Our Location</Typography>
              <Typography variant="body2">
                123 Wellness Street<br />
                San Francisco, CA 94102
              </Typography>
            </Box>
          </Box>

          {/* Right Column - Form */}
          <Box className="form-wrapper">
            <Typography variant="h5" gutterBottom className="form-title">
              Send us a message
            </Typography>
            <Typography variant="body2" className="form-subtitle">
              We typically reply within 24 hours
            </Typography>
            <Box component="form" className="contact-form">
              <TextField
                fullWidth
                label="Your Name"
                variant="outlined"
                required
                margin="normal"
              />
              <TextField
                fullWidth
                label="Email Address"
                variant="outlined"
                type="email"
                required
                margin="normal"
              />
              <TextField
                fullWidth
                label="Subject"
                variant="outlined"
                margin="normal"
              />
              <TextField
                fullWidth
                label="Your Message"
                variant="outlined"
                multiline
                rows={3}
                required
                margin="normal"
              />
              <Button
                type="submit"
                variant="contained"
                color="primary"
                size="large"
                fullWidth
                className="submit-button"
                sx={{ mt: 2 }}
              >
                Send Message
              </Button>
            </Box>
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

export default ContactPage;