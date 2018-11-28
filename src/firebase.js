import firebase from 'firebase/app';
import 'firebase/app';
import 'firebase/database';
import 'firebase/auth';

const config = {
	apiKey: "AIzaSyBdzhLWOPbqAk8h3GEhg_gbgtCfO6TYj-A",
	authDomain: "football-react-app.firebaseapp.com",
	databaseURL: "https://football-react-app.firebaseio.com",
	projectId: "football-react-app",
	storageBucket: "football-react-app.appspot.com",
	messagingSenderId: "553463690549"
};

firebase.initializeApp( config );

const firebaseDB = firebase.database();
const firebaseMatches = firebaseDB.ref( 'matches' );
const firebasePromotions = firebaseDB.ref( 'promotions' );
const firebaseTeams = firebaseDB.ref('teams');
const firebasePlayers = firebaseDB.ref('players');

export {
	firebase,
	firebaseMatches,
	firebasePromotions,
	firebaseTeams,
	firebaseDB,
	firebasePlayers
};