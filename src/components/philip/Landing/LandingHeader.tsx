import Link from 'next/link';
import React from 'react';
import { Button } from 'src/components/philip/Button';
import { IconButton } from 'src/components/philip/IconButton';
import {
	TranslateIcon,
	ZoomInText,
	ZoomOutText,
} from 'src/components/philip/IconSource';
import { DiscordIcon } from 'src/components/philip/IconSource/DiscordIcon';
import { InstagramIcon } from 'src/components/philip/IconSource/InstagramIcon';
import { SpotifyIcon } from 'src/components/philip/IconSource/SpotifyIcon';
import { TwitchIcon } from 'src/components/philip/IconSource/TwitchIcon';
import { YoutubeIcon } from 'src/components/philip/IconSource/YoutubeIcon';
import { ThemePicker } from 'src/components/philip/ThemePicker';
import { ThemeSelectButton } from 'src/components/ThemeSelectButton';
import { media } from 'src/theme';
import { socialNetworks } from 'src/utils/socialNetwork';
import styled from 'styled-components';

const SocialNetworksStyled = styled.div({
	[media.down('md')]: {
		display: 'flex',
		justifyContent: 'space-evenly',
	},
});

const SettingActions = styled.div({
	[media.down('md')]: {
		[`& > ${IconButton}, & > ${Button}`]: {
			aspectRatio: '1 / 1',
			borderRadius: '100%',
		},
		display: 'grid',
		gridTemplateColumns: 'repeat(auto-fit,2.2rem)',
		gap: '10%',
		justifyContent: 'center',
		alignItems: 'center',
	},
	[media.up('md')]: {
		display: 'flex',
		[`& > ${IconButton}`]: { width: '2.2rem', aspectRatio: '1 / 1' },
		alignItems: 'center',
		gap: '1rem',
	},
});

const HeaderStyled = styled.header({
	display: 'grid',
	gap: '1rem',

	[media.up('md')]: {
		display: 'flex',
		justifyContent: 'space-between',
	},
});

const socialList = [
	{ link: socialNetworks.twitch, icon: <TwitchIcon /> },
	{ link: socialNetworks.youtube, icon: <YoutubeIcon /> },
	{ link: socialNetworks.discord, icon: <DiscordIcon /> },
	{ link: socialNetworks.instagram, icon: <InstagramIcon /> },
	{ link: socialNetworks.spotify, icon: <SpotifyIcon /> },
];

export const LandingHeader: React.FC = () => {
	return (
		<HeaderStyled>
			<SocialNetworksStyled>
				{socialList.map((v, i) => (
					<Link key={v.link + i} passHref href={v.link} legacyBehavior>
						<IconButton
							as='a'
							target='_blank'
							colorScheme='secondary'
							variant='text'
							asIcon={v.icon}
						/>
					</Link>
				))}
			</SocialNetworksStyled>

			<SettingActions>
				<IconButton
					colorScheme='primary'
					variant='text'
					asIcon={<TranslateIcon />}
				/>
				<IconButton
					colorScheme='primary'
					variant='text'
					asIcon={<ZoomOutText />}
				/>
				<IconButton
					colorScheme='primary'
					variant='text'
					asIcon={<ZoomInText />}
				/>

				<ThemePicker trigger={<ThemeSelectButton />} />
			</SettingActions>
		</HeaderStyled>
	);
};
