import React, { Component } from 'react';
import AdminLayout from '../../../HOC/AdminLayout';
import FormField from '../../ui/formField';
import { validate, firebaseLooper } from '../../ui/misc';

import { firebaseTeams, firebaseDB, firebaseMatches } from '../../../firebase';

class addEditMatch extends Component {
	state = {
		matchId: '',
		formType: '',
		formError: false,
		formSuccess: '',
		teams: [],
		formdata: {
			date: {
				element: 'input',
				value: '',
				config: {
					label: 'Event date',
					name: 'date_input',
					type: 'date',
					placeholder: 'Enter your date...'
				},
				validation: {
					required: true,
				},
				valid: false,
				validationMessage: '',
				showLabel: true
			},
			local: {
				element: 'select',
				value: '',
				config: {
					label: 'Select a local team',
					name: 'select_local',
					type: 'select',
					options: []
				},
				validation: {
					required: true,
				},
				valid: false,
				validationMessage: '',
				showLabel: false
			},
			resultLocal: {
				element: 'input',
				value: '',
				config: {
					label: 'Result local',
					name: 'result_local_input',
					type: 'text',
					options: []
				},
				validation: {
					required: true,
				},
				valid: false,
				validationMessage: '',
				showLabel: false
			},
			away: {
				element: 'select',
				value: '',
				config: {
					label: 'Select an away team',
					name: 'select_away',
					type: 'select',
					options: []
				},
				validation: {
					required: true,
				},
				valid: false,
				validationMessage: '',
				showLabel: false
			},
			resultAway: {
				element: 'input',
				value: '',
				config: {
					label: 'Result away',
					name: 'result_local_input',
					type: 'text',
					options: []
				},
				validation: {
					required: true,
				},
				valid: false,
				validationMessage: '',
				showLabel: false
			},
			referee: {
				element: 'input',
				value: '',
				config: {
					label: 'Refeere',
					name: 'referee_input',
					type: 'text',
				},
				validation: {
					required: true,
				},
				valid: false,
				validationMessage: '',
				showLabel: true
			},
			stadium: {
				element: 'input',
				value: '',
				config: {
					label: 'Stadium',
					name: 'stadium_input',
					type: 'text',
				},
				validation: {
					required: true,
				},
				valid: false,
				validationMessage: '',
				showLabel: true
			},
			result: {
				element: 'select',
				value: '',
				config: {
					label: 'Team result',
					name: 'select_result',
					type: 'select',
					options: [
						{ key: 'W', value: 'W' },
						{ key: 'L', value: 'L' },
						{ key: 'D', value: 'D' },
						{ key: 'n/a', value: 'n/a' }
					]
				},
				validation: {
					required: true,
				},
				valid: false,
				validationMessage: '',
				showLabel: true
			},
			final: {
				element: 'select',
				value: '',
				config: {
					label: 'Game played?',
					name: 'select_played',
					type: 'select',
					options: [
						{ key: 'Yes', value: 'Yes' },
						{ key: 'No', value: 'No' },
					]
				},
				validation: {
					required: true,
				},
				valid: false,
				validationMessage: '',
				showLabel: true
			}
		}
	}

	updateForm = ( element ) => {
		const newFormdata = { ...this.state.formdata };
		const newElement = { ...newFormdata[ element.id ] };

		newElement.value = element.event.target.value;

		let validData = validate( newElement );
		newElement.valid = validData[ 0 ];
		newElement.validationMessage = validData[ 1 ];

		newFormdata[ element.id ] = newElement;

		this.setState( {
			formError: false,
			formdata: newFormdata
		} );
	}

	updateFields( match, teamOptions, teams, type, matchId ) {
		const newFormData = { ...this.state.formdata };

		for ( let key in newFormData ) {
			if ( match ) {
				newFormData[ key ].value = match[ key ];
				newFormData[ key ].valid = true;
			}
			if ( key === 'local' || key === 'away' ) {
				newFormData[ key ].config.options = teamOptions;
			}
		}

		this.setState({
			matchId,
			formType: type,
			formdata: newFormData,
			teams
		});
	}

	componentDidMount() {
		const matchId = this.props.match.params.id;
		const getTeams = ( match, type ) => {
			firebaseTeams.once( 'value' ).then( snapshot => {
				const teams = firebaseLooper( snapshot );
				const teamOptions = [];

				snapshot.forEach( childSnapshot => {
					teamOptions.push( {
						key: childSnapshot.val().shortName,
						value: childSnapshot.val().shortName
					} );
				} )

				this.updateFields( match, teamOptions, teams, type, matchId )
			} )
		}

		if ( !matchId ) {
			//add match
		} else {
			firebaseDB.ref( `matches/${ matchId }` ).once( 'value' )
				.then( snapshot => {
					const match = snapshot.val();

					getTeams( match, 'Edit Match' )
				} )
		}
	}

	render() {
		return (
			<AdminLayout>
				<div className="editmatch_dialog_wrapper">
					<h2>
						{ this.state.formType }
					</h2>
					<div>
						<form onSubmit={ ( event ) => this.submitForm( event ) }>
							<FormField id={ 'date' } formdata={ this.state.formdata.date } change={ element => this.updateForm( element ) } />

							<div className="select_team_layout">
								<div className="label_inputs">Local</div>
								<div className="wrapper">
									<div className="left">
										<FormField id={ 'local' } formdata={ this.state.formdata.local } change={ element => this.updateForm( element ) } />
									</div>
									<div>
										<FormField id={ 'resultLocal' } formdata={ this.state.formdata.resultLocal } change={ element => this.updateForm( element ) } />
									</div>
								</div>
							</div>

							<div className="select_team_layout">
								<div className="label_inputs">Away</div>
								<div className="wrapper">
									<div className="left">
										<FormField id={ 'away' } formdata={ this.state.formdata.local } change={ element => this.updateForm( element ) } />
									</div>
									<div>
										<FormField id={ 'resultAway' } formdata={ this.state.formdata.resultAway } change={ element => this.updateForm( element ) } />
									</div>
								</div>
							</div>

							<div className="split_fields">
								<FormField id={ 'referee' } formdata={ this.state.formdata.referee } change={ element => this.updateForm( element ) } />
								<FormField id={ 'stadium' } formdata={ this.state.formdata.stadium } change={ element => this.updateForm( element ) } />
							</div>

							<div className="split_fields">
								<FormField id={ 'result' } formdata={ this.state.formdata.result } change={ element => this.updateForm( element ) } />
								<FormField id={ 'final' } formdata={ this.state.formdata.final } change={ element => this.updateForm( element ) } />
							</div>

							<div className="success_label">{ this.state.formSuccess }</div>
							{ this.state.formError ? <div className="error_label">Something went wrong</div> : '' }

							<div className="admin_submit">
								<button onClick={ ( event ) => this.submitForm( event ) }>{ this.state.formType }</button>
							</div>
						</form>
					</div>
				</div>
			</AdminLayout>
		)
	}
}

export default addEditMatch;

