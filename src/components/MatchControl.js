import React from 'react';
import { PlaneswalkerTile } from '.';

export class MatchControl extends React.Component {
	render() {
		return <div className="match"><PlaneswalkerTile planeswalker={this.props.match.p1} /> <p>vs.</p> <PlaneswalkerTile planeswalker={this.props.match.p2} /></div>
	}
}