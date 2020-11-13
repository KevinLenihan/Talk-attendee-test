var data = require('../../data.json');
const fs = require('fs');

module.exports = (req, res) => {
	var index;
  	const talkId = Number(req.params.talkId);
  	const talk = data.talks.find((m, i) => {index = i; return m.id === Number(talkId)});
  	data.talks.splice(index, 1); 
  	
	resp = fs.writeFile('data.json', JSON.stringify(data), function (err,data) {
	  	if (err) {
	    	return res.send(err);
	  	}
	  	res.send('Talk Removed Succesfully! <a href="/"><button >Return</button></a>');
	})
	
};