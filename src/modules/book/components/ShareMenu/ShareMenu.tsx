import React from 'react';
import { FaCopy, FaTwitter } from 'react-icons/fa';

import { useSelectedValue } from '@/book/hooks';
import { buildTweetUrl } from '@/book/utils/buildTweetUrl';
import { IconButton } from '@/shared/components';

import * as ShareMenuCss from './ShareMenu.css';

export const ShareMenu: React.FC = () => {
	const selection = useSelectedValue();

	return (
		<div className={ShareMenuCss.sharedMenu({ open: !!selection })}>
			<IconButton
				autoFocus={!!selection}
				size='sm'
				component='a'
				target='_blank'
				rel='noreferrer'
				href={selection ? buildTweetUrl(selection) : ''}
				icon={<FaTwitter />}
			/>

			<IconButton
				size='sm'
				disabled={!selection}
				onClick={() => navigator.clipboard.writeText(selection || '')}
				icon={<FaCopy />}
			/>
		</div>
	);
};
