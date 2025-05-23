import { IUser } from "../interface/user.interface";
import models from "../models";

const User = models.User;

const create = async (data: IUser) => {
  try {
    const newData = new User(data);
    const result = await newData.save();
    return result;
  } catch (e) {
    console.log(e);
    throw new Error("Failed to create user!");
  }
};

const findById = async (id: string) => {
  return User.findOne({ where: { id } });
};

const findByEmail = async (email: string) => {
  return User.findOne({ where: { email } });
};

const isEmailExists = async (email: string) => {
  return User.count({ where: { email } }).then((count: number) => {
    return count != 0;
  });
};

const findAll = async () => {
  try {
    const result = User.findAll();
    return result;
  } catch (e) {
    console.log(e);
    throw new Error("Failed to fetch users");
  }
};

const updateWhere = async (userBody: IUser, id: string) => {
  try {
    const result = User.update(userBody, { where: { id } });
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
