import express from "express";
import isAuthenticated from "../middlewares/isAuthenticated.js";
import { getCompany, getCompanyById, upsertCompany } from "../controllers/company.controller.js";
import { uploadImage } from "../middlewares/mutler.js";

const router = express.Router();

router.route("/upsert").post(isAuthenticated, uploadImage, upsertCompany); // merged register/update
router.route("/get").get(isAuthenticated, getCompany);
router.route("/get/:id").get(isAuthenticated, getCompanyById);

export default router;
