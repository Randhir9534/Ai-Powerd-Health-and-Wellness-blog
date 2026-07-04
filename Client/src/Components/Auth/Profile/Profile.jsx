import React, { useEffect } from "react";
import {
  Container,
  Typography,
  Avatar,
  Box,
  Grid,
  CircularProgress,
} from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import PhoneOutlinedIcon from "@mui/icons-material/PhoneOutlined";
import BadgeOutlinedIcon from "@mui/icons-material/BadgeOutlined";
import { fetchProfile } from "../../../Functions/Auth";
import "./Profile.css";

const ProfilePage = () => {
  const {
    data: user,
    isLoading,
    isError,
    error,
  } = useQuery({ queryKey: ["userProfile"], queryFn: fetchProfile });

  useEffect(() => {
    document.title = "My Profile - WellnessBloom";
  }, []);

  if (isLoading) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", mt: 6 }}>
        <CircularProgress color="success" />
      </Box>
    );
  }

  if (isError) {
    return (
      <Typography color="error" align="center" mt={4}>
        Failed to load profile: {error.message}
      </Typography>
    );
  }

  const imageUrl = user?.image
    ? `https://ai-powerd-health-and-wellness-blog.onrender.com/${user.image.replace(/\\/g, "/")}`
    : "https://via.placeholder.com/150";

  return (
    <div className="profile-page">
      <Container maxWidth="md" className="profile-container">
        <div className="profile-card">
          <span className="profile-eyebrow">Account</span>
          <Typography variant="h4" className="profile-heading">
            My Profile
          </Typography>
          <div className="profile-divider" />

          <Grid container spacing={4} alignItems="center" className="profile-body">
            <Grid item xs={12} sm={4} textAlign="center">
              <div className="profile-avatar-wrap">
                <Avatar
                  src={imageUrl}
                  alt={user?.name}
                  className="profile-avatar"
                />
              </div>
              <Typography variant="h6" className="profile-name">
                {user?.name}
              </Typography>
              <span className="profile-role-chip">{user?.role || "User"}</span>
            </Grid>

            <Grid item xs={12} sm={8}>
              <div className="profile-info-list">
                <div className="profile-info-row">
                  <span className="profile-info-icon">
                    <EmailOutlinedIcon fontSize="small" />
                  </span>
                  <div>
                    <span className="profile-info-label">Email</span>
                    <p className="profile-info-value">{user?.email}</p>
                  </div>
                </div>

                <div className="profile-info-row">
                  <span className="profile-info-icon">
                    <PhoneOutlinedIcon fontSize="small" />
                  </span>
                  <div>
                    <span className="profile-info-label">Phone</span>
                    <p className="profile-info-value">
                      {user?.phone || "Not provided"}
                    </p>
                  </div>
                </div>

                <div className="profile-info-row">
                  <span className="profile-info-icon">
                    <BadgeOutlinedIcon fontSize="small" />
                  </span>
                  <div>
                    <span className="profile-info-label">Role</span>
                    <p className="profile-info-value">
                      {user?.role || "User"}
                    </p>
                  </div>
                </div>
              </div>
            </Grid>
          </Grid>
        </div>
      </Container>
    </div>
  );
};

export default ProfilePage;
