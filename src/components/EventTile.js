import React from 'react';

export function EventTile({ event, deleteEvent, selectEvent }) {
	return <li key={event.name} className="selectable event tile">
		<p>{event.name}</p>
		<button onClick={() => deleteEvent(event)}>X</button>
		<button onClick={() => selectEvent(event)}>></button>
	</li>
}