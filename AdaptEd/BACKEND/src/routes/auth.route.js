import express from "express";
import { registerUser, loginUser, logoutUser, home } from "../controllers/auth.controllers.js";

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/logout", logoutUser);

router.get("/", home)

export default router;