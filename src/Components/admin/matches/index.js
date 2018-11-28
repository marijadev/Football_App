import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import AdminLayout from '../../../HOC/AdminLayout';

import { Table, TableCell, TableBody, TableHead, TableRow, Paper } from '@material-ui/core';
import CircularProgress from '@material-ui/core/CircularProgress';

import { firebaseMatches } from '../../../firebase';
import { firebaseLooper } from '../../ui/misc';

class AdminMatches extends Component {
	state = {
		isLoading: true,
		matches: []
	};

	componentDidMount() {
		firebaseMatches.once( 'value' ).then( snapshot => {
			const matches = firebaseLooper( snapshot );

			this.setState( { isLoading: false, matches: matches.reverse() } );
		} );
	}

	render() {
		return (
			<AdminLayout>
				<div>
					<Paper>
						<Table>
							<TableHead>
								<TableRow>
									<TableCell>Date</TableCell>
									<TableCell>Match</TableCell>
									<TableCell>Result</TableCell>
									<TableCell>Final</TableCell>
								</TableRow>
							</TableHead>
							<TableBody>
								{ this.state.matches ?
									this.state.matches.map( ( match, i ) => (
										<TableRow key={ i }>
											<TableCell>{ match.date }</TableCell>
											<TableCell>
												<Link style={{textDecoration: 'underline'}} to={ `admin_matches/edit_match/${ match.id }` }>{ match.away } - { match.local }</Link>
											</TableCell>
											<TableCell>{ match.resultAway } - { match.resultLocal }</TableCell>
											<TableCell>
												{ match.final === 'Yes' ?
													<span className="matches_tag_red">Final</span> : <span className="matches_tag_green">Not played yet</span>
												}
											</TableCell>
										</TableRow>
									) )
									: null
								}
							</TableBody>
						</Table>
					</Paper>

					<div className="admin_progress">
						{ this.state.isLoading ? <CircularProgress thickness={ 4 } style={ { color: '#98c5e9' } } /> : '' }
					</div>
				</div>
			</AdminLayout>
		);
	}
}

export default AdminMatches;
