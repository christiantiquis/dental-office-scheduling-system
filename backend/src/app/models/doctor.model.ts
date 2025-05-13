"use strict";

import { Model, Sequelize } from "sequelize";
import type { DataTypes as SequelizeDataTypes } from "sequelize";
import { IDoctor } from "../interface/doctor.interface";

export default (sequelize: Sequelize, DataTypes: typeof SequelizeDataTypes) => {
  class Doctor extends Model<IDoctor> {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models: any) {
      Doctor.hasMany(models.Appointment, { foreignKey: "doctor_id" });
    }
  }
  Doctor.init(
    {
      id: {
        allowNull: false,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
        type: DataTypes.UUID,
      },
      first_name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      last_name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "Doctor",
    }
  );
  return Doctor;
};
