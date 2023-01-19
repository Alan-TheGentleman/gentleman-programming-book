import { useRouter } from 'next/router';
import React from 'react';
import { Chapter } from 'src/components/philip/BookContentNavigation/bookContent';
import { Link } from 'src/components/philip/Link';
import { Title3, Title4 } from 'src/components/philip/Title';
import { color, media } from 'src/theme';
import { LocalStorage, LocalStorageKeys } from 'src/utils';
import styled from 'styled-components';

const TitleItemStyled = styled.li({
	[`& > ${Title4}[data-active=true]`]: { color: color.textAccent },
});

const TitleListStyled = styled.ol({
	listStyle: 'none',
	paddingInline: '0',
	marginBlock: '0',
	[`& > ${Title4}`]: { display: 'block', fontStyle: 'italic' },
});

const SummaryStyled = styled.summary({
	listStyle: 'none',
	[`& > ${Title4}`]: { color: color.textAccent },
	[`& > ${Title4},& > ${Title3}`]: {
		display: 'block',
		marginBlockEnd: '0.5rem',

		[media.up('md')]: { marginBlockEnd: '1rem' },
	},
});

const DetailsStyled = styled.details({});

type Fn<Args extends Array<any> = [], Return extends any = void> = (
	...ar: Args
) => Return;

type ChapterContentProps = {
	chapter: Chapter;
	onNavigate?: Fn;
};

export const ChapterContent: React.FC<ChapterContentProps> = ({
	chapter,
	onNavigate,
}) => {
	const { asPath } = useRouter();

	const handleNavigate = (url: string) => {
		LocalStorage.save(LocalStorageKeys.bookmark, url);
		onNavigate?.();
	};

	return (
		<DetailsStyled
			key={chapter.link}
			open={true}
			onClick={e => e.preventDefault()}
		>
			<SummaryStyled>
				<Title4 as='h3'>Chapter Nº {chapter.order}</Title4>
				<Title3
					as={Link}
					href={chapter.link}
					onClick={() => handleNavigate(chapter.link)}
				>
					{chapter.name}
				</Title3>
			</SummaryStyled>

			<TitleListStyled>
				{chapter.titleList.map(title => (
					<TitleItemStyled key={title.link}>
						<Title4
							as={Link}
							href={title.link}
							onClick={() => handleNavigate(title.link)}
							data-active={title.link.endsWith(asPath)}
						>
							{title.name}
						</Title4>
					</TitleItemStyled>
				))}
			</TitleListStyled>
		</DetailsStyled>
	);
};
