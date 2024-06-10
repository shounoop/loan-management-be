'use strict';
const express = require('express');
const axios = require('axios');
const app = express();
const port = 3000;
const database = require('./models');
const initWebRouters = require('./routes/web');
const viewEngine = require('./configs/viewEngine');
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// database.sequelize
// 	.sync({ force: true })
// 	.then(() => {
// 		console.log('Database synchronization successful');
// 	})
// 	.catch((err) => {
// 		console.log(err);
// 	});

database.sequelize
	.authenticate()
	.then(() => {
		console.log('Connection to database successful!');
	})
	.catch((err) => {
		console.log(err);
	});

app.use('/api', require('./routes'));
initWebRouters(app);
viewEngine(app);
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
