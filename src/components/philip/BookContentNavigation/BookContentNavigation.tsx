import React from 'react';
import styled from 'styled-components';

import { BookContent, bookContentPlaceholder } from './bookContent';
import { ChapterContent } from './ChapterContent';

export const BookContentNavigationStyled = styled.nav({
	[`& > details + details`]: {
		marginBlockStart: '2rem',
	},
	[`& > details:first-of-type`]: {
		marginBlockStart: '1.5rem',
	},
	[`& > details:last-of-type`]: {
		marginBlockEnd: '1.5rem',
	},
});

type BookContentNavigationProps = {
	bookContent?: BookContent;
	onNavigate?: () => void;
};

export const BookContentNavigation: React.FC<BookContentNavigationProps> = ({
	bookContent = bookContentPlaceholder,
	onNavigate,
}) => {
	return (
		<BookContentNavigationStyled>
			{bookContent.map(chapter => (
				<ChapterContent
					key={chapter.link}
					chapter={chapter}
					onNavigate={onNavigate}
				/>
			))}
		</BookContentNavigationStyled>
	);
};
