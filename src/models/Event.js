import { Participant, Pairings } from '.';

export class Event {
	constructor({ name, numRounds, participants, rounds, currentRound }) {
		this.name = name || "";
		this.numRounds = numRounds || 0;
		this.participants = participants ? participants.map(p => new Participant(p)) : [];
		this.rounds = rounds ? rounds.map(r => Pairings.fromJson(r)) : [];
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
		let { currentRound, rounds } = this;
		let nextRound = currentRound + 1;
		if (currentRound > 0 && !rounds[nextRound]) {
			rounds[currentRound].conclude();
			this.participants.sort((a, b) => b.score() - a.score());
		}
		if (currentRound < this.numRounds) {
			if (!rounds[nextRound]) {
				rounds[nextRound] = Pairings.fromEvent(this);
			}
			this.currentRound = nextRound;
		} else {
			this.currentRound = 0;
		}
	}

	previousRound() {
		this.currentRound -= 1;
	}

	restartRound() {
		this.rounds[this.currentRound] = Pairings.fromEvent(this);
	}

	canRestartRound() {
		return this.currentRound > 0 && !this.rounds[this.currentRound].isComplete();
	}

	canAdvanceRound() {
		return this.currentRound === 0 || this.rounds[this.currentRound].isComplete();
	}
}