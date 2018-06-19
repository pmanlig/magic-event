import { Planeswalker } from '.';

export class Participant extends Planeswalker {
	constructor({ matchScores, gameScore, games, opponents, ...p }) {
		super({ ...p });
		this.matchScores = matchScores || [];
		this.gameScore = gameScore || 0;
		this.games = games || 0;
		this.opponents = opponents || [];  // Opponent's DCI by round
	}

	matchScore() {
		return this.matchScores.reduce((t, n) => t + n, 0);
	}

	matchPercentage() {
		return this.matchScores.reduce((t, n) => t + n, 0) / (this.matchScores.length * 3);
	}

	opponentsMatchScore(participants) {
		let opponents = participants.filter(p => this.opponents.some(dci => dci === p.dci));
		return opponents.map(o => Math.max(o.matchPercentage(), 0.33)).reduce((o, n) => o + n, 0) / this.opponents.length;
	}

	gamePercentage() {
		return this.gameScore / (this.games * 3);
	}

	opponentsGameScore(participants) {
		let opponents = participants.filter(p => this.opponents.some(dci => dci === p.dci));
		return opponents.map(o => Math.max(o.gamePercentage(), 0.33)).reduce((o, n) => o + n, 0) / this.opponents.length;
	}

	static compare(me, other, participants) {
		let matchPoints = other.matchScore() - me.matchScore();
		if (matchPoints !== 0) { return matchPoints }
		let opponentMatchPercentage = other.opponentsMatchScore(participants) - me.opponentsMatchScore(participants);
		if (opponentMatchPercentage !== 0) { return opponentMatchPercentage }
		let gamePercentage = other.gamePercentage() - me.gamePercentage();
		if (gamePercentage !== 0) { return gamePercentage }
		return other.opponentsGameScore(participants) - me.opponentsGameScore(participants);
	}

	matchPoints(result) {
		return ["2-0", "2-1", "1-0-0", "1-1-0"].includes(result) ? 3 : (["1-0-1", "1-1-1", "0-1-0"].includes(result) ? 1 : 0);
	}

	gamePoints(result) {
		return ["2-0", "2-1"].includes(result) ? 6 : ("1-1-1" === result ? 4 : (["1-0-0", "1-0-1", "1-2"].includes(result) ? 3 : ("0-1-0" === result ? 1 : 0)));
	}

	numGames(result) {
		return ["2-1", "1-1-1", "1-2"].includes(result) ? 3 : (["2-0", "0-2", "1-1-0", "1-0-1", "0-1-1"].includes(result) ? 2 : 1);
	}

	conclude(result, opponent) {
		console.log(this);
		console.log(result);
		if (null !== opponent) {
			this.opponents.push(opponent.dci)
		} else {
			result = "2-0";
		}
		this.matchScores.push(this.matchPoints(result));
		this.gameScore += this.gamePoints(result);
		this.games += this.numGames(result);
		console.log(this);
	}
}