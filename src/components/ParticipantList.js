import './ParticipantList.css';
import React from 'react';
import { PlaneswalkerTile } from '.';

export function ParticipantList({ event, onUpdate }) {
	return <div id="participant-list">
		<div id="participant-header">
			<h2>{event.participants.length} Participants</h2>
		</div>
		<div id="participant-table">
			{event.participants.map(p => <PlaneswalkerTile key={p.dci} planeswalker={p} onRemove={() => { event.removeParticipant(p); onUpdate(); }} />)}
		</div>
	</div>;
}