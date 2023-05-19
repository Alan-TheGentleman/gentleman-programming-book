import * as SelectPrimitives from '@radix-ui/react-select';
import clsx from 'clsx';
import React from 'react';
import { FiCheck as CheckIcon } from 'react-icons/fi';

import * as OptionCss from './Option.css';

type Props = {
	children: React.ReactNode;
	value: string;
	className?: string;
};

export const Option = React.forwardRef(function Option(
	{
		children,
		value,
		className,
		colorScheme,
	}: Props & OptionCss.CheckItemVariants,
	ref: React.Ref<HTMLDivElement> | undefined,
) {
	return (
		<SelectPrimitives.SelectItem
			value={value}
			onClick={e => e.stopPropagation()}
			className={clsx(OptionCss.checkItemRecipe({ colorScheme }), className)}
			ref={ref}
		>
			<SelectPrimitives.ItemText>{children}</SelectPrimitives.ItemText>

			<SelectPrimitives.ItemIndicator className={OptionCss.checkIcon}>
				<CheckIcon />
			</SelectPrimitives.ItemIndicator>
		</SelectPrimitives.SelectItem>
	);
});
