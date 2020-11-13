var data = require('../../data.json');
const fs = require('fs');

module.exports = (req, res) => {
  	var talkIn = req.body;
  	
  	// minor formatting
	var talk = {speaker:{}};
	talk.speaker.name = talkIn["speaker-name"];
	talk.speaker.company = talkIn["speaker-company"];
	talk.speaker.email = talkIn["speaker-email"];
	talk.speaker.bio = talkIn["speaker-bio"];
	talk.title = talkIn.title;
	talk.room = talkIn.room;
	talk.attendees = [];

	// add incremented Id
	var nextId = 0;
	data.talks.forEach(t => {
	  if (Number(t.id) > nextId) {
	    nextId = t.id;
	  }
	});
	nextId++;
	talk.id = nextId;

  	data.talks.push(talk); 
  	
	resp = fs.writeFile('data.json', JSON.stringify(data), function (err,data) {
	  	if (err) {
	    	return res.send(err);
	  	}
	  	res.send('Talk Added Succesfully! <a href="/"><button >Return</button></a>');
	})
	
};