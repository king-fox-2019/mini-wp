module.exports = (err, req, res, next) => {
  let status = 500;
  let message= "Internal Server Error";
  if (err.name === "ValidationError") {
    status = 400;
    message = err.message;
  }
  res.status(status).json({ message })
}