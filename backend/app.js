const express = require("express");
const cors = require("cors");
const { connectDB } = require("./db/connect");
const app = express();
require("dotenv").config();
const PORT = process.env.PORT || 3000;
const incomeRouter = require("./routes/incomeRoute");
const notFoundMiddleware = require("./middleware/not-found");
const errorHandlerMiddlerware = require("./middleware/error-handler");

//middlewares
app.use(express.json());
app.use(
  cors({
    origin: "*",
  })
);

//routes
app.use("/api/v1/incomes", incomeRouter);

//not found handler & error handler
app.use(notFoundMiddleware);
app.use(errorHandlerMiddlerware);

const server = async () => {
  try {
    await connectDB(
      process.env.MONGO_URL ||
        `mongodb+srv://mennameligy567:mennameliGY@cluster0.v0o3igp.mongodb.net/?retryWrites=true&w=majority`
    );
    app.listen(PORT, () => {
      console.log("you are listening on port:", PORT);
    });
  } catch (error) {
    console.log(error.message);
  }
};
server();
