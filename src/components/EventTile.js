import React from 'react';

export function EventTile({ event, deleteEvent, selectEvent }) {
	return <div key={event.name} className="selectable event tile">
		<p>{event.name}</p>
		<button className="button close" onClick={() => deleteEvent(event)} />
		<button className="button next" onClick={() => selectEvent(event)} />
	</div>;
}