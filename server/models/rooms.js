const assert = require('assert')

module.exports = {
	send: async (database, query, callback) => {
		const collection = database.collection('rooms')

		try {
			const result = await collection.updateOne(
				query.where,
				query.set,
				query.options
			)

			callback(result)
		} catch (error) {
			assert.equal(error, null)

			callback(null)
		}
	},
	find: async (database, query, callback) => {
		const collection = database.collection('rooms')

		try {
			const room = await collection.findOneAndUpdate(
				query.where,
				query.set,
				query.options
			)

			callback(room ? room : null)
		} catch (error) {
			assert.equal(error, null)

			callback(null)
		}
	}
}
