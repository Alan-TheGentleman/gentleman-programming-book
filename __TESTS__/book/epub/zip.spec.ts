import { execFileSync } from 'child_process';
import { mkdtempSync, writeFileSync } from 'fs';
import { tmpdir } from 'os';
import path from 'path';
import { describe, expect, it } from 'vitest';

import { createZip } from '@/book/epub/zip';

function writeArchive(buffer: Buffer) {
	const directory = mkdtempSync(path.join(tmpdir(), 'zip-spec-'));
	const file = path.join(directory, 'archive.zip');
	writeFileSync(file, buffer);

	return file;
}

describe('createZip', () => {
	it('produces an archive the system unzip accepts', () => {
		const archive = writeArchive(
			createZip([
				{ path: 'a.txt', data: Buffer.from('hello') },
				{ path: 'nested/b.txt', data: Buffer.from('x'.repeat(50000)) },
			]),
		);

		const output = execFileSync('unzip', ['-t', archive]).toString();

		expect(output).toContain('No errors detected');
	});

	it('stores the epub mimetype uncompressed as the specification requires', () => {
		const archive = writeArchive(
			createZip([
				{
					path: 'mimetype',
					data: Buffer.from('application/epub+zip'),
					store: true,
				},
				{ path: 'other.txt', data: Buffer.from('y'.repeat(5000)) },
			]),
		);

		const listing = execFileSync('unzip', ['-lv', archive]).toString();
		const mimetypeRow = listing
			.split('\n')
			.find(line => line.includes('mimetype'));

		expect(mimetypeRow).toContain('Stored');
		expect(listing).toMatch(/Defl:N\s+\d+.*other\.txt/);
	});

	it('round trips content byte for byte', () => {
		const payload = Buffer.from('acentós ✓ 日本語', 'utf-8');
		const archive = writeArchive(
			createZip([{ path: 'unicode.txt', data: payload }]),
		);

		const extracted = execFileSync('unzip', ['-p', archive, 'unicode.txt']);

		expect(extracted.equals(payload)).toBe(true);
	});
});
