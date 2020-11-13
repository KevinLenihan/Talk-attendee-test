const routes = require('express').Router();
const talks = require('./talks');
const attendees = require('./attendees');
const render = require('../render');
const data = require('../data.json');

routes.get('/', (req, res) => {
	res.send(render.render(data));
});

routes.use('/talks', talks);
routes.use('/attendees', attendees);

module.exports = routes;