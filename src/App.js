import './App.css';
import React, { Component } from 'react';
import logo from './logo.svg';
import { Event } from './models';
import { EventList, SelectedEvent, Participants, EventView } from './components';

class App extends Component {
	constructor(props) {
		super(props);
		let storedEvents = window.localStorage.getItem("events");
		if (storedEvents) {
			storedEvents = JSON.parse(storedEvents);
		}
		this.state = {
			events: storedEvents || [],
			selectedEvent: null,
			statusMsg: ""
		}
	}

	setStatusMsg(msg) {
		this.setState({ statusMsg: msg });
		window.setTimeout(() => this.setState({ statusMsg: "" }), 3000);
	}

	updateEvents(newEvents) {
		window.localStorage.setItem("events", JSON.stringify(newEvents));
		this.setState({ events: newEvents });
	}

	addEvent = e => {
		if (!e || e === "") {
			this.setStatusMsg("Kan inte skapa event utan namn!");
			return;
		}

		if (this.state.events.filter(ev => ev.name === e).length > 0) {
			this.setStatusMsg("Eventet finns redan!");
			return;
		}

		this.updateEvents(this.state.events.concat([new Event(e)]));
	}

	deleteEvent = e => {
		this.updateEvents(this.state.events.filter(ev => ev.name !== e.name));
	}

	selectEvent = e => {
		this.setState({ selectedEvent: e });
	}

	render() {
		let { selectedEvent, events, statusMsg } = this.state;
		return (
			<div className="App">
				<header className="App-header">
					<img src={logo} className="App-logo" alt="logo" />
					<h1 className="App-title">Magic: the Gathering event administrator</h1>
				</header>
				{selectedEvent && <SelectedEvent event={selectedEvent} unselectEvent={() => this.selectEvent("")} />}
				<div className="content">
					{!selectedEvent && <EventList events={events} selected={selectedEvent} createEvent={this.addEvent} deleteEvent={this.deleteEvent} selectEvent={this.selectEvent} />}
					{selectedEvent && <Participants event={selectedEvent} />}
					<EventView event={selectedEvent} />
				</div>
				{statusMsg !== "" && <div id="statusMsg">{statusMsg}</div>}
			</div>
		);
	}
}

export default App;
