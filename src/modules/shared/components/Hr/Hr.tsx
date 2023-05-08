import clsx from 'clsx';
import React from 'react';

import * as HrCss from './Hr.css';

type HrProps = HrCss.HrVariants & React.ComponentProps<'hr'>;

export const Hr: React.FC<HrProps> = ({
	colorScheme,
	className,
	...props
}: HrProps) => {
	return (
		<hr
			className={clsx(HrCss.recipeHr({ colorScheme }), className)}
			{...props}
		/>
	);
};
