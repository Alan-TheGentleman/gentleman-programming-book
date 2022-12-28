import { render, screen } from '@testing-library/react';
import Home from 'pages';

describe('Example test', () => {
	test('should contain the element', () => {
		render(<Home />);
		expect(screen.getByText('pages/index.tsx')).toBeInTheDocument();
	});
});
