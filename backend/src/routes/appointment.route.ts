import express from "express";
import appointmentController from "../app/controller/appointment.controller";
const router = express.Router();

router.get("/", appointmentController.getAll);
router.get("/appointment", appointmentController.getById);
router.post("/register", appointmentController.create);
router.put("/update", appointmentController.update);

export default router;
