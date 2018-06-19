import { Participant } from '.';

export class Match {
	p1 = null;
	p2 = null;
	result = undefined;

	static fromJson(match) {
		let m = new Match();
		m.p1 = new Participant(match.p1);
		m.p2 = match.p2 === null ? null : new Participant(match.p2);
		m.result = match.result;
		return m;
	}

	static fromPlayers(p1, p2) {
		let m = new Match();
		m.p1 = p1;
		m.p2 = p2;
		return m;
	}

	reverse(s) {
		return s.split("").reverse().join("");
	}

	conclude() {
		let { p1, p2, result, reverse } = this;

		p1.conclude(result, p2);
		if (null !== p2) {
			p2.conclude(reverse(result), p1);
		}
	}
}