import React from 'react';
import Layout from './HOC/Layout';
import { Switch, Route } from 'react-router-dom';

import PrivateRoute from './Components/authRoutes/privateRoutes';

import Home from './Components/home';
import SignIn from './Components/signin';

import Dashboard from './Components/admin/Dashboard';


const Routes = ( props ) => {
	return (
		<div>
			<Layout>
				<Switch>
					<PrivateRoute { ...props } path="/dashboard" exact component={ Dashboard } />
					{/* <Route exact path="/dashboard" exact component={ Dashboard } /> */}
					<Route exact path="/sign_in" component={ SignIn } />
					<Route exact path="/" component={ Home } />
				</Switch>
			</Layout>
		</div>
	);
}

export default Routes;