var data = require('../../data.json');
const fs = require('fs');

module.exports = (req, res) => {  	
	var attendee = req.body

	// add incremented Id
	var nextId = 0;
	data.attendees.forEach(a => {
	  if (Number(a.id) > nextId) {
	    nextId = a.id;
	  }
	});
	nextId++;
	attendee.id = nextId;

  	data.attendees.push(attendee); 

	fs.writeFile('data.json', JSON.stringify(data), function (err,data) {
	  	if (err) {
	    	return res.send(err);
	  	}
	  	res.send('Attendee Removed Succesfully! <a href="/"><button >Return</button></a>');
	})
	
};