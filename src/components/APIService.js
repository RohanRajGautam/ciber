export default class APIService {
	// Insert a user
	static InsertUser(body) {
		return fetch(`http://localhost:5000/add`, {
			method: 'POST',
			mode: 'cors',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(body),
		})
			.then((response) => response.json())
			.catch((error) => console.log(error))
	}
}
