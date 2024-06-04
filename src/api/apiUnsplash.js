import axios from 'axios'

axios.defaults.baseURL = 'https://api.unsplash.com/'
const MY_ACCESS_KEY = 'suaf2wu07XgZnK_npNXtMsloutMsoQZrhx5Kj6p9azw'


export const getPhotosApi = async (searchQuery, page) => {
	const response = await axios.get(`/search/photos`, {
		params: {
			query: searchQuery,
			per_page: 12,
            page,
			client_id: MY_ACCESS_KEY,
			orientation	: 'landscape'
		},
	})
	// console.log(response.data)
	return response.data
}