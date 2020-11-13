const attendees = require('express').Router();
const remove = require('./remove');
const add = require('./add');
const addPage = require('./addPage');
const data = require('../../data.json');

attendees.param('attendeeId', (req, res, next, value) => {
	next();
});

attendees.get('/add', addPage);

attendees.post('/:attendeeId/remove', remove);
attendees.post('/add', add);

module.exports = attendees;