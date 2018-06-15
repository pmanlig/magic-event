import './EventView.css';
import React from 'react';
import { ParticipantList, RoundSpinner, MatchupsDisplay } from '.';
import { Matchups } from '../models';

export class EventView extends React.Component {
	constructor(props) {
		super(props);
		this.state = { currentRound: 0 };
	}

	removeParticipant = p => {
		this.props.event.removeParticipant(p);
		this.props.onUpdate();
	}

	changeRounds = d => {
		this.props.event.numRounds = Math.max(this.props.event.numRounds + d, 0);
		this.props.onUpdate();
	}

	increaseRound = () => {
		let event = this.props.event;
		let nextRound = this.state.currentRound + 1;
		if (!event.rounds[nextRound]) {
			event.rounds[nextRound] = new Matchups(event);
		}
		this.setState({ currentRound: nextRound });
	}

	decreaseRound = () => {
		if (this.state.currentRound === 0) {
			this.props.onBack();
			return;
		}
		this.setState({ currentRound: this.state.currentRound - 1 });
	}

	render() {
		let { event } = this.props;
		let { currentRound } = this.state;

		if (!event) {
			return <div id="event-view"><div id="event-bar"><h1>Event</h1></div></div>;
		}

		return <div id="event-view">
			<div id="event-bar">
				<button className="button previous" onClick={this.decreaseRound} />
				<h1>{event.name + (currentRound > 0 ? " - round " + currentRound : "")}</h1>
				{event.numRounds > this.state.currentRound && <button className="button next" onClick={this.increaseRound} />}
			</div>
			<div id="event-details">
				<ParticipantList event={event} removeParticipant={this.removeParticipant} />
				{currentRound === 0 && <RoundSpinner numRounds={event.numRounds} changeRounds={this.changeRounds} />}
				{currentRound > 0 && <MatchupsDisplay matchups={event.rounds[currentRound]} />}
			</div>
		</div>;
	}
}