import { Planeswalker } from '.';

export class Participant extends Planeswalker {
	constructor({ scores, ...p }) {
		super({ ...p });
		this.scores = scores || [];
	}

	score() {
		return this.scores.reduce((t, n) => t + n, 0);
	}
}