import React from 'react';

export class PlaneswalkerTile extends React.Component {
	render() {
		let { planeswalker, participants, onDelete, onAdd, onRemove } = this.props;
		return <div key={planeswalker.name} className="selectable planeswalker tile">
			<button className="button event-button previous" onClick={() => onRemove(planeswalker)} />
			<div className="planeswalker-name">
				<p className="planeswalker-name">{planeswalker.name + (planeswalker.matchScore ? " - " + planeswalker.matchScore() : "")}</p>
				{!(planeswalker.matchScore) && <p className="dci">DCI: {planeswalker.dci}</p>}
				{planeswalker.opponentsMatchScore &&
					<p className="dci">T1: {planeswalker.opponentsMatchScore(participants).toFixed(3)} T2: {planeswalker.gamePercentage().toFixed(3)} T3: {planeswalker.opponentsGameScore(participants).toFixed(3)}</p>}
			</div>
			<button className="button directory-button close" onClick={() => onDelete(planeswalker)} />
			<button className="button directory-button next" onClick={() => onAdd(planeswalker)} />
		</div>;
	}
}