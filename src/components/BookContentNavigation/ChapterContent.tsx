import Link from 'next/link';
import { useRouter } from 'next/router';
import React from 'react';
import { MdOutlineKeyboardArrowDown } from 'react-icons/md';
import { Chapter } from 'src/components/BookContentNavigation/bookContent';
import { IconButton } from 'src/components/IconButton';
import { MustachiIcon } from 'src/components/IconSource';
import { Title3, Title4, Title5, Title6 } from 'src/components/Title';
import { color, media } from 'src/theme';
import { LocalStorageKeys, LocalStorageService } from 'src/utils';
import styled from 'styled-components';

const TitleItemStyled = styled.li({
	fontStyle: 'italic',

	[`& svg`]: {
		maxWidth: '1.5rem',
		maxHeight: '1.5rem',
		verticalAlign: 'middle',
	},
	[`& > ${Title5}`]: { textDecoration: 'none' },
	[`& > ${Title5}[data-active=true]`]: {
		color: color.accent.main,
	},
});

const TitleListStyled = styled.ol({
	border: '0',
	paddingInline: '0',
	paddingInlineStart: '1rem',
	borderInlineStart: '1px',
	borderColor: color.accent.main,
	borderStyle: 'solid',
	listStyle: 'none',
	marginBlock: '1rem 0',
	transition: 'all 0.4s ease-in-out',

	[`& > ${Title5}`]: { display: 'block', fontStyle: 'italic' },
	[`& > ${TitleItemStyled} + ${TitleItemStyled}`]: {
		marginBlockStart: '1.2rem',
	},

	'&[data-open=false]': { maxHeight: '0', opacity: 0, visibility: 'hidden' },
	'&[data-open=true]': { maxHeight: '100vmax', opacity: 1 },
});

const SummaryStyled = styled.summary({
	listStyle: 'none',
	backgroundColor: color.background.default,

	[`& > ${Title6}`]: { color: color.accent.main },
	[`& > ${Title6},& > ${Title4}`]: {
		marginBlockEnd: '0.5rem',

		[media.up('md')]: { marginBlockEnd: '1rem' },
	},
});

const DetailsStyled = styled.details({
	overflow: 'hidden',
});

const ChapterNumberWrapperStyled = styled.div({
	display: 'flex',
	columnGap: '0.5rem',
	[`button[data-open=true]`]: { transform: 'rotate(-180deg)' },
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
		return (
			chapter?.titleList.some(title => title.link.endsWith(asPath)) ||
			asPath.includes(chapter?.chapterId)
		);
	};

	const _open = isOpen || isCurrentChapter();

	return (
		<DetailsStyled
			key={chapter?.link}
			open={true}
			onClick={e => e.preventDefault()}
		>
			<SummaryStyled>
				<ChapterNumberWrapperStyled>
					<Title6 as='h3' colorScheme='secondary'>
						Chapter Nº {chapter?.order}
					</Title6>
					<IconButton
						asIcon={<MdOutlineKeyboardArrowDown />}
						size='xs'
						variant='text'
						data-open={_open}
						disabled={isCurrentChapter()}
						onClick={handleOpen}
					/>
				</ChapterNumberWrapperStyled>

				<Link passHref legacyBehavior href={chapter?.link || ''}>
					<Title3 as='a' onClick={() => handleNavigate(chapter?.link)}>
						{chapter?.name}
					</Title3>
				</Link>
			</SummaryStyled>

			<TitleListStyled data-open={_open}>
				{chapter?.titleList.map(title => (
					<TitleItemStyled key={title.link}>
						<Link passHref legacyBehavior href={title.link}>
							<Title5
								as='a'
								data-active={decodeURIComponent(title.link).endsWith(
									decodeURIComponent(asPath),
								)}
								onClick={() => handleNavigate(title.link)}
							>
								<MustachiIcon /> {title.name}
							</Title5>
						</Link>
					</TitleItemStyled>
				))}
			</TitleListStyled>
		</DetailsStyled>
	);
};
