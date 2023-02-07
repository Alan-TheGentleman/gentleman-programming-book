import mustachiIMG from 'assets/mustache.png';
import Image from 'next/image';
import NextLink from 'next/link';
import { bookContentPlaceholder } from 'src/components/philip/BookContentNavigation/bookContent';
import { ChapterContent } from 'src/components/philip/BookContentNavigation/ChapterContent';
import { Icon } from 'src/components/philip/Icon';
import { IconButton } from 'src/components/philip/IconButton';
import { DiscordIcon } from 'src/components/philip/IconSource/DiscordIcon';
import { TwitchIcon } from 'src/components/philip/IconSource/TwitchIcon';
import { LandingHeader } from 'src/components/philip/Landing/LandingHeader';
import { Link } from 'src/components/philip/Link';
import { Text } from 'src/components/philip/Text';
import { Title2 } from 'src/components/philip/Title';
import { color, deviceSize, media } from 'src/theme';
import { socialNetworks } from 'src/utils/socialNetwork';
import styled from 'styled-components';

const HeroStyled = styled.div({
	marginBlockStart: '3rem',
	textAlign: 'center',
	maxWidth: '40rem',
	marginInline: 'auto',

	[`& > ${Title2}`]: {
		marginBlock: '2rem 1rem',
	},
	[`& > ${Text}`]: {
		'& > cite': { fontStyle: 'italic' },
		'& > span': { color: color.accent.main, fontWeight: '700' },
	},
});

const MustachiStyled = styled(Image)({
	width: '100%',
	maxWidth: '12rem',
	height: '100%',
	borderRadius: '100%',
	aspectRatio: '1/1',
	objectFit: 'cover',

	background: color.background.logo,
	boxShadow: `0 0 32px 2px ${color.background.logoTransparent}`,
	backdropFilter: 'blur(4px)',
	border: `1px solid ${color.background.logoTransparent}`,
});

const MainStyled = styled.main({
	display: 'grid',
	gap: '2rem',
	maxWidth: '50rem',
	marginInline: 'auto',
	marginBlock: '4rem',
	justifyContent: 'center',
	alignItems: 'center',
	gridTemplateColumns: 'repeat(auto-fit,minmax(min(100%,20rem),1fr))',

	'& details': {
		padding: '1rem',
		alignSelf: 'start',
		boxShadow: `0px 0px 3px 1px ${color.shadow.secondary}, 1px 1px 3px 1px ${color.shadow.secondary}`,
		borderRadius: '.5rem',
	},
});

const LandingPageStyled = styled.div({
	padding: '1rem',
	marginInline: 'auto',
	maxWidth: deviceSize.xl3,
	minHeight: '100vh',
});

const FooterStyled = styled.footer({
	display: 'grid',

	maxWidth: '54.1rem',
	marginInline: 'auto',

	[media.down('md')]: {
		gap: '.5rem',
		gridTemplateRows: 'auto auto',
		'& > hr ': {
			borderBlockStart: '1px',
			borderColor: color.accent.dark,
			width: '100%',
		},
	},
	[media.up('md')]: {
		gap: '1rem',
		gridTemplateColumns: '1fr auto 1fr',
		'& > hr ': {
			margin: '0',
			borderColor: color.accent.dark,
			height: 'auto',
		},
	},
});

const HrMainFooterStyled = styled.hr({
	marginBlock: '3rem 1rem',
	borderColor: color.accent.dark,
});

const FooterItemStyled = styled.div({
	display: 'grid',
	gridTemplateColumns: 'auto 1fr',
	columnGap: '1.5rem',
	alignItems: 'center',

	[`& > ${IconButton}`]: { marginInline: 'auto' },
});

export default function Home() {
	return (
		<LandingPageStyled>
			<LandingHeader />

			<HeroStyled>
				<MustachiStyled src={mustachiIMG} alt='mustachi' />

				<Title2 as='h1'>Gentleman Programming Book</Title2>

				<Text variant='subtitle'>
					<span>“</span>A clean programmer is the best kind of programmer
					<span>”</span>- by <cite>Alan Buscaglia</cite>
				</Text>
			</HeroStyled>

			<MainStyled>
				{bookContentPlaceholder.map(chapter => (
					<ChapterContent key={chapter.link} chapter={chapter} />
				))}
			</MainStyled>

			<HrMainFooterStyled />

			<FooterStyled>
				<FooterItemStyled>
					<Icon size='xl3' colorScheme='secondary'>
						<TwitchIcon />
					</Icon>

					<Text as='span' variant='caption'>
						Follow the Gentleman Programming{' '}
						<NextLink href={socialNetworks.discord} passHref legacyBehavior>
							<Link colorScheme='secondary' target='_blank'>
								Discord
							</Link>
						</NextLink>{' '}
						community and share with us about Clean Architecture and more!
					</Text>
				</FooterItemStyled>

				<hr />

				<FooterItemStyled>
					<Icon size='xl3' colorScheme='secondary'>
						<DiscordIcon />
					</Icon>

					<Text as='span' variant='caption'>
						Follow the Gentleman Programming{' '}
						<NextLink href={socialNetworks.twitch} passHref legacyBehavior>
							<Link colorScheme='secondary' target='_blank'>
								Twicth
							</Link>
						</NextLink>{' '}
						and learn having fun!
					</Text>
				</FooterItemStyled>
			</FooterStyled>
		</LandingPageStyled>
	);
}
