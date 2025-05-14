import httpStatus from "http-status";
import bcrypt from "bcrypt";
import resHandler from "../helper/response.handler";
import doctorDao from "../dao/doctor.dao";
import { IDoctor } from "../interface/doctor.interface";

const create = async (doctorBody: IDoctor) => {
  try {
    const doctorToCreate = {
      ...doctorBody,
      email: doctorBody.email.toLowerCase(),
      password: await bcrypt.hash(doctorBody.password, 10),
    };
    if (await doctorDao.isEmailExists(doctorToCreate.email)) {
      return resHandler.returnError(
        httpStatus.BAD_REQUEST,
        "Email already taken"
      );
    }

    const doctorData = await doctorDao.create(doctorToCreate);
    const { password, ...sanitizedDoctorData } = doctorData.toJSON();

    if (!sanitizedDoctorData) {
      return resHandler.returnError(
        httpStatus.BAD_REQUEST,
        "Registration Failed! Please Try again."
      );
    } else {
      return resHandler.returnSuccess(
        httpStatus.CREATED,
        "Successfully Registered the account!",
        sanitizedDoctorData
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

const login = async (doctorBody: IDoctor) => {
  try {
    const doctorData = await doctorDao.findByEmail(doctorBody.email);

    if (doctorData == null) {
      return resHandler.returnError(
        httpStatus.BAD_REQUEST,
        "Invalid Credentials!"
      );
    }

    const isPasswordValid = await bcrypt.compare(
      doctorBody.password,
      doctorData.password
    );

    if (!isPasswordValid) {
      return resHandler.returnError(
        httpStatus.BAD_REQUEST,
        "Invalid Credentials!"
      );
    }

    const { password, ...sanitizedDoctorData } = doctorData.toJSON();

    return resHandler.returnSuccess(
      httpStatus.OK,
      "Login Successful",
      sanitizedDoctorData
    );
  } catch (e) {
    console.log(e);
    return resHandler.returnError(
      httpStatus.BAD_REQUEST,
      "Something went wrong!"
    );
  }
};

const update = async (doctorBody: IDoctor) => {
  try {
    const doctorData = await doctorDao.findById(doctorBody.id);
    const updatedFields: Partial<IDoctor> = {};
    if (doctorData == null) {
      return resHandler.returnError(httpStatus.NOT_FOUND, "Doctor not found!");
    }

    if (doctorBody.first_name !== doctorData.first_name) {
      updatedFields.first_name = doctorBody.first_name;
    }
    if (doctorBody.last_name !== doctorData.last_name) {
      updatedFields.last_name = doctorBody.last_name;
    }
    if (doctorBody.email.toLowerCase() !== doctorData.email.toLowerCase()) {
      updatedFields.email = doctorBody.email.toLowerCase();
    }

    const doctorUpdated: IDoctor = {
      ...doctorBody,
      ...updatedFields,
    };

    const { id } = doctorUpdated;

    const isUpdated = await doctorDao.updateWhere(doctorUpdated, id);
    if (isUpdated) {
      const updateDoctor = await doctorDao.findById(id);
      const { password, ...sanitizedDoctorData } = updateDoctor;

      return resHandler.returnSuccess(
        httpStatus.OK,
        "Update Successful",
        sanitizedDoctorData
      );
    } else {
      return resHandler.returnError(
        httpStatus.INTERNAL_SERVER_ERROR,
        "Failed to update the doctor. Please try again."
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
    const doctorsData = await doctorDao.findAll();
    return resHandler.returnSuccess(httpStatus.OK, "Success", doctorsData);
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
    let doctorData = await doctorDao.findById(id);

    if (doctorData == null) {
      return resHandler.returnError(
        httpStatus.BAD_REQUEST,
        "Invalid Credentials!"
      );
    }
    const { password, ...sanitizedDoctorData } = doctorData.toJSON();

    return resHandler.returnSuccess(
      httpStatus.OK,
      "Login Successful",
      sanitizedDoctorData
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
  login,
  getAll,
  getById,
  update,
};
