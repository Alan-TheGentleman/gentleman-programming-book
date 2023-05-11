import '@/src/styles/global.css';
import '@/src/styles/rehype-prism-theme.css';

import type { AppProps } from 'next/app';

import { ThemeConfig } from '@/theme/components';

export default function App({ Component, pageProps }: AppProps) {
	return (
		<>
			<ThemeConfig />
			<Component {...pageProps} />
		</>
	);
}
