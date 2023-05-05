import * as SelectPrimitives from '@radix-ui/react-select';
import React from 'react';
import { color } from 'src/theme';
import styled from 'styled-components';

const SelectContent = styled(SelectPrimitives.SelectContent)({
	overflow: 'hidden',
	borderRadius: '0.25rem',
	backgroundColor: color.background.default,
	border: `1px solid ${color.accent.dark}`,
	width: '100%',
});
const SelectViewport = styled(SelectPrimitives.Viewport)({
	padding: 5,
});

type Props = {
	trigger: React.ReactElement;
	children: React.ReactNode;
	className?: string;
	side?: 'left' | 'right' | 'bottom' | 'top';
	onChange?: (value: string) => void;
};

export const Select: React.FC<Props> = ({
	trigger,
	children,
	className,
	onChange,
	side = 'bottom',
}) => {
	const [container, setContainer] = React.useState<HTMLDivElement | null>(null);
	return (
		<>
			<SelectPrimitives.Root onValueChange={onChange}>
				<SelectPrimitives.Trigger asChild>{trigger}</SelectPrimitives.Trigger>
				<SelectPrimitives.Portal container={container}>
					<SelectContent position='popper' side={side} sideOffset={5}>
						<SelectViewport className={className}>{children}</SelectViewport>
					</SelectContent>
				</SelectPrimitives.Portal>{' '}
				<div style={{ display: 'contents' }} ref={setContainer} />
			</SelectPrimitives.Root>
		</>
	);
};
