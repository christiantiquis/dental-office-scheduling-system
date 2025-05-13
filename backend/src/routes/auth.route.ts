import express from "express";
import authController from "../app/controller/auth.controller";

const router = express.Router();

router.get("/login", authController.login);

export default router;
