import React from 'react';

export class PlaneswalkerTile extends React.Component {
	render() {
		let { planeswalker, onDelete, onAdd } = this.props;
		return <li key={planeswalker.name} className="selectable planeswalker tile">
			<button className="event-button">&lt;</button>
			<p>{planeswalker.name}</p>
			<button className="directory-button" onClick={() => onDelete(planeswalker)}>X</button>
			<button className="directory-button" onClick={() => onAdd(planeswalker)}>></button>
		</li>;
	}
}