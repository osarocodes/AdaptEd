import express from "express";
import { registerUser, loginUser, logoutUser, onboardUser } from "../controllers/auth.controllers.js";
import { protect } from "../middlewares/auth.middleware.js";

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.put("/onboard", protect, onboardUser)

router.get("/logout", logoutUser);
// router.get("/", home);
export default router;