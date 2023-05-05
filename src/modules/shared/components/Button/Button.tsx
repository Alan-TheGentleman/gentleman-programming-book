import React from 'react';

import * as ButtonCss from './Button.css';

type ButtonProps = {
	children?: React.ReactNode;
} & ButtonCss.ButtonVariants;

export const Button: React.FC<ButtonProps> = ({
	children,
	colorScheme,
	disabled,
	variant,
	...props
}) => {
	return (
		<button
			className={ButtonCss.buttonRecipe({
				colorScheme,
				variant,
				disabled,
			})}
			{...props}
		>
			{children}
		</button>
	);
};
