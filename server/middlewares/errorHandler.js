module.exports = (err, req, res, next) => {
  let status;
  let message;
  let errors = [];
  console.log("error ==>>", err.message);

  if (err.name === "JsonWebTokenError" || err.name === "TokenExpiredError") {
    status = 401;
    message = "You should log in first!";

    errors = [message];
  } else if (
    err.name === "ValidationError" ||
    err === "404"
    // err.status == 400
  ) {
    status = 400;
    // let current = null;
    for (let key in err.errors) {
      // current = err.errors[key].message;
      // if (current !== err.errors[key].message) {
      errors.push(err.errors[key].message);
      // }
    }
    // errors.push(err.message);
  } else if (err.kind === "ObjectId") {
    status = 404;
    message = `Object not found`;
    errors = [message];
  } else {
    status = err.status || 500;
    message = err.message || `Internal server error`;

    errors = [message];
  }
  res.status(status).json({
    errors
  });
};
