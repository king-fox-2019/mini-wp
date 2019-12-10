const mongoose = require("mongoose");
const mongoUri = process.env.MONGO_URI;

module.exports = () => {
  mongoose.connect(
    mongoUri + `-${process.env.NODE_ENV}`,
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
      useFindAndModify: true
    },
    err => {
      if (err) {
        console.log(`Failed to connect : ${mongoUri}-${process.env.NODE_ENV}`);
      } else
        [console.log(`Connected to : ${mongoUri}-${process.env.NODE_ENV}`)];
    }
  );
};
