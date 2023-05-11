import { GetStaticProps } from 'next';
import Image from 'next/image';
import { useRouter } from 'next/router';
import React from 'react';
import { HiSelector } from 'react-icons/hi';
import { ImQuotesLeft, ImQuotesRight } from 'react-icons/im';

import { BookChapterIndex } from '@/book/components';
import { useFontSize } from '@/book/hooks/useFontSize';
import { BookChapter } from '@/book/models';
import { BookRepository } from '@/book/repository/book.repo';
import mustachiIMG from '@/public/img/mustache.png';
import {
	Button,
	DiscordIcon,
	Heading,
	Hr,
	Icon,
	IconButton,
	InstagramIcon,
	Link,
	Option,
	Select,
	SpotifyIcon,
	Text,
	TranslateIcon,
	TwitchIcon,
	YoutubeIcon,
	ZoomInText,
	ZoomOutText,
} from '@/shared/components';
import { SEO } from '@/shared/components/SEO';
import { localStorageKeys, MyLocalStorageRepo } from '@/shared/repos';
import * as blurImage from '@/src/data/blurImage';
import { socialNetworksLinks } from '@/src/data/socialNetworkLinks';
import * as HomeCss from '@/src/styles/Home.css';
import { ThemeSelect } from '@/theme/components';

const socialList = [
	{ link: socialNetworksLinks.twitch, icon: <TwitchIcon /> },
	{ link: socialNetworksLinks.youtube, icon: <YoutubeIcon /> },
	{ link: socialNetworksLinks.discord, icon: <DiscordIcon /> },
	{ link: socialNetworksLinks.instagram, icon: <InstagramIcon /> },
	{ link: socialNetworksLinks.spotify, icon: <SpotifyIcon /> },
];

interface PageProps {
	chapterIndexList: BookChapter[];
}

export const getStaticProps: GetStaticProps<PageProps> = async ({ locale }) => {
	const chapterIndexList = BookRepository().findAllChapters(locale);
	if (!chapterIndexList) throw new Error('There is a missing property');

	return { props: { chapterIndexList } };
};

export default function Home({ chapterIndexList }: PageProps) {
	const router = useRouter();
	const fontSize = useFontSize();
	const startReadingLink = chapterIndexList[0]?.link;
	const [bookMarkLink, setBookMarkLink] = React.useState<string | null>(null);

	React.useEffect(() => {
		setBookMarkLink(
			MyLocalStorageRepo().find(localStorageKeys.bookmark) || null,
		);
	}, [bookMarkLink]);

	return (
		<>
			<SEO title='Gentleman Programming Book' locale={router.locale} />

			<div className={HomeCss.layout}>
				<header className={HomeCss.header}>
					<ul className={HomeCss.socialListContainer}>
						{socialList.map(({ link, icon }) => (
							<li key={link} className={HomeCss.containerItem}>
								<IconButton
									key={link}
									variant='ghost'
									colorScheme='secondary'
									component='a'
									icon={icon}
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
								value={router.locale}
								colorScheme='secondary'
								leftIcon={<TranslateIcon />}
								aria-labelledby='language-select'
								onChange={value =>
									router.push(router.asPath, undefined, { locale: value })
								}
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
								icon={<ZoomOutText />}
								onClick={fontSize.decreaseFontSize}
							/>
						</li>
						<li className={HomeCss.containerItem}>
							<IconButton
								colorScheme='secondary'
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
						href='/gentleman-programming-book.pdf'
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
								<Link href={socialNetworksLinks.discord} target='_blank'>
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
								<Link href={socialNetworksLinks.twitch} target='_blank'>
									Twicth
								</Link>{' '}
								and learn having fun!
							</Text>
						</div>
					</ul>
				</footer>
			</div>
		</>
	);
}
