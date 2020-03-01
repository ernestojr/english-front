import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';

const Menu = () => (
	<Fragment>
		<ul>
			<li>
				<Link to='/'>Home</Link>
			</li>
			<li>
				<Link to='/modules'>Modules</Link>
			</li>
		</ul>
	</Fragment>
);

export default Menu;
