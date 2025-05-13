import { IAppointment } from "../interface/appointment.interface";
import models from "../models";

const Appointment = models.Appointment;

const create = async (data: IAppointment) => {
  try {
    const newData = new Appointment(data);
    const result = await newData.save();
    return result;
  } catch (e) {
    console.log(e);
    throw new Error("Failed to create appointment!");
  }
};

const findById = async (id: string) => {
  return Appointment.findOne({ where: { id } });
};

const findByEmail = async (email: string) => {
  return Appointment.findOne({ where: { email } });
};

const isEmailExists = async (email: string) => {
  return Appointment.count({ where: { email } }).then((count: number) => {
    return count != 0;
  });
};

const findAll = async () => {
  try {
    const result = Appointment.findAll();
    return result;
  } catch (e) {
    console.log(e);
    throw new Error("Failed to fetch appointments");
  }
};

const updateWhere = async (appointmentBody: IAppointment, id: string) => {
  try {
    const result = Appointment.update(appointmentBody, { where: { id } });
    return result;
  } catch (e) {
    console.log(e);
    throw e;
  }
};

export default {
  create,
  findById,
  findByEmail,
  isEmailExists,
  findAll,
  updateWhere,
};
