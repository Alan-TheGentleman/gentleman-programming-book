import { FC } from 'react';

import { Svg } from '@/shared/components/Svg';

type Props = {
	className?: string;
};
export const TranslateIcon: FC = (props: Props) => {
	return (
		<Svg
			width='1em'
			height='1em'
			viewBox='0 0 32 32'
			fill='none'
			xmlns='http://www.w3.org/2000/svg'
			{...props}
		>
			<path
				d='M16 28H13C9.1 28 6 24.9 6 21V17H8V21C8 23.8 10.2 26 13 26H16V28ZM28 30H30.2L25.6 19H23.4L18.8 30H21L21.8 28H27.1L28 30ZM22.7 26L24.5 21.6L26.3 26H22.7ZM28 15H26V11C26 8.2 23.8 6 21 6H17V4H21C24.9 4 28 7.1 28 11V15ZM14 5V3H9V1H7V3H2V5H10.2C10 5.9 9.4 7.5 8 9C7.4 8.3 6.9 7.6 6.6 7H4.3C4.7 8 5.4 9.2 6.4 10.3C5.6 11 4.4 11.6 3 12.1L3.7 14C5.5 13.3 6.9 12.5 8 11.7C9.1 12.6 10.5 13.4 12.3 14L13 12.1C11.6 11.6 10.4 10.9 9.5 10.3C11.4 8.3 12 6.2 12.2 5H14Z'
				fill='currentColor'
			/>
		</Svg>
	);
};
