import { crc32 } from 'zlib';
import { deflateRawSync } from 'zlib';

const SIGNATURE_LOCAL = 0x04034b50;
const SIGNATURE_CENTRAL = 0x02014b50;
const SIGNATURE_END = 0x06054b50;
const VERSION_NEEDED = 20;
const METHOD_STORE = 0;
const METHOD_DEFLATE = 8;

export interface ZipEntry {
	path: string;
	data: Buffer;
	store?: boolean;
}

interface StagedEntry {
	nameBytes: Buffer;
	crc: number;
	method: number;
	compressed: Buffer;
	rawSize: number;
	offset: number;
}

function dosDateTime(date: Date) {
	const time =
		(date.getHours() << 11) |
		(date.getMinutes() << 5) |
		Math.floor(date.getSeconds() / 2);
	const day =
		((date.getFullYear() - 1980) << 9) |
		((date.getMonth() + 1) << 5) |
		date.getDate();

	return { time, day };
}

function localHeader(entry: StagedEntry, stamp: { time: number; day: number }) {
	const header = Buffer.alloc(30);
	header.writeUInt32LE(SIGNATURE_LOCAL, 0);
	header.writeUInt16LE(VERSION_NEEDED, 4);
	header.writeUInt16LE(0, 6);
	header.writeUInt16LE(entry.method, 8);
	header.writeUInt16LE(stamp.time, 10);
	header.writeUInt16LE(stamp.day, 12);
	header.writeUInt32LE(entry.crc, 14);
	header.writeUInt32LE(entry.compressed.length, 18);
	header.writeUInt32LE(entry.rawSize, 22);
	header.writeUInt16LE(entry.nameBytes.length, 26);
	header.writeUInt16LE(0, 28);

	return header;
}

function centralHeader(
	entry: StagedEntry,
	stamp: { time: number; day: number },
) {
	const header = Buffer.alloc(46);
	header.writeUInt32LE(SIGNATURE_CENTRAL, 0);
	header.writeUInt16LE(VERSION_NEEDED, 4);
	header.writeUInt16LE(VERSION_NEEDED, 6);
	header.writeUInt16LE(0, 8);
	header.writeUInt16LE(entry.method, 10);
	header.writeUInt16LE(stamp.time, 12);
	header.writeUInt16LE(stamp.day, 14);
	header.writeUInt32LE(entry.crc, 16);
	header.writeUInt32LE(entry.compressed.length, 20);
	header.writeUInt32LE(entry.rawSize, 24);
	header.writeUInt16LE(entry.nameBytes.length, 28);
	header.writeUInt16LE(0, 30);
	header.writeUInt16LE(0, 32);
	header.writeUInt16LE(0, 34);
	header.writeUInt16LE(0, 36);
	header.writeUInt32LE(0, 38);
	header.writeUInt32LE(entry.offset, 42);

	return header;
}

export function createZip(entries: ZipEntry[], date = new Date()): Buffer {
	const stamp = dosDateTime(date);
	const staged: StagedEntry[] = [];
	const chunks: Buffer[] = [];
	let offset = 0;

	for (const entry of entries) {
		const nameBytes = Buffer.from(entry.path, 'utf-8');
		const compressed = entry.store
			? entry.data
			: deflateRawSync(entry.data, { level: 9 });
		const stagedEntry: StagedEntry = {
			nameBytes,
			crc: crc32(entry.data) >>> 0,
			method: entry.store ? METHOD_STORE : METHOD_DEFLATE,
			compressed,
			rawSize: entry.data.length,
			offset,
		};

		const header = localHeader(stagedEntry, stamp);
		chunks.push(header, nameBytes, compressed);
		offset += header.length + nameBytes.length + compressed.length;
		staged.push(stagedEntry);
	}

	const centralStart = offset;
	for (const entry of staged) {
		const header = centralHeader(entry, stamp);
		chunks.push(header, entry.nameBytes);
		offset += header.length + entry.nameBytes.length;
	}

	const end = Buffer.alloc(22);
	end.writeUInt32LE(SIGNATURE_END, 0);
	end.writeUInt16LE(0, 4);
	end.writeUInt16LE(0, 6);
	end.writeUInt16LE(staged.length, 8);
	end.writeUInt16LE(staged.length, 10);
	end.writeUInt32LE(offset - centralStart, 12);
	end.writeUInt32LE(centralStart, 16);
	end.writeUInt16LE(0, 20);
	chunks.push(end);

	return Buffer.concat(chunks);
}
