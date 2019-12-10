if (process.env.NODE_ENV === "development") {
  require("dotenv").config();
}
//declare dep
const express = require("express");
const cors = require("cors");
const connection = require("./config/connection");
const routes = require("./routes");
const morgan = require("morgan");
const errorHandler = require("./middlewares/errorHandler");
const app = express();
const PORT = process.env.PORT || 3000;
//connection to Mongoose DB
connection();
//set depedencies
app.use(cors());
app.use(morgan("dev"));
app.use(
  express.urlencoded({
    extended: false
  })
);
app.use(express.json());
//middleware route
app.use("/", routes);
app.use(errorHandler);
//listen port
app.listen(PORT, err => {
  if (err) console.log(`Failed to Connect Port : ${PORT}`);
  else console.log(`Listen to Port : ${PORT}`);
});

module.exports = app;
