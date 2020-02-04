const express = require('express')
const app = express()
const cors = require('cors')
const parser = require('body-parser')
const port = 4000
const http = require('http')
const server = http.createServer(app)
const Mongo = require('mongodb').MongoClient
const ObjectId = require('mongodb').ObjectID
const url = `mongodb://localhost:27017`
const database = 'chat'
const client = new Mongo(url, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
const assert = require('assert')
const io = require('socket.io')(server, {
  pingTimeout: 30000
})
const users = []

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
    where: req.body,
    projection: {
      password: 0
    }
  }

  const find = require('./models/users').find

  const db = client.db(database)

  find(db, query, user => {
    res.status(200).send(user)
  })
})

app.post('/register', (req, res) => {
  const query = {
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
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
    }

    res.status(200).send(result)
  })
})

app.post('/users', (req, res) => {
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

app.post('/room', (req, res) => {
  const query = {
    where: {
      $or: [
        {
          $and: [
            {
              to: ObjectId(req.body.to)
            },
            {
              from: ObjectId(req.body.from)
            }
          ]
        },
        {
          $and: [
            {
              to: ObjectId(req.body.from)
            },
            {
              from: ObjectId(req.body.to)
            }
          ]
        }
      ]
    },
    set: {
      $setOnInsert: {
        to: ObjectId(req.body.to),
        from: ObjectId(req.body.from)
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
      res.status(400).send(null)
    }
  })
})

io.on('connection', socket => {
  console.log('user connected', socket.id)

  socket.on('join', user => {
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

  socket.on('message', (room, message) => {
    message._id = ObjectId()

    socket.emit('message', message)

    const user = users.find(item => item.id == message.to)

    if (user) {
      socket.broadcast.to(user.socket.id).emit('message', message)
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

    send(db, query, result => {
      
    })
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
