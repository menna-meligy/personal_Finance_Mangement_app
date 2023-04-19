const mongoose = require("mongoose");
const uri = `mongodb+srv://mennameligy567:mennameliGY@cluster0.v0o3igp.mongodb.net/?retryWrites=true&w=majority
`;
const db = async () => {
  await mongoose
    .connect(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(() => {
      console.log("Connected to MongoDB!");
    })
    .catch((error) => {
      console.error("Error connecting to MongoDB:", error);
    });
};
module.exports = { db };
