import { render, screen } from '@testing-library/react';

import { Button } from '@/shared/components';

describe('example test', () => {
	it('should be true', () => {
		render(<Button>example</Button>);

		expect(screen.getByText('example')).toBeInTheDocument();
	});
});
