import { Participant } from '.';

export class Event {
	constructor({ name, numRounds, participants, rounds }) {
		this.name = name || "";
		this.numRounds = numRounds || 0;
		this.participants = participants ? participants.map(p => new Participant(p)) : [];
		this.rounds = rounds || [];
	}

	addParticipant(planeswalker) {
		this.participants.push(new Participant(planeswalker));
	}

	removeParticipant(planeswalker) {
		this.participants = this.participants.filter(p => p.dci !== planeswalker.dci);
	}
}