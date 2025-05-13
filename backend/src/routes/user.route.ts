import express from "express";
import userController from "../app/controller/user.controller";
const router = express.Router();

router.get("/", userController.getAll);
router.get("/:id", userController.getById);
router.post("/signup", userController.create);
router.put("/update", userController.update);

export default router;
