"use strict";

import { Model, Sequelize } from "sequelize";
import type { DataTypes as SequelizeDataTypes } from "sequelize";
import { IAppointment, Services } from "../interface/appointment.interface";

export default (sequelize: Sequelize, DataTypes: typeof SequelizeDataTypes) => {
  class Appointment extends Model<IAppointment> {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models: any) {
      Appointment.belongsTo(models.Doctor, { foreignKey: "doctor_id" });
      Appointment.belongsTo(models.User, { foreignKey: "patient_id" });
    }
  }
  Appointment.init(
    {
      id: {
        allowNull: false,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
        type: DataTypes.UUID,
      },
      patient_id: DataTypes.UUID,
      doctor_id: DataTypes.UUID,
      date: DataTypes.DATE,
      time: DataTypes.STRING,
      service: {
        type: DataTypes.ENUM,
        // values: Object.values(Services) as readonly string[],
        values: Object.values(Services).filter(
          (v) => typeof v === "string"
        ) as string[],
      },
      notes: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Appointment",
    }
  );
  return Appointment;
};
