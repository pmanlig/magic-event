import "./PlaneswalkerList.css";
import React from 'react';
import { Planeswalker } from '../models';
import { PlaneswalkerTile } from '.';

export class PlaneswalkerList extends React.Component {
	constructor(props) {
		super(props);
		let directory = window.localStorage.getItem("pwdirectory");
		if (directory !== undefined) {
			directory = JSON.parse(directory);
		}
		this.state = {
			directory: directory || [],
			name: "",
			dci: "",
			directoryOffset: 0
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
		this.updateDirectory(this.state.directory.concat([new Planeswalker({ name: this.state.name, dci: this.state.dci })]));
		this.setState({ name: "", dci: "" });
	}

	removeFromDirectory = p => {
		this.updateDirectory(this.state.directory.filter(pw => pw.name !== p.name || pw.dci !== p.dci));
	}

	addToEvent = p => {
		this.props.event.addParticipant(p);
		this.props.onUpdate();
	}

	render() {
		let { event } = this.props;

		if (!event) { return null; }

		const pageSize = 12;
		let directoryOffset = this.state.directoryOffset;
		let directory = this.state.directory.filter(pw => !event.participants.some(p => p.dci === pw.dci));
		directory = directory.filter(pw => pw.name.includes(this.state.name));
		directory = directory.filter(pw => pw.dci.includes(this.state.dci));

		return <div id="directory">
			<div className="info-text">Select participants or add to directory</div>
			<div id="pwinput">
				<input placeholder="Name" size="20" value={this.state.name} onChange={this.updateName} />
				<input placeholder="DCI" size="15" value={this.state.dci} onChange={this.updateDci} />
				<button onClick={this.addToDirectory}>Add</button>
			</div>
			<div id="pw-list">
				{directory.map(p => <PlaneswalkerTile key={p.dci} planeswalker={p} onDelete={this.removeFromDirectory} onAdd={this.addToEvent} />)}
			</div>
			{directory.length > pageSize && <div id="page-control">
				{directoryOffset > 0 && <button className="button previous" onClick={() => this.setState({ directoryOffset: directoryOffset - pageSize })} />}
				{directoryOffset + pageSize < directory.length && <button className="button next" onClick={() => this.setState({ directoryOffset: directoryOffset + pageSize })} />}
			</div>}
		</div>;
	}
}