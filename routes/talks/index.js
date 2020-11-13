const talks = require('express').Router();
const remove = require('./remove');
const removeAttendee = require('./removeAttendee');
const addAttendee = require('./addAttendee');
const add = require('./add');
const addPage = require('./addPage');
const data = require('../../data.json');

var talkIndex;
talks.param('talkId', (req, res, next, value) => {
  const talk = data.talks.find((m, i) => {talkIndex = i; return m.id === Number(value)});
  if (talk) {
    req['talk'] = talk;
    next();
  } else {
    res.status(404).send('Talk Not Found');
  }
});

talks.param('attendeeId', (req, res, next, value) => {
	next();
});

talks.post('/:talkId/remove', remove);
talks.post('/:talkId/attendees/:attendeeId/remove', removeAttendee);

talks.post('/:talkId/attendees/:attendeeId/add',addAttendee);

talks.get('/add', addPage);
talks.post('/add', add);

module.exports = talks;

