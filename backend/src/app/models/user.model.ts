"use strict";

import { Model, Sequelize } from "sequelize";
import type { ModelStatic, DataTypes as SequelizeDataTypes } from "sequelize";
import { IUser } from "../interface/user.interface";

export default (sequelize: Sequelize, DataTypes: typeof SequelizeDataTypes) => {
  class User extends Model<IUser> {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models: { appointment: ModelStatic<Model<any, any>> }) {
      // A User can have many Appointments
    }
  }
  User.init(
    {
      id: {
        allowNull: false,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
        type: DataTypes.UUID,
      },
      first_name: DataTypes.STRING,
      last_name: DataTypes.STRING,
      email: DataTypes.STRING,
      password: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "User",
    }
  );
  return User;
};
