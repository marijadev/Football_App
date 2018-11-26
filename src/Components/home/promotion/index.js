import React from 'react';
import PromotionAnimation from './Animation';

const Promotion = () => {
	return (
		<div className="promotion_wrapper" style={ { background: '#fff' } }>
			<div className="container">
				<PromotionAnimation />
			</div>
		</div>
	);
}

export default Promotion;
