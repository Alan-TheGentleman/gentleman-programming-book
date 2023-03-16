/* eslint-disable @next/next/no-img-element */
// eslint-disable-next-line simple-import-sort/imports
import { GetStaticPaths, GetStaticProps } from 'next';
import { MDXRemote, MDXRemoteSerializeResult } from 'next-mdx-remote';
import { serialize } from 'next-mdx-remote/serialize';
import rehypePrism from 'rehype-prism-plus';
import rehypeSlug from 'rehype-slug';
import {
	BookLayout,
	MustachiIcon,
	SelectedMenu,
	ZoomImageConfig,
} from 'src/components';
import {
	BookContent,
	Chapter,
} from 'src/components/BookContentNavigation/bookContent';
import MDXComponenets from 'src/components/MDXComponents';
import { Text } from 'src/components/Text';
import { Title3, Title4 } from 'src/components/Title';

import { color } from 'src/theme';
import { Pagination } from 'src/utils/Pagination';
import {
	findPaths,
	generateBookContent,
	getPagination,
	readChapter,
} from 'src/utils/read';
import styled from 'styled-components';

export const getStaticPaths: GetStaticPaths = p => {
	const paths = findPaths();

	return {
		paths,
		fallback: 'blocking',
	};
};

interface PageProps {
	source: MDXRemoteSerializeResult<
		Record<string, unknown>,
		Record<string, string>
	>;
	bookContent: BookContent;
	currentChapter: Chapter;
	pagination: Pagination;
}

const MDXRemoteWrapperStyled = styled('div')({
	display: 'contents',
	[`& > ${Title4} + Title4`]: {
		background: 'red',
	},
	[`& > ${Text} img`]: {
		maxWidth: '100%',
	},
	'& h1, & h2': {
		color: color.secondary.main,
		[`& svg`]: {
			maxWidth: '2rem',
			maxHeight: '2rem',
			verticalAlign: 'middle',
		},
	},
});

export const getStaticProps: GetStaticProps<
	PageProps,
	{ chapterId: string }
> = async ({ params, locale }) => {
	const { content } = await readChapter(params?.chapterId, locale);
	const pagination = await getPagination(params?.chapterId, locale);

	const { bookContent, currentChapter } = await generateBookContent(
		locale,
		params?.chapterId,
	);

	if (!bookContent || !currentChapter)
		throw new Error('There is a missing property');

	const mdxSource = await serialize(content, {
		mdxOptions: {
			rehypePlugins: [rehypeSlug, rehypePrism],
			format: 'mdx',
		},
	});

	return {
		props: { source: mdxSource, bookContent, currentChapter, pagination },
	};
};

export default function ChapterDetail({
	source,
	bookContent,
	currentChapter,
	pagination,
}: PageProps) {
	return (
		<BookLayout
			bookContent={bookContent}
			currentChapter={currentChapter}
			pagination={pagination}
		>
			<SelectedMenu wrapperId='selectable-container'>
				<MDXRemoteWrapperStyled>
					<MDXRemote
						{...source}
						components={{
							...MDXComponenets,

							h1: ({ children, ref, ...props }) => (
								<Title3 as='h1' {...props}>
									{children}
								</Title3>
							),
							h2: ({ children, ref, ...props }) => (
								<Title4 as='h2' {...props}>
									<MustachiIcon /> {children}
								</Title4>
							),
							pre: ({ children, ref, ...props }) => (
								<div style={{ display: 'grid', overflowX: 'auto' }}>
									<pre {...props}>{children}</pre>
								</div>
							),
							p: ({ children, ref, ...props }) => (
								<Text as='p' {...props}>
									{children}
								</Text>
							),
							li: ({ children, ref, ...props }) => (
								<Text as='li' {...props}>
									{children}
								</Text>
							),
						}}
					/>
				</MDXRemoteWrapperStyled>
			</SelectedMenu>
			<ZoomImageConfig />
		</BookLayout>
	);
}
