// app.js
const express = require('express');
const axios = require('axios');
const app = express();
const port = 3000;

app.get('/', (req, res) => {
	res.send('Hello from Express.js');
});

app.get('/api/express-to-spring', async (req, res) => {
	try {
		const response = await axios.get('http://spring-service:8080/api/hello');
		res.send({ message: `Express.js received: ${response.data}` });
	} catch (error) {
		console.log(error);
		res
			.status(500)
			.send({ error: 'Error communicating with Spring Boot service' });
	}
});

app.listen(port, () => {
	console.log(`Express.js service running at http://localhost:${port}`);
});
