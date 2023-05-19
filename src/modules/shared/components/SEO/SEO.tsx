import Head from 'next/head';
import React from 'react';

import { envVariables } from '@/shared/utils';

type SEOProps = {
	title: string;
	siteTitle?: string;
	description?: string;
	imageUrl?: string;
	locale?: string;
};

export const SEO: React.FC<SEOProps> = ({
	title,
	siteTitle,
	description,
	imageUrl,
	locale = 'en_US',
}) => {
	const imgUrl =
		envVariables.WEB_URL + imageUrl || envVariables.WEB_URL + '/seo.webp';
	const _title = siteTitle ? `${title} | ${siteTitle}` : title;
	const _description =
		description ||
		'The Gentleman Programming Book is about software development, and clean code practices from the point of view of a frontend developer. It is written in a way that is easy to understand, and is suitable for anyone who wants to learn about programming.';

	return (
		<Head>
			{/* Common SEO tags */}
			<title>{_title}</title>
			<meta name='description' content={_description} />
			<meta name='viewport' content='width=device-width, initial-scale=1' />
			<link rel='icon' href='/favicon.ico' />

			{/* MICROSOFT APPLICATIONS */}
			<meta name='application-name' content={_title} />
			<meta name='msapplication-TileImage' itemProp='image' content={imgUrl} />

			{/* FACEBOOK */}
			<meta property='og:url' content={envVariables.WEB_URL} />
			<meta property='og:locale' content={locale} />
			<meta property='og:type' content='website' />
			<meta property='og:site_name' content={_title} />
			<meta property='og:title' content={_title} />
			<meta property='og:description' content={_description} />
			<meta property='og:image' itemProp='image' content={imgUrl} />
			<meta property='og:image:secure_url' itemProp='image' content={imgUrl} />
			<meta property='og:image:alt' content={_description} />
			<meta property='og:image:width' content='1200' />
			<meta property='og:image:height' content='630' />

			{/* TWITTER */}
			<meta name='twitter:title' content={title} />
			<meta name='twitter:description' content={_description} />
			<meta name='twitter:image' itemProp='image' content={imgUrl} />
			<meta name='twitter:card' content='summary_large_image' />
			<meta property='twitter:domain' content={envVariables.WEB_URL} />
			<meta property='twitter:url' content={envVariables.WEB_URL} />

			{/* WHATSAPP */}
			<meta property='og:url' content={envVariables.WEB_URL} />
			<meta property='og:type' content='website' />
			<meta property='og:image' itemProp='image' content={imgUrl} />
			<meta property='og:image:secure_url' itemProp='image' content={imgUrl} />
			<meta property='og:image:type' content='image/webp' />
			<meta property='og:image:width' content='1200' />
			<meta property='og:image:height' content='630' />

			{/* Pinterest */}
			<meta name='pinterest:title' content={_title} />
			<meta name='pinterest:description' content={_description} />
			<meta name='pinterest:image' content={imageUrl} />
		</Head>
	);
};
