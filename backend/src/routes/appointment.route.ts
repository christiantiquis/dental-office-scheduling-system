import express from "express";
import appointmentController from "../app/controller/appointment.controller";
const router = express.Router();

router.get("/", appointmentController.getAll);
router.get("/:id", appointmentController.getById);
router.post("/book", appointmentController.create);
router.put("/update", appointmentController.update);

export default router;
