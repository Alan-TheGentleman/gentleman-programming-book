export const fontSize = {
	xxs: '0.75rem',
	xs: '0.875rem',
	sm: '0.95rem',
	md: '1rem',
	lg: '1.125rem',
	xl: '1.25rem',
	xl2: '1.5rem',
	xl3: '1.875rem',
	xl4: '2.25rem',
	xl5: '3rem',
	xl6: '3.75rem',
	xl7: '4.5rem',
	xl8: '6rem',
	xl9: '8rem',
} as const;

export type FontSize = keyof typeof fontSize;
