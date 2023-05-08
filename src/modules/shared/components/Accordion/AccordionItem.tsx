import * as AccordionPrimitive from '@radix-ui/react-accordion';
import React from 'react';

import * as AccordionCss from './Accordion.css';

type AccordionItemProps = {
	className?: string;
	trigger: React.ReactNode;
	panel?: React.ReactElement;
	value: string;
} & Parameters<typeof AccordionPrimitive.Item>['0'];

export const AccordionItem: React.FC<AccordionItemProps> = ({
	className = '',
	trigger,
	panel,
	value,
	...props
}) => {
	return (
		<AccordionPrimitive.Item
			{...props}
			data-testid='accordion-item'
			value={value}
			className={className}
		>
			<AccordionPrimitive.Header asChild>
				<AccordionPrimitive.Trigger asChild>
					{trigger}
				</AccordionPrimitive.Trigger>
			</AccordionPrimitive.Header>

			<AccordionPrimitive.Content
				className={AccordionCss.accordionContent}
				style={{
					overflow: 'hidden',
				}}
			>
				{panel}
			</AccordionPrimitive.Content>
		</AccordionPrimitive.Item>
	);
};
