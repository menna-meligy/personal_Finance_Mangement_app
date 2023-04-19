const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const { db } = require("./db/db");
//require("dotenv").config();
const { readdirSync } = require("fs");
const fs = require("fs");

if (fs.existsSync("./routes/availability.js")) {
  console.log(" found");
} else {
  console.log("not found");
}

const app = express();
require("dotenv").config();
const PORT = process.env.PORT || 3000;

//middlewares
app.use(express.json());
app.use(cors());

//routes
readdirSync(__dirname + "/routes").map((route) =>
  app.use("/api/v1", require("./routes/" + route))
);

app.get("/", (req, res) => {
  res.send("HEllo THERE ");
});

const server = () => {
  db();
  app.listen(PORT, () => {
    console.log("you are listening on port:", PORT);
  });
};
server();
