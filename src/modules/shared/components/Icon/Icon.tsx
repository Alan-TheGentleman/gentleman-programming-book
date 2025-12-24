import clsx from 'clsx';
import { ComponentProps, FC, ReactElement } from 'react';

import * as IconCss from '@/shared/components/Icon/Icon.css';

type IconProps = {
	as: ReactElement;
} & IconCss.IconVariants &
	ComponentProps<'i'>;

export const Icon: FC<IconProps> = ({ className, as, size, ...props }) => {
	return (
		<i className={clsx(IconCss.iconRecipe({ size }), className)} {...props}>
			{as}
		</i>
	);
};
