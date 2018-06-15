import "./EventList.css";
import React from 'react';

export function SelectedEvent({ event, unselectEvent }) {
	return <header id="selectedEvent" className="event selectable">
		<p>{event.name}</p>
		<button onClick={unselectEvent}>X</button>
	</header>;
}