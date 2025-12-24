import * as AccordionPrimitive from '@radix-ui/react-accordion';
import { FC, ReactElement, ReactNode } from 'react';

import * as AccordionCss from './Accordion.css';

type AccordionItemProps = {
	className?: string;
	trigger: ReactNode;
	panel?: ReactElement;
	value: string;
} & Parameters<typeof AccordionPrimitive.Item>['0'];

export const AccordionItem: FC<AccordionItemProps> = ({
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
