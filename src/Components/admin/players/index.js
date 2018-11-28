import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import AdminLayout from '../../../HOC/AdminLayout';
import { firebasePlayers } from '../../../firebase';
import { firebaseLooper } from '../../ui/misc';

import { Table, TableCell, TableBody, TableHead, TableRow, Paper } from '@material-ui/core';
import CircularProgress from '@material-ui/core/CircularProgress';

export class AdminPlayers extends Component {

	state = {
		isLoading: true,
		players: []
	}

	componentDidMount() {
		firebasePlayers.once( 'value' ).then( snapshot => {
			const players = firebaseLooper( snapshot );

			this.setState( {
				isLoading: false,
				players: players.reverse()
			} );
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
									<TableCell>First Name</TableCell>
									<TableCell>Last Name</TableCell>
									<TableCell>Number</TableCell>
									<TableCell>Position</TableCell>
								</TableRow>
							</TableHead>
							<TableBody>
								{ this.state.players ?
									this.state.players.map( ( player, i ) => (
										<TableRow key={ i }>
											<TableCell>
												<Link style={ { textDecoration: "underline" } } to={ `/admin_players/add_players/${ player.id }` }>{ player.name }</Link>
											</TableCell>
											<TableCell>
												<Link style={ { textDecoration: "underline" } } to={ `/admin_players/add_players/${ player.id }` }>{ player.lastname }</Link>
											</TableCell>
											<TableCell>
												{ player.number }
											</TableCell>
											<TableCell>
												{ player.position }
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
		)
	}
}

export default AdminPlayers;
