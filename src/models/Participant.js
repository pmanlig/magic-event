import { Planeswalker } from '.';

export class Participant extends Planeswalker {
	constructor({ scores, opponents, ...p }) {
		super({ ...p });
		this.scores = scores || [];  // Scores by round
		this.opponents = opponents || [];  // Opponent's DCI by round
	}

	score() {
		return this.scores.reduce((t, n) => t + n, 0);
	}
}