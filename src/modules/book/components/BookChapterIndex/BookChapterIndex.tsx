import clsx from 'clsx';
import React from 'react';
import { FaChevronDown } from 'react-icons/fa';

import * as BookChapterCss from '@/book/components/BookChapterIndex/BookChapterIndex.css';
import { BookChapterIndex } from '@/book/models/bookContent';
import {
	Accordion,
	AccordionItem,
	Button,
	Heading,
	Icon,
	MustachiIcon,
} from '@/shared/components';

type BookChapterIndexProps = {
	content: BookChapterIndex | BookChapterIndex[];
	className?: string;
	type: 'multiple' | 'single';
};

export const BookChapterIndex: React.FC<BookChapterIndexProps> = ({
	content,
	className,
	type,
}) => {
	const _content = Array.isArray(content) ? content : [content];

	return (
		<Accordion
			className={clsx(BookChapterCss.accordion, className)}
			type={type}
		>
			{_content.map((chapter, idx) => (
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
								as='h2'
								fontSize='xs'
								className={BookChapterCss.accordionButtonText}
							>
								<Heading
									as='div'
									fontSize='lg'
									color='primary'
									className={BookChapterCss.accordionButtonTextSub}
								>
									Chapter {idx + 1}
									<Icon
										as={<FaChevronDown />}
										size='xs'
										className={BookChapterCss.accordionButtonIcon}
									/>
								</Heading>

								<Heading
									as='a'
									onClick={e => e.stopPropagation()}
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
									<Icon as={<MustachiIcon />} size='xl2' />
									<Heading
										as='a'
										fontSize='xl'
										href={title.link}
										className={BookChapterCss.accordionPanelItemText}
									>
										{title.name}
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
