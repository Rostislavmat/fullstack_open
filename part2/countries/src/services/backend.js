import axios from 'axios'
const countriesUrl = 'https://restcountries.com/v3.1/'
const weatherUrl = 'https://api.openweathermap.org/data/2.5/weather?' //lat={lat}&lon={lon}&appid={API key}'
const apiKey = process.env.REACT_APP_API_KEY || "localhost:3001"

const getCountryNames = (prefix) => {
	return axios.get(`${countriesUrl}/all?fields=name`).then(response => {
		const data = response.data
		return data.map(country => country.name.common).filter(name => name.toLowerCase().includes(prefix.toLowerCase()))
	})
}


const getCountryData = (country) => {
	return axios.get(`${countriesUrl}/name/${country}`).then(response => {
		return response.data
	})
}

const getWeather = (lat, lon) => {
	return axios.get(`${weatherUrl}lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`).then(response => response.data)
}
/*const create = newObject => {
	return axios.post(baseUrl, newObject).then(response => response.data)
}

const update = (id, newObject) => {
	return axios.put(`${baseUrl}/${id}`, newObject).then(response => response.data)
}

const remove = (id) => { return axios.delete(`${baseUrl}/${id}`).then(response => response.data) }*/

export default { getCountryNames, getCountryData, getWeather }