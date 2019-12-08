const mongoose = require("mongoose");

module.exports = () => {
  mongoose.connect(
    `mongodb://localhost:27017/${process.env.DBNAME}`,
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
      useFindAndModify: false
    },
    err => {
      if (err) console.log(`Failed To Connect Database`);
      else console.log(`Connected To ${process.env.DBNAME} Database`);
    }
  );
};
