const express = require('express')
const app = express()
const cors = require('cors')
const parser = require('body-parser')
const port = 4000
const http = require('http')
const server = http.createServer(app)
const Mongo = require('mongodb').MongoClient
const ObjectId = require('mongodb').ObjectID
const url = 'mongodb://localhost:27017'
const database = 'chat'
const client = new Mongo(url, {
	useNewUrlParser: true,
	useUnifiedTopology: true
})
const assert = require('assert')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const middleware = require('./middleware').validate
const io = require('socket.io')(server, {
	pingTimeout: 30000
})
const users = [
]

require('dotenv').config()

const secret = process.env.SECRET

server.listen(port, () => {
	console.log('server up and running at port %s', port)
})

client.connect(error => {
	assert.equal(null, error)

	console.log('Connected successfully to server')
})

app.use(cors())
app.use(parser.urlencoded({ extended: false }))
app.use(parser.json())

app.post('/login', (req, res) => {
	const query = {
		where: {
			email: req.body.email
		}
	}

	const find = require('./models/users').find

	const db = client.db(database)

	find(db, query, async user => {
		if (!user) {
			res.status(400).send('e-mail not found')
			return
		}

		const password = req.body.password

		const match = await bcrypt.compare(password, user.password)

		if (match) {
			const token = jwt.sign({ username: user.email },
				secret,
				{ 
					expiresIn: '24h'
				}
			)
      
			res.status(200).send({
				user: {
					id: user._id,
					name: user.name,
					email: user.email,
					online: user.online
				},
				token
			})
		} else {
			res.status(400).send('invalid password')
		}
	})
})

app.post('/register', async (req, res) => {
	const hash = await bcrypt.hash(req.body.password, 10)

	const query = {
		name: req.body.name,
		email: req.body.email,
		password: hash,
		online: false
	}

	const create = require('./models/users').create

	const db = client.db(database)

	create(db, query, result => {
		if (result) {
			const data = result.ops[0]

			const user = {
				_id: data._id,
				name: data.name,
				email: data.email,
				online: data.online
			}

			io.emit('registered', user)
      
			res.status(200).send(result)
		} else {
			res.status(400).send('an error ocurred while signing up, try again...')
		}
	})
})

app.post('/users', middleware, (req, res) => {
	const query = {
		_id: {
			$ne: ObjectId(req.body.id)
		}
	}

	const get = require('./models/users').get

	const db = client.db(database)

	get(db, query, users => {
		res.status(200).send(users)
	})
})

app.post('/room', middleware, (req, res) => {
	const query = {
		where: {
			users: {
				$all: [
					{
						$elemMatch: {
							$eq: ObjectId(req.body.to)
						}
					},
					{
						$elemMatch: {
							$eq: ObjectId(req.body.from)
						}
					}
				]
			}
		},
		set: {
			$setOnInsert: {
				users: [
					ObjectId(req.body.to),
					ObjectId(req.body.from)
				]
			}
		},
		options: {
			upsert: true
		}
	}

	const find = require('./models/rooms').find

	const db = client.db(database)

	find(db, query, room => {
		if (room.ok) {
			if (room.lastErrorObject.upserted) {
				res.status(200).send({
					inserted: room.lastErrorObject.upserted
				})
			} else {
				res.status(200).send(room.value)
			}
		} else {
			res.status(400).send({
				message: 'an error ocurred while joining room, try again...'
			})
		}
	})
})

app.post('/recent', middleware, (req, res) => {
	try {
		const query = {
			where: [
				{
					$match: {
						users: ObjectId(req.body.id)
					}
				},
				{
					$sort: { 
						'messages.at': -1
					}
				},
				{ 
					$limit : 5
				},
				{
					$lookup: {
						from: 'users',
						localField: 'users',
						foreignField: '_id',
						as: 'users'
					}
				}
			]
		}
  
		const recent = require('./models/rooms').recent
  
		const db = client.db(database)
  
		recent(db, query, conversations => {
			res.status(200).send(conversations)
		})
	} catch (error) {
		console.log(error)
	}
})

io.on('connection', socket => {
	console.log('user connected', socket.id)

	socket.on('join', user => {
		console.log('user joined ', user)
		const query = {
			where: {
				_id: ObjectId(user)
			},
			set: {
				$set: { online: true }
			}
		}

		const status = require('./models/users').status

		const db = client.db(database)

		status(db, query, result => {
			if (result) {
				io.emit('joined', user)
				users.push({ id: user, socket: socket })
			}
		})
	})

	socket.on('typing', (to, from, typing) => {
		const user = users.find(item => item.id == to)

		if (user) {
			socket.broadcast.to(user.socket.id).emit('typing', from, typing)
		}
	})

	socket.on('message', (room, message) => {
		message._id = ObjectId()

		socket.emit('message', room, message)

		const user = users.find(item => item.id == message.to)

		if (user) {
			socket.broadcast.to(user.socket.id).emit('message', room, message)
		}

		const query = {
			where: {
				_id: ObjectId(room)
			},
			set: message.append
				? {
					$push: {
						'messages.$[element].message': message.message[0]
					},
					$set: {
						'messages.$[element].at': message.at
					}
				}
				: {
					$push: {
						messages: message
					}
				},
			options: message.append
				? {
					arrayFilters: [
						{
							'element._id': ObjectId(message.append)
						}
					]
				}
				: {}
		}

		const send = require('./models/rooms').send

		const db = client.db(database)

		send(db, query, result => {})
	})

	socket.on('left', () => {
		console.log('user disconnected', socket.id)

		const user = users.find(item => item.socket.id == socket.id)

		if (user) {
			const query = {
				where: {
					_id: ObjectId(user.id)
				},
				set: {
					$set: { online: false }
				}
			}

			const status = require('./models/users').status

			const db = client.db(database)

			status(db, query, result => {
				if (result) {
					io.emit('left', user.id)
					const index = users.findIndex(item => item.socket.id == socket.id)
					users.splice(index, 1)
				}
			})
		}
	})

	socket.on('disconnect', () => {
		console.log('user disconnected', socket.id)

		const user = users.find(item => item.socket.id == socket.id)

		if (user) {
			const query = {
				where: {
					_id: ObjectId(user.id)
				},
				set: {
					$set: { online: false }
				}
			}

			const status = require('./models/users').status

			const db = client.db(database)

			status(db, query, result => {
				if (result) {
					io.emit('left', user.id)
					const index = users.findIndex(item => item.socket.id == socket.id)
					users.splice(index, 1)
				}
			})
		}
	})
})
