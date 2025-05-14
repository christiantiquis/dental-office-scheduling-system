import httpStatus from "http-status";
import bcrypt from "bcrypt";
import resHandler from "../helper/response.handler";
import userDao from "../dao/user.dao";
import { IUser } from "../interface/user.interface";

const create = async (userBody: IUser) => {
  try {
    const userToCreate = {
      ...userBody,
      email: userBody.email.toLowerCase(),
      password: await bcrypt.hash(userBody.password, 10),
    };
    if (await userDao.isEmailExists(userToCreate.email)) {
      return resHandler.returnError(
        httpStatus.BAD_REQUEST,
        "Email already taken"
      );
    }

    const userData = await userDao.create(userToCreate);
    const { password, ...sanitizedUserData } = userData.toJSON();

    if (!sanitizedUserData) {
      return resHandler.returnError(
        httpStatus.BAD_REQUEST,
        "Registration Failed! Please Try again."
      );
    } else {
      return resHandler.returnSuccess(
        httpStatus.CREATED,
        "Successfully Registered the account!",
        sanitizedUserData
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

const login = async (userBody: IUser) => {
  try {
    const userData = await userDao.findByEmail(userBody.email);

    if (userData == null) {
      return resHandler.returnError(
        httpStatus.BAD_REQUEST,
        "Invalid Credentials!"
      );
    }

    const isPasswordValid = await bcrypt.compare(
      userBody.password,
      userData.password
    );

    if (!isPasswordValid) {
      return resHandler.returnError(
        httpStatus.BAD_REQUEST,
        "Invalid Credentials!"
      );
    }

    const { password, ...sanitizedUserData } = userData.toJSON();

    return resHandler.returnSuccess(
      httpStatus.OK,
      "Login Successful",
      sanitizedUserData
    );
  } catch (e) {
    console.log(e);
    return resHandler.returnError(
      httpStatus.BAD_REQUEST,
      "Something went wrong!"
    );
  }
};

const update = async (userBody: IUser) => {
  try {
    const userData = await userDao.findById(userBody.id);
    const updatedFields: Partial<IUser> = {};
    if (userData == null) {
      return resHandler.returnError(httpStatus.NOT_FOUND, "User not found!");
    }

    if (userBody.first_name !== userData.first_name) {
      updatedFields.first_name = userBody.first_name;
    }
    if (userBody.last_name !== userData.last_name) {
      updatedFields.last_name = userBody.last_name;
    }
    if (userBody.email.toLowerCase() !== userData.email.toLowerCase()) {
      updatedFields.email = userBody.email.toLowerCase();
    }

    const userUpdated: IUser = {
      ...userBody,
      ...updatedFields,
    };

    const { id } = userUpdated;

    const isUpdated = await userDao.updateWhere(userUpdated, id);
    if (isUpdated) {
      const updateUser = await userDao.findById(id);
      const { password, ...sanitizedUserData } = updateUser;

      return resHandler.returnSuccess(
        httpStatus.OK,
        "Update Successful",
        sanitizedUserData
      );
    } else {
      return resHandler.returnError(
        httpStatus.INTERNAL_SERVER_ERROR,
        "Failed to update the user. Please try again."
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
    const usersData = await userDao.findAll();
    return resHandler.returnSuccess(httpStatus.OK, "Success", usersData);
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
    let userData = await userDao.findById(id);

    if (userData == null) {
      return resHandler.returnError(
        httpStatus.BAD_REQUEST,
        "Invalid Credentials!"
      );
    }
    const { password, ...sanitizedUserData } = userData.toJSON();

    return resHandler.returnSuccess(
      httpStatus.OK,
      "Login Successful",
      sanitizedUserData
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
