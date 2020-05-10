import React, { Fragment, useState } from 'react';
import { useLocation } from 'react-router-dom';
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
	Nav,
	NavbarText,
	Breadcrumb, BreadcrumbItem,
} from 'reactstrap';

import Menu from '../components/Menu';

const Base = props => {
	const [isOpen, setIsOpen] = useState(false);
	const toggle = () => setIsOpen(!isOpen);
	console.log('search', useLocation());
	return (
		<Fragment>
			<Navbar color="dark" dark expand="md">
        <NavbarBrand href="/">English Practice</NavbarBrand>
        <NavbarToggler onClick={toggle} />
        <Collapse isOpen={isOpen} navbar>
          <Nav className="mr-auto" navbar>
						<Menu />
          </Nav>
					<NavbarText><a href="https://github.com/ernestojr">GitHub</a></NavbarText>
        </Collapse>
      </Navbar>
			<section>{ props.children }</section>
		</Fragment>
	);
}

export default Base;
