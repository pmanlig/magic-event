import React from 'react';
import { MatchControl } from '.';

export function MatchupsDisplay({ matchups }) {
	return <div id="matchups" className="settings">
		<h2>Matches</h2>
		{matchups.matches.map(m => <MatchControl key={m.p1.dci} match={m} />)}
	</div>;
}