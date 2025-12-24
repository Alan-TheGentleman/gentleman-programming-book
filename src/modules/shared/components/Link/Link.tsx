import clsx from 'clsx';
import NextLink from 'next/link';
import { FC } from 'react';

import * as LinkCss from './Link.css';

type LinkProps = LinkCss.LinkVariants & Parameters<typeof NextLink>[0];

export const Link: FC<LinkProps> = ({ className, colorScheme, ...props }) => {
	return (
		<NextLink
			className={clsx(LinkCss.linkRecipe({ colorScheme }), className)}
			{...props}
		/>
	);
};
