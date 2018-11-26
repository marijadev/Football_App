import React, { Component } from 'react';
import { firebaseMatches } from '../../../firebase';
import { firebaseLooper } from '../../ui/misc';

import MatchesBlock from '../../ui/matches_block';
import Slide from 'react-reveal/Slide';

class Blocks extends Component {
	state = {
		matches: []
	}

	componentDidMount() {
		firebaseMatches.limitToLast( 6 ).once( 'value' ).then( snapshot => {
			const matches = firebaseLooper( snapshot ).reverse();
			this.setState( { matches } );
		} );
	}

	showMatches = matches => (
		matches ?
			matches.map( ( match, i ) => (
				<Slide bottom key={ match.id }>
					<div className="item" >
						<div className="wrapper">
							<MatchesBlock match={ match } />
						</div>
					</div>
				</Slide>
			) ) : null
	)

	render() {
		return (
			<div className="home_matches">
				{ this.showMatches( this.state.matches ) }
			</div>
		);
	}
}

export default Blocks;