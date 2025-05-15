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
    const { id } = req.params;
    const appointment = await appointmentService.getById(id);

    res.status(appointment.response.code).send(appointment.response);
  } catch (e) {
    console.log(e);
    res.status(httpStatus.BAD_GATEWAY).send(e);
  }
};

const getByDoctorId = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const appointment = await appointmentService.getByDoctorId(id);

    res.status(appointment.response.code).send(appointment.response);
  } catch (e) {
    console.log(e);
    res.status(httpStatus.BAD_GATEWAY).send(e);
  }
};

const getByTime = async (req: Request, res: Response): Promise<void> => {
  try {
    const { time } = req.params;
    const appointment = await appointmentService.getByTime(time);

    res.status(appointment.response.code).send(appointment.response);
  } catch (e) {
    console.log(e);
    res.status(httpStatus.BAD_GATEWAY).send(e);
  }
};

const getByPatientId = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const appointment = await appointmentService.getByPatientId(id);

    res.status(appointment.response.code).send(appointment.response);
  } catch (e) {
    console.log(e);
    res.status(httpStatus.BAD_GATEWAY).send(e);
  }
};

const create = async (req: Request, res: Response): Promise<void> => {
  try {
    console.log(req.body);
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
const cancel = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    console.log("CANCEL CONTROLLER ID: ", id);
    const appointment = await appointmentService.cancel(id);

    res.status(appointment.response.code).send(appointment.response);
  } catch (e) {
    console.log("CONTRO", e);
    res.status(httpStatus.BAD_GATEWAY).send(e);
  }
};

export default {
  getAll,
  getById,
  getByDoctorId,
  getByPatientId,
  getByTime,
  create,
  update,
  cancel,
};
