// app.js
const express = require('express');
const axios = require('axios');
const app = express();
const port = 3000;
const bodyParser = require('body-parser')
const initWebRouters = require('./routes/index')
const documentStorage = require('./middlewares/documentStorage')
app.use(bodyParser.json({ limit: '50mb' }))
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }))

app.get('/', (req, res) => {
	res.send('Hello from Express.js');
});
initWebRouters(app)
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
