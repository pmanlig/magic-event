import './ParticipantList.css';
import React from 'react';
import { PlaneswalkerTile } from '.';
import { Participant } from '../models';

export function ParticipantList({ event, onUpdate }) {
	let participants = event.participants;
	participants.sort((a, b) => Participant.compare(a, b, participants));
	return <div id="participant-list">
		<div id="participant-header">
			<h2>{event.participants.length} Participants</h2>
		</div>
		<div id="participant-table">
			{participants.map(p => <PlaneswalkerTile key={p.dci} planeswalker={p} participants={participants} onRemove={() => { event.removeParticipant(p); onUpdate(); }} />)}
		</div>
	</div>;
}