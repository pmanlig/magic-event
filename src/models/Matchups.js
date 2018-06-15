import { Match } from '.';

export class Matchups {
	constructor(event) {
		this.matches = [];
		this.matches.push(new Match(event.participants[0], event.participants[1]));
	}
}