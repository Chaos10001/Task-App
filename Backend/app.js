const express = require("express");
const tasks = require("./routes/tasks");
const app = express();
const coonectDB = require("./db/connect");
const cors = require("cors");
require("dotenv").config();

//use cors
app.use(cors());

// middleware
app.use(express.json());

//routes
app.use("/api/v1/tasks", tasks);

const port = 3000;

const start = async () => {
  try {
    await coonectDB(process.env.MONGO_URL);
    app.listen(port, console.log(`server is listening on port ${port}`));
  } catch (error) {
    console.log(error);
  }
};

start();
