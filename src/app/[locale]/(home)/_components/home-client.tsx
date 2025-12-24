'use client';

import Image from 'next/image';
import { usePathname, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { HiSelector } from 'react-icons/hi';
import { ImQuotesLeft, ImQuotesRight } from 'react-icons/im';

import { BookChapterIndex } from '@/book/components';
import { useFontSize } from '@/book/hooks';
import { BookChapter } from '@/book/models';
import mustachiIMG from '@/public/img/mustache.png';
import {
	Button,
	DiscordIcon,
	Heading,
	Hr,
	Icon,
	IconButton,
	Link,
	Option,
	Select,
	Text,
	TranslateIcon,
	TwitchIcon,
	ZoomInText,
	ZoomOutText,
} from '@/shared/components';
import {
	localStorageKeys,
	LocalStorageService,
	MyLocalStorageService,
} from '@/shared/services';
import * as blurImage from '@/src/data/blurImage';
import { socialNetworkList } from '@/src/data/socialNetworkList';
import { socialNetworkUrl } from '@/src/data/socialNetworkUrl';
import * as HomeCss from '@/src/styles/Home.css';
import { ThemeSelect } from '@/theme/components';

interface HomeClientProps {
	chapterIndexList: BookChapter[];
	locale: string;
	localStorageService?: LocalStorageService;
}

export function HomeClient({
	chapterIndexList,
	locale,
	localStorageService = MyLocalStorageService(),
}: HomeClientProps) {
	const router = useRouter();
	const pathname = usePathname();
	const fontSize = useFontSize();
	const startReadingLink = chapterIndexList[0]?.link;
	const [bookMarkLink, setBookMarkLink] = useState<string | null>(null);
	const [pdfLink, setPdfLink] = useState<string>(
		'/gentleman-programming-book.pdf',
	);

	useEffect(() => {
		setBookMarkLink(
			localStorageService.find(localStorageKeys.bookmark) || null,
		);
	}, [localStorageService]);

	useEffect(() => {
		if (locale === 'es') {
			setPdfLink(
				'https://github.com/AppleLAN/gentleman-programming-book/raw/main/public/es/gentleman-programming-book-es.pdf?download=',
			);
		} else {
			setPdfLink(
				'https://github.com/AppleLAN/gentleman-programming-book/raw/main/public/gentleman-programming-book.pdf?download=',
			);
		}
	}, [locale]);

	const handleLocaleChange = (newLocale: string) => {
		const newPath = pathname.replace(`/${locale}`, `/${newLocale}`);
		router.push(newPath);
	};

	return (
		<div className={HomeCss.layout}>
			<header className={HomeCss.header}>
				<ul className={HomeCss.socialListContainer}>
					{socialNetworkList.map(({ title, link, Icon }) => (
						<li key={link} className={HomeCss.containerItem}>
							<IconButton
								key={link}
								variant='ghost'
								colorScheme='secondary'
								component='a'
								title={title}
								icon={<Icon />}
								href={link}
								target='_blank'
								rel='noreferrer'
							/>
						</li>
					))}
				</ul>

				<ul className={HomeCss.settingsControlContainer}>
					<li className={HomeCss.containerItem}>
						<Select
							value={locale}
							colorScheme='secondary'
							leftIcon={<TranslateIcon />}
							title='language-select'
							onChange={handleLocaleChange}
							rightIcon={<HiSelector width='1em' height='1em' />}
						>
							<Option value='es'>Es</Option>
							<Option value='en'>En</Option>
						</Select>
					</li>
					<li className={HomeCss.containerItem}>
						<IconButton
							colorScheme='secondary'
							variant='ghost'
							title='zoom-out'
							icon={<ZoomOutText />}
							onClick={fontSize.decreaseFontSize}
						/>
					</li>
					<li className={HomeCss.containerItem}>
						<IconButton
							colorScheme='secondary'
							title='zoom-in'
							variant='ghost'
							icon={<ZoomInText />}
							onClick={fontSize.increaseFontSize}
						/>
					</li>

					<li className={HomeCss.containerItem}>
						<ThemeSelect />
					</li>
				</ul>
			</header>

			<div className={HomeCss.hero}>
				<div className={HomeCss.mustachiWrapper}>
					<Image
						className={HomeCss.mustache}
						src={mustachiIMG}
						placeholder='blur'
						width={200}
						height={200}
						blurDataURL={blurImage.mustachi}
						alt='The happy Mustachi'
					/>
				</div>

				<Heading className={HomeCss.heroTitle} fontSize='xl5'>
					Gentleman Programming Book
				</Heading>

				<Text
					component='blockquote'
					role='blockquote'
					fontSize='xl2'
					className={HomeCss.heroQuote}
				>
					<sup>
						<ImQuotesLeft className={HomeCss.heroQuoteIcon} />
					</sup>{' '}
					A clean programmer is the best kind of programmer{' '}
					<sup>
						<ImQuotesRight className={HomeCss.heroQuoteIcon} />
					</sup>{' '}
					<Text
						className={HomeCss.heroQuoteCite}
						component='cite'
						fontSize='xl2'
						color='primary'
					>
						- by Alan Buscaglia
					</Text>
				</Text>

				<Button
					component='a'
					size='xl'
					href={bookMarkLink || startReadingLink}
					className={HomeCss.heroButton}
				>
					{bookMarkLink ? 'Continue reading' : 'Start reading'}
				</Button>

				<Button
					component='a'
					href={pdfLink}
					download='Gentleman Programming Book'
					target='_blank'
					size='xl'
					variant='outline'
					className={HomeCss.heroButton}
				>
					Download
				</Button>
			</div>

			<main className={HomeCss.main}>
				<BookChapterIndex
					className={HomeCss.mainBookIndex}
					items={chapterIndexList}
					type='multiple'
				/>
			</main>

			<Hr />

			<footer className={HomeCss.footer}>
				<ul className={HomeCss.footerList}>
					<div className={HomeCss.footerItem}>
						<Icon as={<TwitchIcon />} size='xl3' />

						<Text component='span'>
							Follow the Gentleman Programming{' '}
							<Link
								href={socialNetworkUrl.discord}
								title='discord'
								target='_blank'
							>
								Discord
							</Link>{' '}
							community and share with us about Clean Architecture and more!
						</Text>
					</div>

					<Hr className={HomeCss.footerHr} />

					<div className={HomeCss.footerItem}>
						<Icon as={<DiscordIcon />} size='xl3' />

						<Text component='span'>
							Follow the Gentleman Programming{' '}
							<Link
								href={socialNetworkUrl.twitch}
								title='twitch'
								target='_blank'
							>
								Twitch
							</Link>{' '}
							and learn having fun!
						</Text>
					</div>
				</ul>
			</footer>
		</div>
	);
}
