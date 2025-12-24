import '@testing-library/jest-dom/vitest';

import { vi } from 'vitest';

// Mock next/navigation for App Router
vi.mock('next/navigation', () => ({
	useRouter: () => ({
		push: vi.fn(),
		replace: vi.fn(),
		back: vi.fn(),
		forward: vi.fn(),
		refresh: vi.fn(),
		prefetch: vi.fn(),
	}),
	usePathname: () => '/en',
	useSearchParams: () => new URLSearchParams(),
	useParams: () => ({ locale: 'en' }),
	redirect: vi.fn(),
	notFound: vi.fn(),
}));

// Mock next/image
vi.mock('next/image', () => ({
	default: ({ src, alt, ...props }: { src: string; alt: string }) => {
		// eslint-disable-next-line @next/next/no-img-element
		return <img src={typeof src === 'object' ? '' : src} alt={alt} {...props} />;
	},
}));
