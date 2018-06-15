import React from 'react';

export function RoundSpinner({ numRounds, changeRounds }) {
	return <div id="event-settings" className="settings">
		<h2>Rounds</h2>
		<div id="round-control">
			<button className="button previous" onClick={() => changeRounds(-1)} />
			<p>{numRounds}</p>
			<button className="button next" onClick={() => changeRounds(1)} />
		</div>
	</div>;
}