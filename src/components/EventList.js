import "./EventList.css";
import React from 'react';
import { EventTile } from '.';

export class EventList extends React.Component {
	constructor(props) {
		super(props);
		this.state = { eventName: "" }
	}

	createEvent = () => {
		this.props.createEvent(this.state.eventName);
	}

	render() {
		let { selected, events, selectEvent } = this.props;
		if (selected) {
			return <header id="selectedEvent selectable" className="event">
				<p>{selected}</p>
				<button onClick={() => selectEvent("")}>X</button>
			</header>;
		}

		return <div id="events">
			<div className="list-header">
				<p>Select event or create new</p>
				<input placeholder="Event" value={this.state.eventName} onChange={e => this.setState({ eventName: e.target.value })} size="20" />
				<button onClick={this.createEvent}>Create</button>
			</div>
			{events.map(e => <EventTile key={e.name} event={e} {...this.props} />)}
		</div>;
	}
}
