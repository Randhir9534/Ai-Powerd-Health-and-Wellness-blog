import React, { useState } from "react";
import {
  Container,
  Typography,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  Alert,
  IconButton,
  Box,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import "./Footer.css";
import { useNavigate } from "react-router-dom";
import { subscribeUser } from "../../../../Functions/Content";

const Footer = () => {
  let navigate=useNavigate()
  const [open, setOpen] = useState(false);
  const [feedback, setFeedback] = useState(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const { mutate, isLoading } = useMutation({
    mutationFn: subscribeUser,
    onSuccess: () => {
      reset();
      setFeedback({
        type: "success",
        message: "You’ve successfully subscribed!",
      });
      navigate('/')
    },
    onError: (err) => {
      const message = err.response?.data?.message || "Subscription failed";
      setFeedback({ type: "error", message });
    },
  });

  const onSubmit = (data) => {
    setFeedback(null);
    mutate(data);
  };

  const handleOpen = () => {
    setOpen(true);
    setFeedback(null);
  };

  const handleClose = () => {
    setOpen(false);
    reset();
    setFeedback(null);
  };

  return (
    <>
      <section className="cta-section">
        <Container maxWidth="lg">
          <Typography variant="h2" component="h2" className="cta-title">
            Join Our Wellness Community
          </Typography>
          <Typography variant="body1" paragraph className="cta-text">
            Subscribe to our newsletter and receive weekly health tips,
            exclusive content, and special offers straight to your inbox.
          </Typography>
          <Button
            style={{
              fontSize: "1.2rem",
              fontWeight: "700px",
              textDecoration: "none",
              borderRadius: "50px",
              backgroundColor:"White",
              color: "green",
              padding: "18px 48px",
              boxShadow: "0 8px 24px rgba(20, 51, 22, 0.4)",
            }}
            className="cta-button2"
            variant="contained"
            color="success"
            onClick={handleOpen}
          >
            Subscribe Now
          </Button>
        </Container>
      </section>

      <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
        <DialogTitle
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Typography variant="h5" fontWeight={600} color="success.main">
            Join WellnessBloom
          </Typography>
          <IconButton onClick={handleClose}>
            <CloseIcon />
          </IconButton>
        </DialogTitle>

        <DialogContent dividers>
          <Typography variant="subtitle1" mb={2}>
            Get exclusive health tips and wellness updates.
          </Typography>

          {feedback && (
            <Alert severity={feedback.type} sx={{ mb: 2 }}>
              {feedback.message}
            </Alert>
          )}

          <form onSubmit={handleSubmit(onSubmit)} id="subscribe-form">
            <TextField
              label="Email Address"
              type="email"
              fullWidth
              margin="normal"
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^\S+@\S+$/i,
                  message: "Invalid email address",
                },
              })}
              error={!!errors.email}
              helperText={errors.email?.message}
            />
          </form>
        </DialogContent>

        <DialogActions sx={{ px: 3, pb: 2 }}>
          <Button onClick={handleClose} variant="outlined">
            Cancel
          </Button>
          <Button
            type="submit"
            form="subscribe-form"
            variant="contained"
            color="success"
            disabled={isLoading}
          >
            {isLoading ? "Subscribing..." : "Subscribe"}
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default Footer;
