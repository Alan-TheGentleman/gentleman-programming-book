import 'normalize.css';

import type { AppProps } from 'next/app';
import { color, font } from 'src/theme';
import { createGlobalStyle } from 'styled-components';

const Global = createGlobalStyle({
	'::-webkit-scrollbar': {
		background: color.textAccent,
		width: '.3rem',
	},
	'::-webkit-scrollbar-thumb': {
		background: color.textAccent,
		borderRadius: '100vh',
	},
	'::-webkit-scrollbar-track': { background: color.text },
	'html, body, #__next': {
		height: '100%',
	},
	body: {
		fontFamily: font.merriweather,
		lineHeight: '1.5',
		background: color.background1,
	},
	'*,html': { scrollBehavior: `smooth !important` as 'smooth' },
});

export default function App({ Component, pageProps }: AppProps) {
	return (
		<>
			<Global />
			<Component {...pageProps} />
		</>
	);
}
