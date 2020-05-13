import React from 'react';

import Base from '../layouts/Base';

const Home = () => {
	const breadcrumbs = [
    {
      text: 'Home',
    },
  ];
	return (
		<Base breadcrumbs={breadcrumbs}>
			<h2>Home</h2>
		</Base>
	);
};

export default Home;
