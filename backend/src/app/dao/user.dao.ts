import { IUser } from "../interface/user.interface";
import models from "../models";
// const models = require("../models");

const User = models.user;

async function create(data: IUser) {
  try {
    const newData = new User(data);
    return newData
      .save()
      .then((result: IUser[]) => {
        return result;
      })
      .catch((e: any) => {
        console.log(e);
      });
  } catch (e) {
    console.log(e);
  }
}

async function findByEmail(email: string) {
  return User.findOne({ where: { email } });
}

async function isEmailExists(email: string) {
  return User.count({ where: { email } }).then((count: number) => {
    if (count != 0) {
      return true;
    }
    return false;
  });
}

async function findAll() {
  return User.findAll()
    .then((result: IUser[]) => {
      return result;
    })
    .catch((e: any) => {
      console.log(e);
    });
}

export default {
  create,
  findByEmail,
  isEmailExists,
  findAll,
};
