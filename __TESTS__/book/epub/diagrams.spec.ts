import { describe, expect, it } from 'vitest';

import { isDiagram } from '@/book/epub/diagrams';

describe('isDiagram', () => {
	it('recognizes a framed box drawing diagram', () => {
		const diagram = [
			'┌─────────────┐',
			'│  Call Stack │',
			'└─────────────┘',
		].join('\n');

		expect(isDiagram(diagram)).toBe(true);
	});

	it('does not treat prose containing an arrow as a diagram', () => {
		const spec = [
			'## Business Rules',
			'- Status transitions: TODO → IN_PROGRESS → DONE (and back)',
			'- Default project is "General"',
		].join('\n');

		expect(isDiagram(spec)).toBe(false);
	});

	it('ignores a single stray box drawing character', () => {
		const mostlyText = ['const separator = "─";', 'doSomething();'].join('\n');

		expect(isDiagram(mostlyText)).toBe(false);
	});

	it('leaves plain source code alone', () => {
		const code = [
			'function add(a: number, b: number) {',
			'  return a + b;',
			'}',
		].join('\n');

		expect(isDiagram(code)).toBe(false);
	});
});
