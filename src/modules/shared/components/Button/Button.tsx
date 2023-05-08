import clsx from 'clsx';
import Link from 'next/link';
import React from 'react';

import * as ButtonCss from './Button.css';

type Tag = 'button' | 'a';

type ButtonProps<T extends Tag> = {
	children?: React.ReactNode;
	as?: T;
} & ButtonCss.ButtonVariants &
	(T extends 'a' ? Parameters<typeof Link>['0'] : React.ComponentProps<T>);

export const Button = React.forwardRef(function Button<T extends Tag>(
	{
		children,
		colorScheme,
		className,
		size,
		disabled,
		variant,
		as: component,
		...props
	}: ButtonProps<T>,
	ref: React.ForwardedRef<unknown>,
) {
	const Tag = component === 'a' ? Link : component || 'button';
	return (
		<Tag
			className={clsx(
				ButtonCss.buttonRecipe({
					colorScheme,
					variant,
					disabled,
					size,
				}),
				className,
			)}
			{...(props as any)}
			ref={ref}
		>
			{children}
		</Tag>
	);
}) as <T extends Tag>(props: ButtonProps<T>) => React.ReactElement<T>;
