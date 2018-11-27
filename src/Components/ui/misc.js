import React from 'react';
import { Link } from 'react-router-dom';

export const Tag = ( props ) => {
	const template = <div
		style={ {
			background: props.bck,
			fontSize: props.size,
			color: props.color,
			padding: '5px 10px',
			display: 'inline-block',
			fontFamily: 'Righteous',
			...props.add
		} }
	>{ props.children }</div>;

	if ( props.link ) {
		return (
			<Link to={ props.linkTo }>
				{ template }
			</Link>
		);
	} else {
		return template;
	}
}

export const firebaseLooper = snapshot => {
	let data = [];

	snapshot.forEach( ( childSnapshot ) => {
		data.push( {
			...childSnapshot.val(),
			id: childSnapshot.key
		} );
	} );
	return data;
}

export const validate = formdata => {
	let validationInfo = [ true, '' ];

	if ( formdata.validation.email ) {
		const isEmailValid = /\S+@\S+.\S+/.test( formdata.value );
		const displayMessage = !isEmailValid ? 'Please enter a valid email' : '';
		validationInfo = !isEmailValid ? [ isEmailValid, displayMessage ] : validationInfo;
	}

	if ( formdata.validation.required ) {
		const valueValid = formdata.value.trim() !== '';
		const displayMessage = !valueValid ? 'This field is required' : '';
		validationInfo = !valueValid ? [ valueValid, displayMessage ] : validationInfo;
	}

	return validationInfo;

	// let error = [ true, '' ];

	// if ( element.validation.email ) {
	// 	const valid = /\S+@\S+.\S+/.test( element.value );
	// 	const message = `${ !valid ? 'Must be a valid email' : '' }`;
	// 	error = !valid ? [ valid, message ] : error;
	// }

	// if ( element.validation.required ) {
	// 	const valid = element.value.trim() !== '';
	// 	const message = `${ !valid ? 'This field is required' : '' }`;
	// 	error = !valid ? [ valid, message ] : error;
	// }
	// return error;
};

