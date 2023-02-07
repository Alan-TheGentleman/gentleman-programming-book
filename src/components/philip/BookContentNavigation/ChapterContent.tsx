import Link from 'next/link';
import { useRouter } from 'next/router';
import React from 'react';
import { MdOutlineKeyboardArrowDown } from 'react-icons/md';
import { Chapter } from 'src/components/philip/BookContentNavigation/bookContent';
import { IconButton } from 'src/components/philip/IconButton';
import { Title3, Title4 } from 'src/components/philip/Title';
import { color, media } from 'src/theme';
import { LocalStorageKeys, LocalStorageService } from 'src/utils';
import styled from 'styled-components';

const TitleItemStyled = styled.li({
	[`& > ${Title4}[data-active=true]`]: { color: color.accent.main },
});

const TitleListStyled = styled.ol({
	listStyle: 'none',
	paddingInline: '0',
	marginBlock: '0',
	transition: 'all 0.4s ease-in-out',

	[`& > ${Title4}`]: { display: 'block', fontStyle: 'italic' },

	'&[data-open=false]': { maxHeight: '0', opacity: 0, visibility: 'hidden' },
	'&[data-open=true]': { maxHeight: '100vmax', opacity: 1 },
});

const SummaryStyled = styled.summary({
	listStyle: 'none',
	backgroundColor: color.background.default,

	[`& > ${IconButton}`]: {
		transition: 'all 0.4s ease-in-out',
		'&[data-open=true]': { transform: 'rotate(-180deg)' },
		'&[current=true]': { transform: 'rotate(-180deg)' },
	},
	[`& > ${Title4}`]: { color: color.accent.main },
	[`& > ${Title4},& > ${Title3}`]: {
		marginBlockEnd: '0.5rem',

		[media.up('md')]: { marginBlockEnd: '1rem' },
	},
});

const DetailsStyled = styled.details({
	overflow: 'hidden',
});

const DASdasDetailsStyled = styled.div({
	whiteSpace: 'nowrap',
	[`& > ${IconButton}`]: {
		marginInlineStart: '0.5rem',
	},
});

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
	const [isOpen, setIsOpen] = React.useState(false);

	const handleNavigate = (url: string) => {
		LocalStorageService.save(LocalStorageKeys.bookmark, url);
		onNavigate?.();
	};

	const handleOpen = () => setIsOpen(s => !s);

	const isCurrentChapter = () => {
		return chapter.titleList.some(title => title.link.endsWith(asPath));
	};

	const _open = isOpen || isCurrentChapter();

	return (
		<DetailsStyled
			key={chapter.link}
			open={true}
			onClick={e => e.preventDefault()}
		>
			<SummaryStyled>
				<Title4 as='h3'>Chapter Nº {chapter.order}</Title4>
				<DASdasDetailsStyled>
					<Link passHref legacyBehavior href={chapter.link}>
						<Title3 as='a' onClick={() => handleNavigate(chapter.link)}>
							{chapter.name}
						</Title3>
					</Link>

					<IconButton
						asIcon={<MdOutlineKeyboardArrowDown />}
						variant='text'
						data-open={_open}
						disabled={isCurrentChapter()}
						onClick={handleOpen}
					/>
				</DASdasDetailsStyled>
			</SummaryStyled>

			<TitleListStyled data-open={_open}>
				{chapter.titleList.map(title => (
					<TitleItemStyled key={title.link}>
						<Link passHref legacyBehavior href={title.link}>
							<Title4
								as='a'
								data-active={title.link.endsWith(asPath)}
								onClick={() => handleNavigate(title.link)}
							>
								{title.name}
							</Title4>
						</Link>
					</TitleItemStyled>
				))}
			</TitleListStyled>
		</DetailsStyled>
	);
};
