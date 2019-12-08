module.exports = (req, res, next) => {
  next({ status: 404, message: 'Invalid endpoint/not found' })
}
