import { Match } from '.';

export class Pairings {
	matches = [];

	static fromJson(other) {
		let p = new Pairings();
		p.matches = other ? other.matches.map(m => Match.fromJson(m)) : [];
		return p;
	}

	static fromEvent(event) {
		let p = new Pairings();
		let players = event.participants
			.map(pl => { return { player: pl, seed: Math.random() } })
			.sort((f, g) => f.player.score() === g.player.score() ? g.seed - f.seed : g.player.score() - f.player.score());
		while (players.length > 1) {
			let p1 = players.shift().player;
			let possibleOpponents = players.filter(o => !p1.opponents.some(xo => xo === o.player.dci));
			if (possibleOpponents.length === 0) {
				p.matches.push(Match.fromPlayers(p1, null));
			} else {
				let p2 = possibleOpponents.shift().player;
				players = players.filter(xp => xp.player.dci !== p2.dci);
				p.matches.push(Match.fromPlayers(p1, p2));
			}
		}
		if (players.length > 0) {
			p.matches.push(Match.fromPlayers(players.shift().player, null));
		}
		return p;
	}

	isComplete() {
		return !this.matches.some(m => m.result === undefined && m.p2 !== null);
	}

	conclude() {
		this.matches.forEach(m => m.conclude());
	}
}