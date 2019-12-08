module.exports = {
	errorHandler: function (err, req, res, next) {
		switch (err.name) {
			case 'JsonWebTokenError':
				res.status(404).json({ message: 'Invalid token' })
				break

			case 'JWTNotFound':
				res.status(400).json({ message: err.message })
				break

			case 'ValidationError':
				const errors = []
				Object.keys(err.errors).forEach(key => {
					errors.push(err.errors[key].message)
				})
				res.status(400).json({ message: errors })
				break

			case 'FailedLogin':
				res.status(400).json({ message: err.message })
				break

			case 'Unauthorized':
				res.status(403).json({ message: err.message })
				break

			case 'BadRequest':
				res.status(400).json({ message: err.message })
				break

			default:
				res.status(500).json(err)
				break
		}
	}
}
