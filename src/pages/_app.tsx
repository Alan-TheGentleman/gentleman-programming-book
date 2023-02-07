import 'normalize.css';

import type { AppProps } from 'next/app';
import { ThemeContextProvider } from 'src/context/ThemeContext';

export default function App({ Component, pageProps }: AppProps) {
	return (
		<>
			<ThemeContextProvider>
				<Component {...pageProps} />
			</ThemeContextProvider>
		</>
	);
}
