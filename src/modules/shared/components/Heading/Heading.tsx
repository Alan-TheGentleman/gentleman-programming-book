import clsx from 'clsx';
import Link from 'next/link';
import React from 'react';

import * as HeadingCss from './Heading.css';

type Tag = 'a' | 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'div';

type HeadingProps<T extends Tag> = {
	as?: T;
} & HeadingCss.HeadingVariants;

export const Heading = React.forwardRef(function Heading<T extends Tag>(
	{
		as,
		className,
		fontSize,
		color,
		...props
	}: HeadingProps<T> &
		(T extends 'a'
			? React.ComponentProps<'a'> & Parameters<typeof Link>['0']
			: React.ComponentProps<T>),
	ref: React.ForwardedRef<T>,
) {
	const Tag = as === 'a' ? Link : as || 'h1';
	return (
		<Tag
			className={clsx(
				HeadingCss.headindgRecipe({
					color,
					fontSize,
				}),
				className,
			)}
			{...(props as any)}
			ref={ref}
		/>
	);
}) as <T extends Tag>(
	props: HeadingProps<T> &
		(T extends 'a'
			? React.ComponentProps<'a'> & Parameters<typeof Link>['0']
			: React.ComponentProps<T>),
	ref: React.ForwardedRef<T>,
) => React.ReactElement<T>;
