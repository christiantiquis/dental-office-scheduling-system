import express from "express";
import appointmentController from "../app/controller/appointment.controller";
const router = express.Router();

router.get("/", appointmentController.getAll);
router.get("/:id", appointmentController.getById);
router.get("/doctor/:id", appointmentController.getByDoctorId);
router.get("/patient/:id", appointmentController.getByPatientId);
router.get("/time/:time", appointmentController.getByTime);
router.post("/book", appointmentController.create);
router.put("/update", appointmentController.update);
router.put("/cancel/:id", appointmentController.cancel);

export default router;
