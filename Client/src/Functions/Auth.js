// import axios from "axios";
import { end_points } from "../Api/api";
import axiosInstance from "../Api/axiosInstance";

// ========= Register =============
let registApi= end_points.Register
export const registerUser = async (userData) => {
  const { data } = await axiosInstance.post(
    registApi,
    userData
  );
  return data;
};
// ========= login ============
let loginApi=end_points.Login
export const loginUser = async (credentials) => {
  const { data } = await axiosInstance.post(
    loginApi
    , credentials);
  return data;
};
// ========== Profile ==========
let profileApi=end_points.Profile
export const fetchProfile = async () => {
  const { data } = await axiosInstance.get(
    profileApi
);
  return data;
};