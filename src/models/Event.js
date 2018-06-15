export class Event {
	name = "";
	numMatches = 0;
	participants = [];

	constructor(name) {
		this.name = name;
	}

	addParticipant(planeswalker) {
		this.participants.push(planeswalker);
	}

	removeParticipant(planeswalker) {
		this.participants = this.participants.filter(p => p.dci !== planeswalker.dci);
	}
}