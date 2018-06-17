import { Participant, Matchups } from '.';

export class Event {
	constructor({ name, numRounds, participants, rounds, currentRound }) {
		this.name = name || "";
		this.numRounds = numRounds || 0;
		this.participants = participants ? participants.map(p => new Participant(p)) : [];
		this.rounds = rounds || [];
		this.currentRound = currentRound || 0;
	}

	addParticipant(planeswalker) {
		this.participants.push(new Participant(planeswalker));
	}

	removeParticipant(planeswalker) {
		this.participants = this.participants.filter(p => p.dci !== planeswalker.dci);
	}

	changeNumRounds = d => {
		this.numRounds = Math.max(0, this.numRounds + d);
	}

	nextRound() {
		let nextRound = this.currentRound + 1;
		if (!this.rounds[nextRound]) {
			this.rounds[nextRound] = new Matchups(this);
		}
		this.currentRound = nextRound;
	}

	previousRound() {
		this.currentRound -= 1;
	}
}