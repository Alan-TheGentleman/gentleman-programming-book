import { MDXRemote as MDX } from 'next-mdx-remote';

import { Heading, Icon, MustachiIcon, Text } from '@/shared/components';

import * as MDXRemoteCss from './MDXRemote.css';

type Props = Parameters<typeof MDX>[0];

export const MDXRemote = (props: Props) => {
	return (
		<MDX
			{...props}
			components={{
				p: ({ children, ...props }) => (
					<Text component='p' {...(props as any)}>
						{children}
					</Text>
				),
				h1: ({ children, ...props }) => (
					<Heading
						component='h1'
						fontSize='xl4'
						color='primary'
						{...(props as any)}
					>
						{children}
					</Heading>
				),
				h2: ({ children, ...props }) => (
					<Heading
						component='h2'
						color='primary'
						className={MDXRemoteCss.mdxH2}
						{...(props as any)}
					>
						<div className={MDXRemoteCss.mdxH2Text}>
							<Icon
								className={MDXRemoteCss.mdxH2Icon}
								size='xl'
								as={<MustachiIcon />}
							/>{' '}
							<div>{children}</div>
						</div>
					</Heading>
				),
				li: ({ children, ...props }) => (
					<Text
						component='li'
						className={MDXRemoteCss.mdxLi}
						{...(props as any)}
					>
						{children}
					</Text>
				),
				img: ({ children, ...props }) => (
					// eslint-disable-next-line jsx-a11y/alt-text, @next/next/no-img-element
					<img {...(props as any)} className={MDXRemoteCss.mdxImage} />
				),
				strong: ({ children, ...props }) => (
					<Text
						component='strong'
						className={MDXRemoteCss.mdxStrong}
						{...(props as any)}
					>
						{children}
					</Text>
				),
			}}
		/>
	);
};
