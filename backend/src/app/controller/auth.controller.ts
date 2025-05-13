import { Request, Response } from "express";
import httpStatus from "http-status";
import userService from "../service/user.service";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET!;

const login = async (req: Request, res: Response): Promise<void> => {
  try {
    const user = await userService.login(req.body);
    const { status, data, code } = user.response;
    const token = status ? jwt.sign(data, JWT_SECRET, { expiresIn: "1h" }) : "";

    res.status(code).send({ ...user.response, token });
  } catch (e) {
    console.log(e);
    res.status(httpStatus.BAD_GATEWAY).send(e);
  }
};

export default {
  login,
};
