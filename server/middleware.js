const jwt = require('jsonwebtoken')

require('dotenv').config()

const secret = process.env.SECRET

module.exports = {
	validate: (req, res, next) => {
		let token = req.headers['x-access-token'] || req.headers['authorization']
    
		if (!token) {
			return res.status(400).send({
				message: 'auth token not supplied'
			})
		}

		if (token.includes('Bearer ')) {
			token = token.replace('Bearer ', '')
		}
    
		jwt.verify(token, secret, (error, decoded) => {
			if (error) {
				return res.status(400).send({
					message: 'invalid token'
				})
			} else {
				req.decoded = decoded
				next()
			}
		})
	}
}