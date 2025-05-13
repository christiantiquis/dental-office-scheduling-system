import { IUser } from "./user.interface";

export interface IResponseHandler {
  statusCode: number;
  response: {
    status: boolean;
    code: number;
    message: string;
    data: IUser;
  };
}
