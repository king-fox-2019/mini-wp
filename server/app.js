if (process.env.NODE_ENV === `development`) {
  require("dotenv").config();
}

const express = require("express");
const app = express();
const PORT = process.env.PORT || 3000;
const cors = require("cors");
const routes = require("./routes");
const connectToDb = require("./config/connectToDb");

// connectToDb();
const MongoClient = require("mongodb").MongoClient;
const uri =
  "mongodb+srv://miniWP:foobar@miniwp-3inqr.gcp.mongodb.net/test?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true });
client.connect(err => {
  console.log("connected...");
  const collection = client.db("test").collection("devices");
  // perform actions on the collection object
  client.close();
});

app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(routes);

app.listen(PORT, () => {
  console.log(`Listening to the post ${PORT}`);
});
