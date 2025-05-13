import { Request, Response } from "express";
import httpStatus from "http-status";
import userService from "../service/user.service";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET!;

const getAll = async (req: Request, res: Response): Promise<void> => {
  try {
    const user = await userService.getAll();

    res.status(user.response.code).send(user.response);
  } catch (e) {
    console.log(e);
    res.status(httpStatus.BAD_GATEWAY).send(e);
  }
};

const getByEmail = async (req: Request, res: Response): Promise<void> => {
  try {
    const user = await userService.getByEmail(req.body.email);

    res.status(user.response.code).send(user.response);
  } catch (e) {
    console.log(e);
    res.status(httpStatus.BAD_GATEWAY).send(e);
  }
};

const create = async (req: Request, res: Response): Promise<void> => {
  try {
    const user = await userService.create(req.body);
    const { status, data, code } = user.response;
    const token = status ? jwt.sign(data, JWT_SECRET, { expiresIn: "1h" }) : "";

    res.status(code).send({ ...user.response, token });
  } catch (e) {
    console.log(e);
    res.status(httpStatus.BAD_GATEWAY).send(e);
  }
};

const update = async (req: Request, res: Response): Promise<void> => {
  try {
    const user = await userService.update(req.body);

    res.status(user.response.code).send(user.response);
  } catch (e) {
    console.log(e);
    res.status(httpStatus.BAD_GATEWAY).send(e);
  }
};

export default {
  getAll,
  getByEmail,
  create,
  update,
};
