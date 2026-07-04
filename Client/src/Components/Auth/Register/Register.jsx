import React, { useEffect, useRef } from "react";
import { useForm } from "react-hook-form";
import {
  TextField,
  Button,
  Container,
  Typography,
  Box,
} from "@mui/material";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import "./Register.css";
import gsap from 'gsap';
import { registerUser } from "../../../Functions/Auth";

const RegisterPage = () => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const boxRef = useRef();

  useEffect(() => {
    gsap.from(boxRef.current, {
      duration: 2,
      opacity: 0,
      y: 50,
      ease: 'power2.out'
    });
  }, []);

  const { mutate, isPending } = useMutation({
    mutationFn: registerUser,
    onSuccess: () => {
      toast.success("Registered successfully!");
      setTimeout(() => navigate("/login"), 2000);
    },
    onError: (err) => {
      const msg = err.response?.data?.message || "Registration failed";
      toast.error(msg);
    },
  });

  // text field style
  const textFieldStyle = {
    mb: 2,

    "& .MuiInputBase-input": {
      color: "#fff",
      fontSize: "16px",
    },

    "& .MuiInputLabel-root": {
      color: "rgba(255,255,255,.8)",
    },

    "& .MuiInputLabel-root.Mui-focused": {
      color: "#7CFC98",
    },

    "& .MuiOutlinedInput-root": {
      borderRadius: "14px",

      "& fieldset": {
        borderColor: "rgba(255,255,255,.25)",
      },

      "&:hover fieldset": {
        borderColor: "#7CFC98",
      },

      "&.Mui-focused fieldset": {
        borderColor: "#7CFC98",
        boxShadow: "0 0 15px rgba(124,252,152,.35)",
      },
    },

    "& .MuiFormHelperText-root": {
      color: "#ffd5d5",
    },
  };

  const onSubmit = (data) => {
    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("email", data.email);
    formData.append("password", data.password);
    formData.append("phone", data.phone);

    if (data.image && data.image[0]) {
      formData.append("image", data.image[0]);
    }

    mutate(formData);
  };

  return (
    <div className="register-page">
      <ToastContainer position="top-right" autoClose={3000} />
      <Container maxWidth="sm" className="register-container">
        <Box className="register-box" ref={boxRef}>
          <Typography className="register-title" variant="h3">
            Create Account
          </Typography>

          <Typography className="register-subtitle">
            Join the Health & Wellness Community
          </Typography>

          <form onSubmit={handleSubmit(onSubmit)}>
            <TextField

              label="Name"
              fullWidth
              margin="normal"
              {...register("name", { required: "Name is required" })}
              error={!!errors.name}
              helperText={errors.name?.message}
              sx={textFieldStyle}
            />

            <TextField
              label="Email"
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
              sx={textFieldStyle}
            />

            <TextField
              label="Password"
              type="password"
              fullWidth
              margin="normal"
              {...register("password", {
                required: "Password is required",
                minLength: {
                  value: 6,
                  message: "Password must be at least 6 characters",
                },
              })}
              error={!!errors.password}
              helperText={errors.password?.message}
              sx={textFieldStyle}
            />

            <TextField
              label="Phone"
              fullWidth
              margin="normal"
              {...register("phone", { required: "Phone is required" })}
              error={!!errors.phone}
              helperText={errors.phone?.message}
              sx={textFieldStyle}
            />

            <TextField
              type="file"
              fullWidth
              margin="normal"
              {...register("image")}
              error={!!errors.image}
              helperText={errors.image?.message}
              sx={textFieldStyle}
            />

            <Button
              variant="contained"
              type="submit"
              fullWidth
              disabled={isPending}
              className="register-btn"
            >
              {isPending ? "Creating Account..." : "REGISTER"}
            </Button>

            <div className="login-link">
              Already have an account?

              <a href="/login">
                Login →
              </a>
            </div>
          </form>
        </Box>
      </Container>
    </div>
  );
};

export default RegisterPage;
