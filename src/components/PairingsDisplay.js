import React from 'react';
import { MatchControl } from '.';

export function PairingsDisplay({ pairings, participants, onUpdate }) {
	return <div id="pairings" className="settings">
		<h2>Matches</h2>
		{pairings.matches.map(m => <MatchControl key={m.p1.dci} match={m} participants={participants} onUpdate={onUpdate} />)}
	</div>;
}