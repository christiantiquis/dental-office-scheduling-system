import { UUID } from "crypto";
import { DataTypes } from "sequelize";

export interface IUser {
  id: typeof DataTypes.UUID;
  first_name: string;
  last_name: string;
  email: string;
  password: string;
}
