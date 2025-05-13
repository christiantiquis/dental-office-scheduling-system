import { Request, Response } from "express";
import httpStatus from "http-status";
import doctorService from "../service/doctor.service";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET!;

const getAll = async (req: Request, res: Response): Promise<void> => {
  try {
    const doctor = await doctorService.getAll();

    res.status(doctor.response.code).send(doctor.response);
  } catch (e) {
    console.log(e);
    res.status(httpStatus.BAD_GATEWAY).send(e);
  }
};

const getById = async (req: Request, res: Response): Promise<void> => {
  try {
    const doctor = await doctorService.getById("example@example.com");

    res.status(doctor.response.code).send(doctor.response);
  } catch (e) {
    console.log(e);
    res.status(httpStatus.BAD_GATEWAY).send(e);
  }
};

const create = async (req: Request, res: Response): Promise<void> => {
  try {
    const doctor = await doctorService.create(req.body);
    const { status, data, code } = doctor.response;

    let token = status ? jwt.sign(data, JWT_SECRET, { expiresIn: "1h" }) : "";

    res.status(code).send({ ...doctor.response, token });
  } catch (e) {
    console.log(e);
    res.status(httpStatus.BAD_GATEWAY).send(e);
  }
};

const update = async (req: Request, res: Response): Promise<void> => {
  try {
    const doctor = await doctorService.update(req.body);

    res.status(doctor.response.code).send(doctor.response);
  } catch (e) {
    console.log(e);
    res.status(httpStatus.BAD_GATEWAY).send(e);
  }
};

export default {
  getAll,
  getById,
  create,
  update,
};
