class PageRender {

	renderTalks(data) {
		this.talks = data.talks;
		this.attendees = data.attendees;
		if (!this.talks){
			return data.talks;
		}
		var htmlOut = '<form method="get">Talks: ' + this.addButton('talk') + 
			'</form><form method="post"><ul>'; 
		this.talks.forEach(item => htmlOut += this.renderTalk(item));
		htmlOut += '</ul></form>';
		return htmlOut;
	}

	renderTalk(item) {
		var htmlOut = '<li>' + this.removeButton(item) + '<ul>';
		htmlOut += '<li>Title: ' + item.title + '</li>';
		htmlOut += '<li>Room: ' + item.room + '</li>';
		htmlOut += '<li>Speaker: ' + this.renderSpeaker(item.speaker) + '</li>';
		htmlOut += '<li>Attendees: ' + this.addButtonList(item, this.attendees) +
			this.renderAttendees(item.attendees, true, item.id) + '</li>';
		htmlOut += '</ul></li>';
		return htmlOut;
	}

	removeButton(item, parentId = null) {
		var name = 'Delete Talk'
		var path = '/talks/' + item.id + '/remove';
		if ('name' in item) {
			if (parentId) {
				name = 'Remove Attendee from Talk';
				path = '/talks/' + parentId + '/attendees/' + item.id + '/remove';
			} else {
				name = 'Delete Attendee';
				path = '/attendees/' + item.id + '/remove';
			}
		}
		return '<button type="submit" formaction="' + path + '">' + name + '</button>';
	}

	addButton(type) {
		var name = 'Create Talk';
		var path = '/talks/add';
		if (type == 'attendee') {
			name = 'Create Attendee';
			path = '/attendees/add';
		}
		return '<button type="submit" formaction="' + path + '">' + name + '</button>';
	}

	addButtonList(talk, attendees) {
		var htmlOut = '';
		var path = '/talks/' + talk.id + '/attendees/';
		// get existing attendees 
		var attendeeList = [];
		talk.attendees.forEach(attendee => attendeeList.push(attendee.id));
		// show only missing attendees
		attendees.forEach(attendee => {
			if (!attendeeList.includes(attendee.id)) {
				htmlOut += '<button type="submit" formaction="' + path + attendee.id + '/add">Add ' + attendee.name + '</button>';
			}
		});
		return htmlOut;
	}

	renderSpeaker(speaker) {
		var htmlOut = '<ul>';
		htmlOut += '<li>Name: ' + speaker.name + '</li>';
		htmlOut += '<li>Company: ' + speaker.company + '</li>';
		htmlOut += '<li>Email: ' + speaker.email + '</li>';
		htmlOut += '<li>Bio: ' + speaker.bio + '</li>';
		htmlOut += '</ul>';
		return htmlOut;
	}

	renderAttendees(list, isSublist, parentId) {
		var htmlOut = '<ul>';
		if (!isSublist) {
			list = this.attendees;
			var htmlOut = '<form method="get">Attendees: ' + this.addButton('attendee') + 
			'</form><form method="post"><ul>';
		}
		 
		list.forEach(item => htmlOut += this.renderAttendee(item, isSublist, parentId));
		htmlOut += '</ul>';
		if (!isSublist) {
			htmlOut +='</form>';
		}
		return htmlOut;
	}

	renderAttendee(attendee, isSublist, parentId) {
		var htmlOut = '<li>' + this.removeButton(attendee, parentId) + '<ul>';
		htmlOut += '<li>Name: ' + attendee.name + '</li>';
		htmlOut += '<li>Company: ' + attendee.company + '</li>';
		htmlOut += '<li>Email: ' + attendee.email + '</li>';
		htmlOut += '<li>Registered: ' + attendee.registered + '</li>';
		htmlOut += '</ul></li>';
		return htmlOut;
	}

	renderSingle(key, value) {
		return '<li>' + key + ': ' + value + '<li>';
	}

	textfield(name, id) {
		var htmlOut = '<label for="' + id +'">' + name + ':</label>';
  		htmlOut += '<input type="text" id="' + id + '" name="' + id + '"><br>';
		return htmlOut;
	}
}
 

class MainRender extends PageRender {
	render(data) {
		this.talks = data.talks;
		this.attendees = data.attendees;

		var htmlOut = this.renderTalks(data);
		htmlOut += this.renderAttendees(data, false);
		return htmlOut;
	}
}

class CreateAttendeeRender extends PageRender {
	render(type) {
		var htmlOut = '<form method="post">New Attendee: <br>';
		htmlOut += this.textfield('Name', 'name');
		htmlOut += this.textfield('Company', 'company');
		htmlOut += this.textfield('Email', 'email');
		htmlOut += this.textfield('Registered', 'registered');
		htmlOut += '<br>';
		htmlOut += '<button type="submit" formaction="/attendees/add">Create Attendee</button>';
		htmlOut += '</form>';
		return htmlOut;
	}
}

class CreateTalkRender extends PageRender {
	render(type) {
		var htmlOut = '<form method="post">New Talk: <br>';
		htmlOut += this.textfield('Title', 'title');
		htmlOut += this.textfield('Room', 'room');
		htmlOut += this.textfield('Speaker Name', 'speaker-name');
		htmlOut += this.textfield('Speaker Company', 'speaker-company');
		htmlOut += this.textfield('Speaker Email', 'speaker-email');
		htmlOut += this.textfield('Speaker Bio', 'speaker-bio');
		htmlOut += '<br>';
		htmlOut += '<button type="submit" formaction="/talks/add">Create Talk</button>';
		htmlOut += '</form>';
		return htmlOut;
	}
}

function render(data) {
	var out;
	
	if ('talks' in data && 'attendees' in data) {
		out = new MainRender();
	} else if(Array.isArray(data)) {
		out = new ListRender();
	} else {
		out = new ItemRender();
	}
	return out.render(data);

}

function renderCreate(type) {
	var out;
	if (type == 'attendee') {
		out = new CreateAttendeeRender()
	} else {
		out = new CreateTalkRender()
	}
	return out.render();
}

module.exports.render = render;
module.exports.renderCreate = renderCreate;
