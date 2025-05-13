import express from "express";
import userController from "../app/controller/user.controller";
const router = express.Router();

router.get("/", userController.getAll);
router.get("/user", userController.getByEmail);
router.post("/register", userController.create);
router.put("/update", userController.update);

export default router;
