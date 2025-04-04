import express from "express";

import {
  signup,
  login,
  logout,
  checkAuth,
  resetPassword,
  forgotPassword,
} from "../controllers/auth.controller.js";

import { protectRoute } from "../middlewares/auth.middleware.js";

const router = express.Router();

router.post("/signup", signup);
router.post("/login", login);
router.post("/logout", logout);
router.get("/check", protectRoute, checkAuth);
router.post("/forgot-password", forgotPassword);
router.post("/reset-password/:resetToken", resetPassword);

export default router;
