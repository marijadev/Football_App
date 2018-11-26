import React from 'react';
import Layout from './HOC/Layout';
import { Switch, Route } from 'react-router-dom';
import Home from './Components/home';

const Routes = ( props ) => {
	return (
		<div>
			<Layout>
				<Switch>
					<Route exact path="/" component={ Home } />
				</Switch>
			</Layout>
		</div>
	);
}

export default Routes;