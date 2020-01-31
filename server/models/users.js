const assert = require('assert')

module.exports = {
  get: async (database, query, callback) => {
    const collection = database.collection('users')

    try {
      const result = await collection.find(query).toArray()

      callback(result)
    } catch (error) {
      assert.equal(error, null)

      callback(null)
    }
  },
  create: async (database, query, callback) => {
    const collection = database.collection('users')

    try {
      const result = await collection.insertOne(query)

      callback(result)
    } catch (error) {
      assert.equal(error, null)

      callback(null)
    }
  },
  status: async (database, query, callback) => {
    const collection = database.collection('users')

    try {
      const result = await collection.updateOne(query.where, query.set)

      callback(result)
    } catch (error) {
      assert.equal(error, null)

      callback(null)
    }
  },
  find: async (database, query, callback) => {
    const collection = database.collection('users')

    const projection = {
      projection: {
        password: 0
      }
    }

    try {
      const user = await collection.findOne(query, projection)

      callback(user ? user : null)
    } catch (error) {
      assert.equal(error, null)

      callback(null)
    }
  }
}
