import React from 'react';
import { FaLongArrowAltLeft, FaLongArrowAltRight } from 'react-icons/fa';
import { GoBook } from 'react-icons/go';
import { MdClose } from 'react-icons/md';
import { BookContentNavigation } from 'src/components/philip/BookContentNavigation';
import { bookContentPlaceholder } from 'src/components/philip/BookContentNavigation/bookContent';
import { ChapterContent } from 'src/components/philip/BookContentNavigation/ChapterContent';
import { Button } from 'src/components/philip/Button';
import { Icon } from 'src/components/philip/Icon';
import { IconButton } from 'src/components/philip/IconButton';
import {
	MenuIcon,
	ThemeIcon,
	TranslateIcon,
	ZoomInText,
	ZoomOutText,
} from 'src/components/philip/IconSource';

import {
	AsideStyled,
	BookLayoutStyled,
	ContentDialogWrapper,
	ContentWrapperStyled,
	DialogStyled,
	PaginationStyled,
	ReaderConfigButtonsStyled,
} from './BookLayout.styles';

type BookLayoutProps = {
	children: React.ReactNode;
};

export const BookLayout: React.FC<BookLayoutProps> = ({ children }) => {
	const ref = React.useRef<HTMLDialogElement | null>(null);

	return (
		<BookLayoutStyled>
			<ContentWrapperStyled>{children}</ContentWrapperStyled>

			<PaginationStyled>
				<Button>
					<Icon>
						<FaLongArrowAltLeft />
					</Icon>{' '}
					<span>Previous</span>
				</Button>

				<IconButton
					asIcon={<GoBook />}
					onClick={() => ref.current?.showModal()}
				/>

				<Button>
					<span>Next</span>{' '}
					<Icon>
						<FaLongArrowAltRight />
					</Icon>
				</Button>
			</PaginationStyled>

			<ReaderConfigButtonsStyled>
				<IconButton
					variant='text'
					colorScheme='secondary'
					asIcon={<TranslateIcon />}
				/>
				<IconButton
					variant='text'
					colorScheme='secondary'
					asIcon={<ZoomOutText />}
				/>
				<IconButton
					variant='text'
					colorScheme='secondary'
					asIcon={<ZoomInText />}
				/>
				<IconButton variant='text' asIcon={<ThemeIcon />} />
			</ReaderConfigButtonsStyled>

			<AsideStyled>
				<Button onClick={() => ref.current?.showModal()}>
					<Icon>
						<MenuIcon />
					</Icon>{' '}
					Menu
				</Button>
				<ChapterContent chapter={bookContentPlaceholder[0]} />
			</AsideStyled>

			<DialogStyled ref={ref}>
				<ContentDialogWrapper>
					<IconButton
						asIcon={<MdClose />}
						variant='text'
						onClick={() => ref.current?.close()}
					/>
					<BookContentNavigation onNavigate={() => ref.current?.close()} />
				</ContentDialogWrapper>
			</DialogStyled>
		</BookLayoutStyled>
	);
};
