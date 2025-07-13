import express from "express";
import { login, logout, register, updateProfile } from "../controllers/user.controller.js";
import isAuthenticated from "../middlewares/isAuthenticated.js";
import { uploadProfilePhoto, uploadResume} from "../middlewares/mutler.js";
 
const router = express.Router();

router.route("/register").post(uploadProfilePhoto,register);
router.route("/login").post(login);
router.route("/logout").get(logout);
router.route("/profile/update").post(isAuthenticated,uploadResume,updateProfile);

export default router;