import Link from 'next/link';
import React from 'react';
import { FaCopy, FaTwitter } from 'react-icons/fa';
import { IconButton } from 'src/components';
import { color } from 'src/theme';
import { buildTweetUrl } from 'src/utils/buildTweetUrl';
import styled from 'styled-components';

type PopupProps = {
	selectedText: string;
	popperAttrs: Record<string, string>;
	styles?: React.CSSProperties;
};

const SharePopupMenuStyled = styled.div({
	background: 'black',
	rowGap: '16px',
	height: '32px',
	zIndex: 1,
	display: 'flex',
	alignItems: 'center',
	padding: '0.5rem',
	borderRadius: '0.3rem',
	border: `2px solid ${color.accent.main}`,
	gap: '0.75rem',

	[`& ${IconButton}`]: {
		cursor: 'pointer',
	},
});

export const SharePopupMenu = React.forwardRef<
	HTMLDivElement | null,
	PopupProps
>(function SharePopup(props, ref) {
	const {
		selectedText,
		popperAttrs: popperTooltipAttributes,
		styles: popperTooltipStyles,
	} = props;

	if (!selectedText) return null;

	return (
		<SharePopupMenuStyled
			style={{ ...popperTooltipStyles }}
			ref={ref}
			{...popperTooltipAttributes}
		>
			<Link legacyBehavior passHref href={buildTweetUrl(selectedText)}>
				<IconButton
					as='a'
					colorScheme='secondary'
					asIcon={<FaTwitter />}
					target='_blank'
					rel='noreferrer'
				/>
			</Link>
			<IconButton
				asIcon={<FaCopy />}
				colorScheme='secondary'
				onClick={() => navigator.clipboard.writeText(selectedText)}
			/>
		</SharePopupMenuStyled>
	);
});
