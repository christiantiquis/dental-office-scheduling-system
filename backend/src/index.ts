import express from "express"
import bodyParser from "body-parser"
import cors from "cors"
import routes from "./routes"
import model from "./app/models"

const PORT = 3040;
const app = express();
app.use(cors());
app.use(bodyParser.json());

app.use("/api", routes);

if (model.sequelize) {
  model.sequelize
    .sync({ force: false }) // Set `force: true` to drop and recreate tables
    .then(() => {
      console.log("Database synced successfully.");
    })
    .catch((err) => {
      console.error("Error syncing database:", err);
    });
} else {
  console.error("Sequelize instance is undefined.");
}

app.listen(PORT, () => {
  console.log(`App Listening at http://localhost:${PORT}`);
});
