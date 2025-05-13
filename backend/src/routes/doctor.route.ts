import express from "express";
import doctorController from "../app/controller/doctor.controller";
const router = express.Router();

router.get("/", doctorController.getAll);
router.get("/doctor", doctorController.getByEmail);
router.post("/register", doctorController.create);
router.put("/update", doctorController.update);

export default router;
