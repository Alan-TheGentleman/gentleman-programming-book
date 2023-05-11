import clsx from 'clsx';
import React from 'react';

import * as IconCss from '@/shared/components/Icon/Icon.css';

type IconProps = {
	as: React.ReactElement;
} & IconCss.IconVariants &
	React.ComponentProps<'i'>;

export const Icon: React.FC<IconProps> = ({
	className,
	as,
	size,
	...props
}) => {
	return (
		<i className={clsx(IconCss.iconRecipe({ size }), className)} {...props}>
			{as}
		</i>
	);
};
