import * as SelectPrimitives from '@radix-ui/react-select';
import React from 'react';
import styled from 'styled-components';

const SelectItem = styled(SelectPrimitives.SelectItem)({
	cursor: 'pointer',
});

type Props = {
	children: React.ReactNode;
	value: string;
	className?: string;
};

export const Option: React.FC<Props> = ({ children, value, className }) => {
	return (
		<SelectItem value={value} onClick={e => e.stopPropagation()}>
			<div className={className}>{children}</div>
		</SelectItem>
	);
};
