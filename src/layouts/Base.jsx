import React, { Fragment } from 'react';

import Menu from '../components/Menu';

const Base = props => (
	<Fragment>
		<Menu />
		<hr />
		<section>{ props.children }</section>
	</Fragment>
);

export default Base;
