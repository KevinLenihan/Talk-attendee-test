var data = require('../../data.json');
const fs = require('fs');

module.exports = (req, res) => {
	var index;
  	const attendeeId = Number(req.params.attendeeId);
  	const attendee = data.attendees.find((m, i) => {index = i; return m.id === Number(attendeeId)});
  	data.attendees.splice(index, 1); 
  	
	resp = fs.writeFile('data.json', JSON.stringify(data), function (err,data) {
	  	if (err) {
	    	return res.send(err);
	  	}
	  	res.send('Attendee Removed Succesfully! <a href="/"><button >Return</button></a>');
	})
	
};