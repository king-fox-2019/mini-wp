const mongoose = require("mongoose");

module.exports = () => {
  mongoose.connect(
    "mongodb://localhost:27017/miniWP",
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
      useFindAndModify: false
    },
    err => {
      if (err) console.log(err);
      else console.log(`Connected To Database`);
    }
  );
};
// const MongoClient = require("mongodb").MongoClient;
// const uri =
//   "mongodb+srv://miniWP:foobar@miniwp-3inqr.gcp.mongodb.net/test?retryWrites=true&w=majority";
// const client = new MongoClient(uri, { useNewUrlParser: true });
// client.connect(err => {
//   console.log("connected...");
//   const collection = client.db("test").collection("devices");
//   // perform actions on the collection object
//   client.close();
// });
