const express = require("express");
const dashboardController = require("../controllers/Dashboard/dashboardController");
const registerController = require("../controllers/Pages/authentication/registerController");
const {
  forgotPassword,
} = require("../controllers/Pages/authentication/forgotPassword_Controller");
const forgotPassword_Controller = require("../controllers/Pages/authentication/forgotPassword_Controller");
const errorController = require("../controllers/Pages/error/errorController");
const blankPageController = require("../controllers/Pages/blankPage/blankPageController");
const tableController = require("../controllers/tableController");
const AdminImage = require("../helper/AdminImage");
const AdminCheck = require("../middleware/AdminCheck");
const router = express.Router();

//dashboard
router.get(
  "/",
  AdminCheck,
  registerController.CheckAuth,
  dashboardController.dashboard
);

//admin-authnetication
router.get("/login", registerController.login);
router.post("/login/create", registerController.loginCreate);
router.get("/register", registerController.register);
router.post(
  "/register/create",
  AdminImage.single("image"),
  registerController.registerCreate
);
router.get("/forgotPassword", forgotPassword_Controller.forgotPassword);
router.get("/logout", AdminCheck, registerController.logout);
//error page
router.get("/error", errorController.error);
//blank page
router.get("/blank", blankPageController.blankPage);
//table
router.get("/table", tableController.table);

module.exports = router;
