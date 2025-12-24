import clsx from 'clsx';
import { ComponentProps, FC } from 'react';

import * as HrCss from './Hr.css';

type HrProps = HrCss.HrVariants & ComponentProps<'hr'>;

export const Hr: FC<HrProps> = ({
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
