import axios from 'axios'

export default ({ Vue }) => {
	axios.defaults.baseURL = process.env.API || 'http://localhost:3333/api/v1'

	Vue.prototype.$get = async (endpoint) => {
		try {
			const response = await axios.get(endpoint)

			return response
		} catch (error) {
			console.log(error)
		}
	}

	Vue.prototype.$post = async (endpoint, data) => {
		try {
			const response = await axios.post(endpoint, data)

			return response
		} catch (error) {
			console.log(error)
		}
	}

	Vue.prototype.$put = async (endpoint, data) => {
		try {
			const response = await axios.put(endpoint, data)

			return response
		} catch (error) {
			console.log(error)
		}
	}

	Vue.prototype.$delete = async (endpoint) => {
		try {
			const response = await axios.delete(endpoint)

			return response
		} catch (error) {
			console.log(error)
		}
	}
}