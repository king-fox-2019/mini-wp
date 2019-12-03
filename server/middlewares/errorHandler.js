module.exports = (err, req, res, next) => {
  console.log("here")
  res.status(err.status).json({msg: err.message})
}