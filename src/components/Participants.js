import "./Participants.css";
import React from 'react';
import { Planeswalker } from '../models';
import { PlaneswalkerTile } from '.';

export class Participants extends React.Component {
	constructor(props) {
		super(props);
		let directory = window.localStorage.getItem("pwdirectory");
		if (directory !== undefined) {
			directory = JSON.parse(directory);
		}
		this.state = {
			directory: directory || [],
			name: "",
			dci: ""
		};
	}

	updateName = e => {
		this.setState({ name: e.target.value });
	}

	updateDci = e => {
		this.setState({ dci: e.target.value });
	}

	updateDirectory(newDirectory) {
		window.localStorage.setItem("pwdirectory", JSON.stringify(newDirectory));
		this.setState({ directory: newDirectory });
	}

	addToDirectory = () => {
		if (this.state.directory.some(p => p.dci === this.state.dci)) {
			window.alert("DCI-numret finns redan!");
			return;
		}
		this.updateDirectory(this.state.directory.concat([new Planeswalker(this.state.name, this.state.dci)]));
	}

	removeFromDirectory = p => {
		this.updateDirectory(this.state.directory.filter(pw => pw.name !== p.name || pw.dci !== p.dci));
	}

	addToEvent = p => {
		this.props.event.participants.push(p);
		this.setState({});
	}

	render() {
		let { event } = this.props;

		if (!event) { return null; }

		let directory = this.state.directory.filter(pw => !event.participants.some(p => p.dci === pw.dci));

		return <div id="directory">
			<p>Sök deltagare eller lägg till i databasen</p>
			<div>
				<input placeholder="Namn" size="20" value={this.state.name} onChange={this.updateName} />
				<input placeholder="DCI-nummer" size="15" value={this.state.dci} onChange={this.updateDci} />
				<button onClick={this.addToDirectory}>Lägg till</button>
			</div>
			<ul>
				{directory.map(p => <PlaneswalkerTile key={p.dci} planeswalker={p} onDelete={this.removeFromDirectory} onAdd={this.addToEvent} />)}
			</ul>
		</div>;
	}
}