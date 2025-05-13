import { IDoctor } from "../interface/doctor.interface";
import models from "../models";

const Doctor = models.Doctor;

const create = async (data: IDoctor) => {
  try {
    const newData = new Doctor(data);
    const result = await newData.save();
    return result;
  } catch (e) {
    console.log(e);
    throw new Error("Failed to create doctor!");
  }
};

const findById = async (id: string) => {
  return Doctor.findOne({ where: { id } });
};

const findByEmail = async (email: string) => {
  return Doctor.findOne({ where: { email } });
};

const isEmailExists = async (email: string) => {
  return Doctor.count({ where: { email } }).then((count: number) => {
    return count != 0;
  });
};

const findAll = async () => {
  try {
    const result = Doctor.findAll();
    return result;
  } catch (e) {
    console.log(e);
    throw new Error("Failed to fetch doctors");
  }
};

const updateWhere = async (doctorBody: IDoctor, id: string) => {
  try {
    const result = Doctor.update(doctorBody, { where: { id } });
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
