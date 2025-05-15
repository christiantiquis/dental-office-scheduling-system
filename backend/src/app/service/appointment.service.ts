import httpStatus from "http-status";
import resHandler from "../helper/response.handler";
import appointmentDao from "../dao/appointment.dao";
import { IAppointment } from "../interface/appointment.interface";

const create = async (appointmentBody: IAppointment) => {
  try {
    const appointmentToCreate = {
      ...appointmentBody,
    };

    const appointmentData = await appointmentDao.create(appointmentToCreate);

    if (!appointmentData) {
      return resHandler.returnError(
        httpStatus.BAD_REQUEST,
        "Registration Failed! Please Try again."
      );
    } else {
      return resHandler.returnSuccess(
        httpStatus.CREATED,
        "Successfully Registered the account!",
        appointmentData
      );
    }
  } catch (e) {
    console.log(e);
    return resHandler.returnError(
      httpStatus.BAD_REQUEST,
      "Something went wrong!"
    );
  }
};

const update = async (appointmentBody: IAppointment) => {
  try {
    console.log("TEST", appointmentBody);
    const appointmentData = await appointmentDao.findById(appointmentBody.id);
    const updatedFields: Partial<IAppointment> = {};
    if (appointmentData == null) {
      return resHandler.returnError(
        httpStatus.NOT_FOUND,
        "Appointment not found!"
      );
    }

    if (appointmentBody.doctor_id !== appointmentData.doctor_id) {
      updatedFields.doctor_id = appointmentBody.doctor_id;
    }
    if (appointmentBody.date !== appointmentData.date) {
      updatedFields.date = appointmentBody.date;
    }
    if (appointmentBody.time !== appointmentData.time) {
      updatedFields.time = appointmentBody.time;
    }
    if (appointmentBody.service !== appointmentData.service) {
      updatedFields.service = appointmentBody.service;
    }
    if (appointmentBody.notes !== appointmentData.notes) {
      updatedFields.notes = appointmentBody.notes;
    }
    if (appointmentBody.status !== appointmentData.status) {
      updatedFields.status = appointmentBody.status;
    }

    const appointmentUpdated: IAppointment = {
      ...appointmentBody,
      ...updatedFields,
    };

    const { id } = appointmentUpdated;

    const isUpdated = await appointmentDao.updateWhere(appointmentUpdated, id);
    if (isUpdated) {
      const updateAppointment = await appointmentDao.findById(id);
      return resHandler.returnSuccess(
        httpStatus.OK,
        "Update Successful",
        updateAppointment
      );
    } else {
      return resHandler.returnError(
        httpStatus.INTERNAL_SERVER_ERROR,
        "Failed to update the appointment. Please try again."
      );
    }
  } catch (e) {
    console.log(e);
    return resHandler.returnError(
      httpStatus.BAD_REQUEST,
      "Something went wrong!"
    );
  }
};

const getAll = async () => {
  try {
    const appointmentsData = await appointmentDao.findAll();
    return resHandler.returnSuccess(httpStatus.OK, "Success", appointmentsData);
  } catch (e) {
    console.log(e);
    return resHandler.returnError(
      httpStatus.BAD_REQUEST,
      "Something went wrong!"
    );
  }
};

const getByPatientId = async (id: string) => {
  try {
    let appointmentsData = await appointmentDao.findByPatientId(id);
    return resHandler.returnSuccess(httpStatus.OK, "Success", appointmentsData);
  } catch (e) {
    console.log(e);
    return resHandler.returnError(
      httpStatus.BAD_REQUEST,
      "Something went wrong!"
    );
  }
};

const getByDoctorId = async (id: string) => {
  try {
    let appointmentsData = await appointmentDao.findByDoctorId(id);
    return resHandler.returnSuccess(httpStatus.OK, "Success", appointmentsData);
  } catch (e) {
    console.log(e);
    return resHandler.returnError(
      httpStatus.BAD_REQUEST,
      "Something went wrong!"
    );
  }
};
const getByTime = async (time: string) => {
  try {
    let appointmentsData = await appointmentDao.findByTime(time);
    return resHandler.returnSuccess(httpStatus.OK, "Success", appointmentsData);
  } catch (e) {
    console.log(e);
    return resHandler.returnError(
      httpStatus.BAD_REQUEST,
      "Something went wrong!"
    );
  }
};

const getById = async (id: string) => {
  try {
    let appointmentData = await appointmentDao.findById(id);

    if (appointmentData == null) {
      return resHandler.returnError(
        httpStatus.BAD_REQUEST,
        "Invalid Credentials!"
      );
    }
    const { password, ...sanitizedAppointmentData } = appointmentData.toJSON();

    return resHandler.returnSuccess(
      httpStatus.OK,
      "Login Successful",
      sanitizedAppointmentData
    );
  } catch (e) {
    console.log(e);
    return resHandler.returnError(
      httpStatus.BAD_REQUEST,
      "Something went wrong!"
    );
  }
};

const cancel = async (id: string) => {
  try {
    const appointmentToCancel = await appointmentDao.findById(id);
    const updatedAppointment = { ...appointmentToCancel, status: "cancelled" };
    const appointmentData = await appointmentDao.cancel(updatedAppointment, id);

    return resHandler.returnSuccess(
      httpStatus.OK,
      "Login Successful",
      appointmentData
    );
  } catch (e) {
    console.log(e);
    return resHandler.returnError(
      httpStatus.BAD_REQUEST,
      "Something went wrong!"
    );
  }
};

export default {
  create,
  getAll,
  getByDoctorId,
  getByPatientId,
  getByTime,
  getById,
  update,
  cancel,
};
