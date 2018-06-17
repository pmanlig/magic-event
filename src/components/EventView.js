import './EventView.css';
import React from 'react';
import { ParticipantList, RoundSpinner, MatchupsDisplay } from '.';

export class EventView extends React.Component {
	removeParticipant = p => {
		this.props.event.removeParticipant(p);
		this.props.onUpdate();
	}

	changeRounds = d => {
		this.props.event.changeNumRounds(d);
		this.props.onUpdate();
	}

	increaseRound = () => {
		this.props.event.nextRound();
		this.setState({});
	}

	decreaseRound = () => {
		if (this.props.event.currentRound === 0) {
			this.props.onBack();
		} else {
			this.props.event.previousRound();
			this.setState({});
		}
	}

	render() {
		let event = this.props.event;

		if (!event) {
			return <div id="event-view"><div id="event-bar"><h1>Event</h1></div></div>;
		}

		let currentRound = event.currentRound;

		return <div id="event-view">
			<div id="event-bar">
				<button className="button previous" onClick={this.decreaseRound} />
				<h1>{event.name + (currentRound > 0 ? " - round " + currentRound : "")}</h1>
				{event.numRounds > currentRound && <button className="button next" onClick={this.increaseRound} />}
			</div>
			<div id="event-details">
				<ParticipantList event={event} removeParticipant={this.removeParticipant} />
				{currentRound === 0 && <RoundSpinner numRounds={event.numRounds} changeRounds={this.changeRounds} />}
				{currentRound > 0 && <MatchupsDisplay matchups={event.rounds[currentRound]} />}
			</div>
		</div>;
	}
}