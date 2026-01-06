import { MDXRemote } from 'next-mdx-remote/rsc';
import rehypePrism from 'rehype-prism-plus';
import rehypeSlug from 'rehype-slug';
import remarkGfm from 'remark-gfm';

import {
	Heading,
	Icon,
	Mermaid,
	MustachiIcon,
	Text,
} from '@/shared/components';

import * as MDXRemoteCss from '@/book/styles/mdx.css';

interface ChapterMDXContentProps {
	source: string;
}

export async function ChapterMDXContent({ source }: ChapterMDXContentProps) {
	return (
		<MDXRemote
			source={source}
			options={{
				mdxOptions: {
					remarkPlugins: [remarkGfm],
					rehypePlugins: [rehypeSlug, rehypePrism],
					format: 'mdx',
				},
			}}
			components={{
				p: ({ children, ...rest }) => (
					<Text component='p' {...(rest as Record<string, unknown>)}>
						{children}
					</Text>
				),
				h1: ({ children, ...rest }) => (
					<Heading
						component='h1'
						fontSize='xl4'
						color='primary'
						{...(rest as Record<string, unknown>)}
					>
						{children}
					</Heading>
				),
				h2: ({ children, ...rest }) => (
					<Heading
						component='h2'
						color='primary'
						className={MDXRemoteCss.mdxH2}
						{...(rest as Record<string, unknown>)}
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
				li: ({ children, ...rest }) => (
					<Text
						component='li'
						className={MDXRemoteCss.mdxLi}
						{...(rest as Record<string, unknown>)}
					>
						{children}
					</Text>
				),
				img: ({ ...rest }) => (
					// eslint-disable-next-line jsx-a11y/alt-text, @next/next/no-img-element
					<img
						{...(rest as Record<string, unknown>)}
						className={MDXRemoteCss.mdxImage}
					/>
				),
				strong: ({ children, ...rest }) => (
					<Text
						component='strong'
						className={MDXRemoteCss.mdxStrong}
						{...(rest as Record<string, unknown>)}
					>
						{children}
					</Text>
				),
				Mermaid,
			}}
		/>
	);
}
