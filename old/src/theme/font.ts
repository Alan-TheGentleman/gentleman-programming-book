import { Inter, Merriweather } from '@next/font/google';

const merriweather = Merriweather({
	subsets: ['latin'],
	weight: ['300', '400', '700', '900'],
	variable: '--font-merriweather',
	display: 'block',
});

const inter = Inter({
	subsets: ['latin'],
	weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
	variable: '--font-inter',
	display: 'auto',
});

export const font = {
	merriweather: merriweather.style.fontFamily,
	inter: inter.style.fontFamily,
};
