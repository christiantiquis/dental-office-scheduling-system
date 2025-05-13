import { Request, Response } from "express";
import httpStatus from "http-status";
import appointmentService from "../service/appointment.service";

const getAll = async (req: Request, res: Response): Promise<void> => {
  try {
    const appointment = await appointmentService.getAll();

    res.status(appointment.response.code).send(appointment.response);
  } catch (e) {
    console.log(e);
    res.status(httpStatus.BAD_GATEWAY).send(e);
  }
};

const getById = async (req: Request, res: Response): Promise<void> => {
  try {
    const appointment = await appointmentService.getById(req.body.id);

    res.status(appointment.response.code).send(appointment.response);
  } catch (e) {
    console.log(e);
    res.status(httpStatus.BAD_GATEWAY).send(e);
  }
};

const create = async (req: Request, res: Response): Promise<void> => {
  try {
    const appointment = await appointmentService.create(req.body);
    const { status, data, code } = appointment.response;

    res.status(code).send(appointment.response);
  } catch (e) {
    console.log(e);
    res.status(httpStatus.BAD_GATEWAY).send(e);
  }
};

const update = async (req: Request, res: Response): Promise<void> => {
  try {
    const appointment = await appointmentService.update(req.body);

    res.status(appointment.response.code).send(appointment.response);
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
