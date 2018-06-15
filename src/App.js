import './Buttons.css';
import './App.css';
import React, { Component } from 'react';
import logo from './logo.svg';
import { Storage } from './logic';
import { Event } from './models';
import { EventList, Participants, EventView } from './components';

const eventsKey = "events";
const selectedKey = "selected";

class App extends Component {
	constructor(props) {
		super(props);
		this.state = {
			events: this.loadEvents(),
			selectedEvent: this.loadSelectedEvent(),
			statusMsg: ""
		}
	}

	loadSelectedEvent() {
		let loadedEvent = Storage.getItem(selectedKey);
		return loadedEvent ? new Event(loadedEvent) : null;
	}

	loadEvents() {
		let loadedEvents = Storage.getItem(eventsKey);
		return loadedEvents ? loadedEvents.map(e => new Event(e)) : [];
	}

	setStatusMsg(msg) {
		this.setState({ statusMsg: msg });
		window.setTimeout(() => this.setState({ statusMsg: "" }), 3000);
	}

	updateEvents(newEvents) {
		Storage.setItem(eventsKey, newEvents);
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

		this.updateEvents(this.state.events.concat([new Event({ name: e })]));
	}

	deleteEvent = e => {
		this.updateEvents(this.state.events.filter(ev => ev.name !== e.name));
	}

	selectEvent = e => {
		Storage.setItem(selectedKey, e);
		Storage.setItem(eventsKey, this.state.events);
		this.setState({ selectedEvent: e });
	}

	updateSelectedEvent = () => {
		Storage.setItem(selectedKey, this.state.selectedEvent);
		Storage.setItem(eventsKey, this.state.events);
		this.setState({});
	}

	render() {
		let { selectedEvent, events, statusMsg } = this.state;
		return (
			<div className="App">
				<header className="App-header">
					<img src={logo} className="App-logo" alt="logo" />
					<h1 className="App-title">Magic: the Gathering event administrator</h1>
				</header>
				<div className="content">
					{!selectedEvent && <EventList events={events} selected={selectedEvent} createEvent={this.addEvent} deleteEvent={this.deleteEvent} selectEvent={this.selectEvent} />}
					{selectedEvent && <Participants event={selectedEvent} onUpdate={this.updateSelectedEvent} />}
					<EventView event={selectedEvent} onBack={() => this.selectEvent(null)} onUpdate={this.updateSelectedEvent} />
				</div>
				{statusMsg !== "" && <div id="statusMsg">{statusMsg}</div>}
			</div>
		);
	}
}

export default App;
