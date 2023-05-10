const express = require("express");
const cors = require("cors");
const { connectDB } = require("./db/connect");
const app = express();
require("dotenv").config();
const PORT = process.env.PORT || 3000;
const incomeRouter = require("./routes/incomeRoute");
const notFoundMiddleware = require("./middleware/not-found"); // require = import
const errorHandlerMiddlerware = require("./middleware/error-handler");

//middlewares
//order matters
app.use(express.json()); //parsing the retrived data to JSON

app.use(
  cors({
    //cors : security purpose : so can receive any request from any site
    origin: "*",
  })
);
//routes
//end-point

app.use("/api/v1/incomes", incomeRouter);

//not found handler & error handler
app.use(notFoundMiddleware);
app.use(errorHandlerMiddlerware); // 4 parameters

//app.use overloading parameters
//1- middleware
//2- (string, middleware) => path , routeHandler
//3- (array of strings , routeHandler)

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
