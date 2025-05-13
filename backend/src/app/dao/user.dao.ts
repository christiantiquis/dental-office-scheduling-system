import { IUser } from "../interface/user.interface";
import models from "../models";

const User = models.User;

async function create(data: IUser) {
  try {
    const newData = new User(data);
    const result = await newData.save();
    return result;
  } catch (e) {
    console.log(e);
    throw new Error("Failed to create user!");
  }
}

async function findById(id: string) {
  return User.findOne({ where: { id } });
}

async function findByEmail(email: string) {
  return User.findOne({ where: { email } });
}

async function isEmailExists(email: string) {
  return User.count({ where: { email } }).then((count: number) => {
    return count != 0;
  });
}

async function findAll() {
  try {
    const result = User.findAll();
    return result;
  } catch (e) {
    console.log(e);
    throw new Error("Failed to fetch users");
  }
}

async function updateWhere(userBody: IUser, where: { id: string }) {
  try {
    const result = User.update(userBody, { where });
    return result;
  } catch (e) {
    console.log(e);
    throw e;
  }
}

export default {
  create,
  findById,
  findByEmail,
  isEmailExists,
  findAll,
  updateWhere,
};
