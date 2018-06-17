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

	conclude() {
		let { p1, p2, result } = this;

		if (p2 === null) {
			p1.scores.push(3);
			return;
		}
		p1.opponents.push(p2.dci);
		p2.opponents.push(p1.dci);
		p1.scores.push(result === "2-0" || result === "2-1" ? 3 : result === "1-1" ? 1 : 0);
		p2.scores.push(result === "0-2" || result === "1-2" ? 3 : result === "1-1" ? 1 : 0);
	}
}