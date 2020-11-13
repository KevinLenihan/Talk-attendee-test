var data = require('../../data.json');
const fs = require('fs');

module.exports = (req, res) => {
	var talkIndex;
	var attendeeIndex;
  	const talkId = Number(req.params.talkId);
  	const attendeeId = Number(req.params.attendeeId);
  	const talk = data.talks.find((m, i) => {talkIndex = i; return m.id === Number(talkId)});
  	const attendee = data.talks[talkIndex].attendees.find((m, i) => {
  		attendeeIndex = i; return m.id === Number(attendeeId)
  	});

  	data.talks[talkIndex].attendees.splice(attendeeIndex, 1); 
  	
	resp = fs.writeFile('data.json', JSON.stringify(data), function (err,data) {
	  	if (err) {
	    	return res.send(err);
	  	}
	  	res.send('Attendee Removed from Talk Succesfully! <a href="/"><button >Return</button></a>');
	})
	
};