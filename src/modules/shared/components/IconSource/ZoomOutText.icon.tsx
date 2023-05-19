import React from 'react';

import { Svg } from '@/shared/components/Svg';

export const ZoomOutText: React.FC = () => {
	return (
		<Svg
			width='1em'
			height='1em'
			viewBox='0 0 16 9'
			fill='none'
			xmlns='http://www.w3.org/2000/svg'
		>
			<path
				d='M4.276 0.0359995H6.112L8.884 8.16L9.58 8.28V9H6.04V8.28L6.94 8.16L6.472 6.6H3.364L2.896 8.172L3.868 8.28V9H0.808L0.796 8.28L1.516 8.16L4.276 0.0359995ZM5.104 2.064L4.888 1.128L4.66 2.076L3.592 5.76H6.232L5.104 2.064ZM15.3898 5.724H10.5058V4.596H15.3898V5.724Z'
				fill='currentColor'
			/>
		</Svg>
	);
};
