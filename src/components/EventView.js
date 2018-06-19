import './EventView.css';
import React from 'react';
import { RoundSpinner, PairingsDisplay } from '.';

export class EventView extends React.Component {
	changeNumRounds = d => {
		this.props.event.changeNumRounds(d);
		this.props.onUpdate();
	}

	increaseRound = () => {
		this.props.event.nextRound();
		this.props.onUpdate();
	}

	decreaseRound = () => {
		if (this.props.event.currentRound === 0) {
			this.props.onBack();
		} else {
			this.props.event.previousRound();
			this.props.onUpdate();
		}
	}

	restartRound = () => {
		this.props.event.restartRound();
		this.props.onUpdate();
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
				{event.canRestartRound() && <button className="button close" onClick={this.restartRound} />}
				<h1>{event.name + (currentRound > 0 ? " - round " + currentRound : "")}</h1>
				{event.canAdvanceRound() && <button className="button next" onClick={this.increaseRound} />}
			</div>
			<div id="event-details">
				{currentRound === 0 && <RoundSpinner numRounds={event.numRounds} changeRounds={this.changeNumRounds} />}
				{currentRound > 0 && <PairingsDisplay pairings={event.rounds[currentRound]} participants={event.participants} onUpdate={this.props.onUpdate} />}
			</div>
		</div>;
	}
}