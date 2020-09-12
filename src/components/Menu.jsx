import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import {
  NavItem,
} from 'reactstrap';

const Menu = () => (
	<Fragment>
		<NavItem>
			<Link className="nav-link" to='/'>Home</Link>
		</NavItem>
		<NavItem>
			<Link className="nav-link" to='/modules'>Modules</Link>
		</NavItem>
		<NavItem>
			<Link className="nav-link" to='/numbers'>Numbers</Link>
		</NavItem>
		<NavItem>
			<Link className="nav-link" to='/words'>Words</Link>
		</NavItem>
	</Fragment>
);

export default Menu;
