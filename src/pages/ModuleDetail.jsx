import React from 'react';
import Menu from '../components/Menu';
import {
  useParams
} from "react-router-dom";

export default function ModulesDetail() {
	let { id } = useParams();
	return (
		<div>
			<Menu/>
	<h2>Modules Detail ({id})</h2>
		</div>
	);
}
