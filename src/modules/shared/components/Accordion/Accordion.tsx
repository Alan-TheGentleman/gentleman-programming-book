import * as AccordionPrimitive from '@radix-ui/react-accordion';
import React from 'react';

export type AccordionProps = Parameters<typeof AccordionPrimitive.Root>[0];

export const Accordion: React.FC<AccordionProps> = ({ children, ...props }) => {
	return (
		<AccordionPrimitive.Root {...props}>{children}</AccordionPrimitive.Root>
	);
};
