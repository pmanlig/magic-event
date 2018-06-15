import React from 'react';

export class PlaneswalkerTile extends React.Component {
	render() {
		let { planeswalker, onDelete, onAdd, onRemove } = this.props;
		return <div key={planeswalker.name} className="selectable planeswalker tile">
			<button className="button event-button previous" onClick={() => onRemove(planeswalker)} />
			<p>{planeswalker.name + (planeswalker.score ? " - " + planeswalker.score() : "")}</p>
			<button className="button directory-button close" onClick={() => onDelete(planeswalker)} />
			<button className="button directory-button next" onClick={() => onAdd(planeswalker)} />
		</div>;
	}
}