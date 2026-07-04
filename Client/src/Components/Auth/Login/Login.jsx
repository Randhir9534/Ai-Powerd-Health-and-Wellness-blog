import React, { useEffect, useRef } from 'react';
import { useForm } from 'react-hook-form';
import {
  TextField,
  Button,
  Container,
  Typography,
  Box,
} from '@mui/material';
import { useMutation } from '@tanstack/react-query';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import gsap from 'gsap';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './Login.css';
import { loginUser } from '../../../Functions/Auth';

const LoginPage = () => {
  const navigate = useNavigate();
  const { register, handleSubmit, formState: { errors } } = useForm();
  const boxRef = useRef();

  useEffect(() => {
    gsap.from(boxRef.current, {
      duration: 2,
      opacity: 0,
      y: 50,
      ease: 'power2.out'
    });
  }, []);

  const { mutate, isPending: isLoading } = useMutation({
    mutationFn: loginUser,
    onSuccess: (data) => {
      console.log("da", data);

      localStorage.setItem('token', data.token);
      localStorage.setItem('userImg', data.data.image);
      localStorage.setItem('userName', data.data.name);
      toast.success('Login successful!');
      setTimeout(() => navigate('/'), 2000);
    },
    onError: (err) => {
      const msg = err.response?.data?.message || 'Login Failed';
      toast.error(msg);
    }
  });

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
    mutate(data);
  };

  return (
    <div className="login-page">
      <ToastContainer position="top-right" autoClose={3000} />
      <Container maxWidth="sm" className="login-container">
        <Box className="login-box" ref={boxRef}>
          <Typography className="login-title" variant="h3">
            Welcome Back
          </Typography>

          <Typography className="login-subtitle">
            Login to your Health & Wellness Dashboard
          </Typography>

          <form onSubmit={handleSubmit(onSubmit)}>
            <TextField
              sx={textFieldStyle}
              label="Email"
              fullWidth
              margin="normal"
              {...register('email', {
                required: 'Email is required',
                pattern: { value: /^\S+@\S+$/i, message: 'Invalid email address' }
              })}
              error={!!errors.email}
              helperText={errors.email?.message}
            />
            <TextField
              sx={textFieldStyle}
              label="Password"
              type="password"
              fullWidth
              margin="normal"
              {...register('password', { required: 'Password is required' })}
              error={!!errors.password}
              helperText={errors.password?.message}
            />
            <Button
              variant="contained"
              type="submit"
              fullWidth
              disabled={isLoading}
              className="login-btn"
            >
              {isLoading ? "Logging in..." : "LOGIN"}
            </Button>
          </form>
          <a className="register-link" href="/register">
            Create New Account →
          </a>
        </Box>
      </Container>
    </div>
  );
};

export default LoginPage;
