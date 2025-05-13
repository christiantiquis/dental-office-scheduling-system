import express from "express";
import doctorController from "../app/controller/doctor.controller";
const router = express.Router();

router.get("/", doctorController.getAll);
router.get("/doctor/:id", doctorController.getById);
router.post("/signup", doctorController.create);
router.put("/update", doctorController.update);

export default router;
