import React from 'react';
import { PlaneswalkerTile, ResultButton } from '.';

export class MatchControl extends React.Component {
	selectResult = res => {
		this.props.match.result = res;
		this.props.onUpdate();
	}

	render() {
		let { match, participants } = this.props;
		if (match.p2 === null) {
			return <div className="match">
				<div><PlaneswalkerTile planeswalker={match.p1} participants={participants} /> <p>BYE</p></div>
			</div>;
		}
		return <div className="match">
			<div><PlaneswalkerTile planeswalker={match.p1} participants={participants} /> <p>{match.result || "vs."}</p> <PlaneswalkerTile planeswalker={match.p2} participants={participants} /></div>
			<div className="result-selector">
				<ResultButton result="2-0" match={match} onSelect={this.selectResult} />
				<ResultButton result="2-1" match={match} onSelect={this.selectResult} />
				<ResultButton result="1-0-0" match={match} onSelect={this.selectResult} />
				<ResultButton result="1-1-0" match={match} onSelect={this.selectResult} />
				<ResultButton result="1-1-1" match={match} onSelect={this.selectResult} />
				<ResultButton result="1-0-1" match={match} onSelect={this.selectResult} />
				<ResultButton result="0-1-0" match={match} onSelect={this.selectResult} />
				<ResultButton result="0-1-1" match={match} onSelect={this.selectResult} />
				<ResultButton result="0-0-1" match={match} onSelect={this.selectResult} />
				<ResultButton result="1-2" match={match} onSelect={this.selectResult} />
				<ResultButton result="0-2" match={match} onSelect={this.selectResult} />
			</div>
		</div>
	}
}