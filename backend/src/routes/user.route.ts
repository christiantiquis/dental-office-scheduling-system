import express from "express";
import userController from "../app/controller/user.controller";
const router = express.Router();

router.get("/", userController.getUsers);
router.get("/user", userController.getUserByEmail);
router.post("/register", userController.register);
router.put("/update", userController.update);

export default router;
