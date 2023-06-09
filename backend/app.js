const express = require("express");
const cors = require("cors");
const { connectDB } = require("./db/connect");
const app = express();
require("dotenv").config();
const morgan = require("morgan");
const PORT = process.env.PORT || 3000;
const transctionsRouter = require("./routes/transactions");
const notFoundMiddleware = require("./middleware/not-found"); // require = import
const errorHandlerMiddlerware = require("./middleware/error-handler");
const zaraAPI = require("./routes/zaraRoute");
const productRouter = require("./routes/ProductRoute");
const burshkaAPI = require("./routes/burshkaRoute");
const springFieldAPI = require("./routes/springFieldRoute");
const reservedAPI = require("./routes/burshkaRoute");
const H_MAPI = require("./routes/H&MRoute");

//middlewares
//order matters
app.use(express.json()); //parsing the retrived data to JSON
app.use(morgan("dev"));
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  next();
});
app.use(
  cors({
    //cors : security purpose : so can receive any request from any site
    origin: "*",
  })
);
//routes
//end-point

app.use("/api/v1", transctionsRouter);
app.use("/api/v1", productRouter);

//not found handler & error handler
// app.use(notFoundMiddleware);
app.use(errorHandlerMiddlerware); // 4 parameters

//app.use overloading parameters
//1- middleware
//2- (string, middleware) => path , routeHandler
//3- (array of strings , routeHandler)

app.use("/api/v1/zara", zaraAPI);

app.use("/api/v1/burshka", springFieldAPI);
app.use("/api/v1/springField", burshkaAPI);
app.use("/api/v1/reserved", reservedAPI);
app.use("/api/v1/H&M", H_MAPI);
app.use(notFoundMiddleware);
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
