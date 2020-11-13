const data = require('../../data.json');
const render = require('../../render');

const fs = require('fs');

module.exports = (req, res) => {
	res.send(render.renderCreate('attendee'));
};