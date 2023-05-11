import clsx from 'clsx';
import React from 'react';
import { FaChevronDown } from 'react-icons/fa';

import { BookChapter } from '@/book/models/bookContent';
import {
	Accordion,
	AccordionItem,
	Button,
	Heading,
	Icon,
	MustachiIcon,
} from '@/shared/components';
import { AccordionProps } from '@/shared/components/Accordion/Accordion';
import { localStorageKeys, MyLocalStorageRepo } from '@/shared/repos';

import * as BookChapterCss from './BookChapterIndex.css';

type BookChapterIndexProps = AccordionProps & {
	items: BookChapter | BookChapter[];
};

export const BookChapterIndex: React.FC<BookChapterIndexProps> = ({
	items,
	className,
	...props
}) => {
	const _content = Array.isArray(items) ? items : [items];

	return (
		<Accordion className={clsx(BookChapterCss.accordion, className)} {...props}>
			{_content.map(chapter => (
				<AccordionItem
					key={chapter.link}
					className={clsx(BookChapterCss.accordionItem)}
					value={chapter.link}
					trigger={
						<Button
							variant='unstyled'
							className={BookChapterCss.accordionButton}
						>
							<Heading
								component='h2'
								fontSize='xs'
								className={BookChapterCss.accordionButtonText}
							>
								<Heading
									component='div'
									fontSize='lg'
									color='primary'
									className={BookChapterCss.accordionButtonTextSub}
								>
									Chapter {chapter.order}
									<Icon
										as={<FaChevronDown />}
										size='xs'
										className={BookChapterCss.accordionButtonIcon}
									/>
								</Heading>

								<Heading
									component='a'
									onClick={e => e.stopPropagation()}
									title={chapter.name}
									href={chapter.link}
									className={BookChapterCss.accordionButtonTitle}
									fontSize='xl3'
								>
									{chapter.name}
								</Heading>
							</Heading>
						</Button>
					}
					panel={
						<div className={BookChapterCss.accordionItemPanel}>
							{chapter.titleList.map(title => (
								<div
									key={title.link}
									className={BookChapterCss.accordionPanelItem}
								>
									<Icon
										className={BookChapterCss.accordionPanelItemIcon}
										as={<MustachiIcon />}
										size='xl2'
									/>
									<Heading
										component='a'
										fontSize='xl'
										title={title.value}
										onClick={() =>
											MyLocalStorageRepo().save(
												localStorageKeys.bookmark,
												title.link,
											)
										}
										href={title.link}
										className={BookChapterCss.accordionPanelItemText}
									>
										{title.value}
									</Heading>
								</div>
							))}
						</div>
					}
				/>
			))}
		</Accordion>
	);
};
