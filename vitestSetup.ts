import '@testing-library/jest-dom';

import { beforeAll, vi } from 'vitest';

beforeAll(() => {
	vi.mock('next/router', () => require('next-router-mock'));
});
