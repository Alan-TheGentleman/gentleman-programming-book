import clsx from 'clsx';
import Link from 'next/link';
import React from 'react';

import * as IconButtonCss from './IconButton.css';

type AllowedAs = 'button' | 'a';

type IconButtonProps<T extends AllowedAs> = {
	icon: React.ReactElement;
	component?: T;
} & (T extends 'a' ? Parameters<typeof Link>['0'] : React.ComponentProps<T>) &
	IconButtonCss.IconButtonVariants;

export function IconButton<T extends AllowedAs>({
	colorScheme,
	variant,
	size,
	icon,
	component,
	ref,
	className,
	...props
}: IconButtonProps<T>) {
	const Tag = component === 'a' ? Link : component || 'button';

	return (
		<>
			<Tag
				className={clsx([
					IconButtonCss.IconButtonRecipe({
						colorScheme,
						size,
						variant,
						asLink: component === 'a',
					}),
					className,
				])}
				{...(props as any)}
			>
				{icon}
			</Tag>
		</>
	);
}
