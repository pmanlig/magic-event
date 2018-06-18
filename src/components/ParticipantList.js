import React from 'react';
import { PlaneswalkerTile } from '.';

export function ParticipantList({ event, removeParticipant }) {
	return <div id="participant-list" className="settings">
		<h2>{event.participants.length} Participants</h2>
		{event.participants.map(p => <PlaneswalkerTile key={p.dci} planeswalker={p} onRemove={removeParticipant} />)}
	</div>;
}