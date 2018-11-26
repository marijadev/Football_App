import React from 'react';
import { Tag } from '../../ui/misc';
import Blocks from './Blocks';

const MatchesHome = () => {
	return (
		<div className="home_matches_wrapper">
			<div className="container">
				<Tag bck="#0e1731" size="50px" color="#fff" >Matches</Tag>

				<Blocks />

				<Tag link={ true } linkTo="the_team" bck="#fff" size="px" color="#0e1731">See more matches</Tag>
			</div>
		</div>
	)
}

export default MatchesHome;