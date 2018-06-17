import React from 'react';
import { MatchControl } from '.';

export function PairingsDisplay({ pairings, onUpdate }) {
	return <div id="pairings" className="settings">
		<h2>Matches</h2>
		{pairings.matches.map(m => <MatchControl key={m.p1.dci} match={m} onUpdate={onUpdate} />)}
	</div>;
}