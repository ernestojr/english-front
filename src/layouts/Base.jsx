import React, { Fragment, useState } from 'react';
import { Link } from 'react-router-dom';
import map from 'lodash/map';
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
	const { breadcrumbs = [] } = props;
	return (
		<Fragment>
			<Navbar color="dark" dark expand="md">
        <NavbarBrand href="/">English Practice</NavbarBrand>
        <NavbarToggler onClick={toggle} />
        <Collapse isOpen={isOpen} navbar>
          <Nav className="mr-auto" navbar>
						<Menu />
          </Nav>
					<NavbarText>
						<a
							href="https://github.com/ernestojr"
							target="_blank"
							rel="noopener noreferrer">GitHub</a>
					</NavbarText>
        </Collapse>
      </Navbar>
			{
				breadcrumbs.length &&
				<Breadcrumb>
					{
						map(breadcrumbs, ({ to, text }, index) => { 
							const key = Date.now() + index;
							if (to) {
								return (
									<BreadcrumbItem key={key}>
										<Link to={to}>{text}</Link>
									</BreadcrumbItem>
								);
							}
							return (
								<BreadcrumbItem key={key} active>
									{text}
								</BreadcrumbItem>
							);
						})
					}
				</Breadcrumb>
			}
			<section>{ props.children }</section>
		</Fragment>
	);
}

export default Base;
