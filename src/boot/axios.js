import axios from 'axios'

export default ({ Vue }) => {
	const url = 'https://callmai-admin.herokuapp.com/api/v2'

	Vue.prototype.$get = async (endpoint) => {
		try {
			const response = await axios.get(url + endpoint)

			return response
		} catch (error) {
			console.log(error)
		}
	}

	Vue.prototype.$post = async (endpoint, data) => {
		try {
			const response = await axios.post(url + endpoint, data)

			return response
		} catch (error) {
			console.log(error)
		}
	}

	Vue.prototype.$put = async (endpoint, data) => {
		try {
			const response = await axios.put(url + endpoint, data)

			return response
		} catch (error) {
			console.log(error)
		}
	}

	Vue.prototype.$remove = async (endpoint) => {
		try {
			const response = await axios.delete(url + endpoint)

			return response
		} catch (error) {
			console.log(error)
		}
	}
  
	Vue.prototype.$setToken = (token) => {
		axios.defaults.headers.common = {
			'Authorization': `Bearer ${token}`
		}
	}
}