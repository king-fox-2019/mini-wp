const mongoose = require("mongoose");

module.exports = () => {
  mongoose.connect(
    "mongodb+srv://miniWP:foobar@miniwp-3inqr.gcp.mongodb.net/test?retryWrites=true&w=majority",
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
