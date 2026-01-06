import clsx from 'clsx';
import Link from 'next/link';
import {
	ComponentProps,
	ForwardedRef,
	forwardRef,
	ReactElement,
	ReactNode,
} from 'react';

import * as ButtonCss from './Button.css';

type Tag = 'button' | 'a';

type ButtonProps<T extends Tag> = {
	children?: ReactNode;
	component?: T;
} & ButtonCss.ButtonVariants &
	(T extends 'a' ? Parameters<typeof Link>['0'] : ComponentProps<T>);

export const Button = forwardRef(function Button<T extends Tag>(
	{
		children,
		colorScheme,
		className,
		size,
		variant,
		component,
		...props
	}: ButtonProps<T>,
	ref: ForwardedRef<unknown>,
) {
	const Tag = component === 'a' ? Link : component || 'button';

	return (
		<Tag
			className={clsx(
				ButtonCss.buttonRecipe({
					colorScheme,
					variant,
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
}) as <T extends Tag>(props: ButtonProps<T>) => ReactElement<T>;
