import {
	DiscordIcon,
	InstagramIcon,
	SpotifyIcon,
	TwitchIcon,
	YoutubeIcon,
} from '@/shared/components';

import { socialNetworkUrl } from './socialNetworkUrl';

export const socialNetworkList = [
	{ title: 'twitch', link: socialNetworkUrl.twitch, Icon: TwitchIcon },
	{
		title: 'youtube',
		link: socialNetworkUrl.youtube,
		Icon: YoutubeIcon,
	},
	{
		title: 'discord',
		link: socialNetworkUrl.discord,
		Icon: DiscordIcon,
	},
	{
		title: 'instagram',
		link: socialNetworkUrl.instagram,
		Icon: InstagramIcon,
	},
	{
		title: 'spotify',
		link: socialNetworkUrl.spotify,
		Icon: SpotifyIcon,
	},
];
