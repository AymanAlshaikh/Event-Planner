const express = require("express");
const app = express();
const db = require("./db/models");
const { Task, sequelize } = require("./db/models");
const eventRoutes = require("./routes/events");

app.use(express.json());
app.use(eventRoutes);

const run = async () => {
  try {
    await db.sequelize.sync({ alter: true });
    console.log("Connection to the database successful!");
  } catch (error) {
    console.error("Error connecting to the database: ", error);
  }

  await app.listen(8001, () => {
    console.log("The application is running on localhost:8001");
  });
};

run();
