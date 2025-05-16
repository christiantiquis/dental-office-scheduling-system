import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import process from "process";
import routes from "./routes";
import model from "./app/models";
import rateLimit from "express-rate-limit";

const limiter = rateLimit({
  windowMs: 3 * 60 * 1000,
  max: 1000,
  message: "Too many request from this IP, please try again after 3 minutes.",
});

const PORT = process.env.PORT;
const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(limiter);
app.use("/api", routes);

if (model.sequelize) {
  model.sequelize
    .sync({ force: false }) // Set `force: true` to drop and recreate tables
    .then(() => {
      console.log("Database synced successfully.");
    })
    .catch((err: any) => {
      console.error("Error syncing database:", err);
    });
} else {
  console.error("Sequelize instance is undefined.");
}

app.listen(PORT, () => {
  console.log(`App Listening at http://localhost:${PORT}`);
});
