import httpStatus from "http-status";
import bcrypt from "bcrypt";
import responseHandler from "../helper/response.handler";
import userDao from "../dao/user.dao";
import { IUser } from "../interface/user.interface";

const register = async (userBody: IUser) => {
  try {
    let message = "Successfully Registered the account!";
    if (await userDao.isEmailExists(userBody.email)) {
      return responseHandler.returnError(
        httpStatus.BAD_REQUEST,
        "Email already taken"
      );
    }

    userBody.email = userBody.email.toLowerCase();
    userBody.password = await bcrypt.hash(userBody.password, 10);
    let userData = await userDao.create(userBody);

    if (!userData) {
      message = "Registration Failed! Please Try again.";
      return responseHandler.returnError(httpStatus.BAD_REQUEST, message);
    }

    userData = userData.toJSON();
    delete userData.password;

    return responseHandler.returnSuccess(httpStatus.CREATED, message, userData);
  } catch (e) {
    console.log(e);
    return responseHandler.returnError(
      httpStatus.BAD_REQUEST,
      "Something went wrong!"
    );
  }
};

async function login(userBody: IUser) {
  try {
    let message = "Login Successful";
    let user = await userDao.findByEmail(userBody.email);
    if (user == null) {
      return responseHandler.returnError(
        httpStatus.BAD_REQUEST,
        "Invalid Credentials!"
      );
    }

    const isPasswordValid = await bcrypt.compare(
      userBody.password,
      user.password
    );

    if (!isPasswordValid) {
      return responseHandler.returnError(
        httpStatus.BAD_REQUEST,
        "Invalid Credentials!"
      );
    }
    user = user.toJSON();
    delete user.password;
    return responseHandler.returnSuccess(httpStatus.OK, message, user);
  } catch (e) {
    console.log(e);
    return responseHandler.returnError(
      httpStatus.BAD_REQUEST,
      "Something went wrong!"
    );
  }
}

async function getUsers() {
  try {
    const usersData = await userDao.findAll();
    return responseHandler.returnSuccess(httpStatus.OK, "Success", usersData);
  } catch (e) {
    console.log(e);
    return responseHandler.returnError(
      httpStatus.BAD_REQUEST,
      "Something went wrong!"
    );
  }
}

async function getUserByEmail(email: string) {
  try {
    let message = "Login Successful";
    let user = await userDao.findByEmail(email);
    if (user == null) {
      return responseHandler.returnError(
        httpStatus.BAD_REQUEST,
        "Invalid Credentials!"
      );
    }
    user = user.toJSON();
    delete user.password;

    return responseHandler.returnSuccess(httpStatus.OK, message, user);
  } catch (e) {
    console.log(e);
    return responseHandler.returnError(
      httpStatus.BAD_REQUEST,
      "Something went wrong!"
    );
  }
}

export default {
  register,
  login,
  getUsers,
  getUserByEmail,
};
