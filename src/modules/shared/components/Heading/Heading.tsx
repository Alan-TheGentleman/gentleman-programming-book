import clsx from 'clsx';
import Link from 'next/link';
import { ComponentProps } from 'react';

import * as HeadingCss from './Heading.css';

type Tag = 'a' | 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'div';

type HeadingProps<T extends Tag> = {
	component?: T;
} & HeadingCss.HeadingVariants &
	(T extends 'a'
		? ComponentProps<'a'> & Parameters<typeof Link>['0']
		: ComponentProps<T>);

export function Heading<T extends Tag>({
	component,
	className,
	fontSize,
	color,
	...props
}: HeadingProps<T>) {
	const Tag = component === 'a' ? Link : component || 'h1';

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
		/>
	);
}
