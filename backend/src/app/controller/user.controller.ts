import { Request, Response } from "express";
import httpStatus from "http-status";
import userService from "../service/user.service";
import jwt from "jsonwebtoken";

const JWT_SECRET = "f0b141bc-c9b9-4a71-815f-13f5b2ada0e9";

const getUsers = async (req: Request, res: Response): Promise<void> => {
  try {
    const usersData = await userService.getUsers();
    const { status, data, message, code } = usersData.response;
    res.status(code).send({ status, code, message, data });
  } catch (e) {
    console.log(e);
    res.status(httpStatus.BAD_GATEWAY).send(e);
  }
};

const getUserByEmail = async (req: Request, res: Response): Promise<void> => {
  try {
    const user = await userService.getUserByEmail(req.body.email);
    const { status, data, message, code } = user.response;
    // let tokens = {};

    res.status(user.statusCode).send({ status, code, message, data });
  } catch (e) {
    console.log(e);
    res.status(httpStatus.BAD_GATEWAY).send(e);
  }
};

const register = async (req: Request, res: Response): Promise<void> => {
  try {
    const user = await userService.register(req.body);

    // let tokens = {};
    let token = "";
    const { status, data, message, code } = user.response;
    const dataId = (data as { id?: string }).id ?? "";
    const dataemail = (data as { email?: string }).email ?? "";
    if (status) {
      token = jwt.sign({ id: dataId, email: dataemail }, JWT_SECRET, {
        expiresIn: "1h",
      });
    }

    res.status(user.statusCode).send({ status, code, message, data, token });
  } catch (e) {
    console.log(e);
    res.status(httpStatus.BAD_GATEWAY).send(e);
  }
};

export default {
  getUsers,
  getUserByEmail,
  register,
};
