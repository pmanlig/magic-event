import React from 'react';

export function ResultButton({ result, match, onSelect }) {
	return <button className={"result-button" + (match.result === result ? " selected" : "")} onClick={() => onSelect(result)}>{result}</button>;
}