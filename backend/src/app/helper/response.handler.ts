import { IUser } from "../interface/user.interface";

const defaultUser: IUser = {
  id: "",
  first_name: "",
  last_name: "",
  email: "",
  password: "",
};

type SafeUser = Omit<IUser, "password">;

const returnError = (statusCode: number, message: string) => {
  return {
    statusCode,
    response: {
      status: false,
      code: statusCode,
      message,
      data: defaultUser,
    },
  };
};
const returnSuccess = (
  statusCode: number,
  message: string,
  data: IUser | IUser[] | SafeUser = defaultUser
) => {
  return {
    statusCode,
    response: {
      status: true,
      code: statusCode,
      message,
      data,
    },
  };
};

export default {
  returnError,
  returnSuccess,
};
