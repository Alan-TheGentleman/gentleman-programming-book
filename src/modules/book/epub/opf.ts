import { ChapterHeading } from './markdown';

export interface EpubMetadata {
	identifier: string;
	title: string;
	subtitle: string;
	author: string;
	publisher: string;
	language: string;
	description: string;
	rights: string;
	modified: string;
}

export interface ChapterDocument {
	fileName: string;
	title: string;
	headings: ChapterHeading[];
}

export interface ManifestMedia {
	fileName: string;
	mediaType: string;
}

export function escapeXml(value: string): string {
	return value
		.replace(/&/g, '&amp;')
		.replace(/</g, '&lt;')
		.replace(/>/g, '&gt;')
		.replace(/"/g, '&quot;')
		.replace(/'/g, '&apos;');
}

export const CONTAINER_XML = `<?xml version="1.0" encoding="UTF-8"?>
<container version="1.0" xmlns="urn:oasis:names:tc:opendocument:xmlns:container">
	<rootfiles>
		<rootfile full-path="EPUB/content.opf" media-type="application/oebps-package+xml"/>
	</rootfiles>
</container>`;

export function xhtmlDocument(
	language: string,
	title: string,
	body: string,
	bodyClass?: string,
): string {
	const classAttribute = bodyClass ? ` class="${bodyClass}"` : '';

	return `<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE html>
<html xmlns="http://www.w3.org/1999/xhtml" xmlns:epub="http://www.idpf.org/2007/ops" xml:lang="${language}" lang="${language}">
	<head>
		<meta charset="utf-8"/>
		<title>${escapeXml(title)}</title>
		<link rel="stylesheet" type="text/css" href="../styles/book.css"/>
	</head>
	<body${classAttribute}>
${body}
	</body>
</html>`;
}

export function buildNav(
	metadata: EpubMetadata,
	chapters: ChapterDocument[],
	tocLabel: string,
): string {
	const items = chapters
		.map(chapter => {
			const sections = chapter.headings.filter(heading => heading.depth === 2);
			const nested = sections.length
				? `\n\t\t\t\t\t<ol>\n${sections
						.map(
							section =>
								`\t\t\t\t\t\t<li><a href="text/${chapter.fileName}#${section.id}">${escapeXml(section.text)}</a></li>`,
						)
						.join('\n')}\n\t\t\t\t\t</ol>\n\t\t\t\t`
				: '';

			return `\t\t\t\t<li><a href="text/${chapter.fileName}">${escapeXml(chapter.title)}</a>${nested}</li>`;
		})
		.join('\n');

	return `<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE html>
<html xmlns="http://www.w3.org/1999/xhtml" xmlns:epub="http://www.idpf.org/2007/ops" xml:lang="${metadata.language}" lang="${metadata.language}">
	<head>
		<meta charset="utf-8"/>
		<title>${escapeXml(tocLabel)}</title>
		<link rel="stylesheet" type="text/css" href="styles/book.css"/>
	</head>
	<body>
		<nav epub:type="toc" id="toc">
			<h1>${escapeXml(tocLabel)}</h1>
			<ol>
${items}
			</ol>
		</nav>
		<nav epub:type="landmarks" hidden="hidden">
			<ol>
				<li><a epub:type="cover" href="text/cover.xhtml">Cover</a></li>
				<li><a epub:type="bodymatter" href="text/${chapters[0].fileName}">Start</a></li>
			</ol>
		</nav>
	</body>
</html>`;
}

export function buildOpf(
	metadata: EpubMetadata,
	chapters: ChapterDocument[],
	media: ManifestMedia[],
): string {
	const chapterItems = chapters
		.map(
			chapter =>
				`\t\t<item id="${chapter.fileName.replace(/\./g, '_')}" href="text/${chapter.fileName}" media-type="application/xhtml+xml"/>`,
		)
		.join('\n');

	const mediaItems = media
		.map(
			(asset, index) =>
				`\t\t<item id="media-${index}" href="media/${asset.fileName}" media-type="${asset.mediaType}"/>`,
		)
		.join('\n');

	const spineItems = chapters
		.map(
			chapter =>
				`\t\t<itemref idref="${chapter.fileName.replace(/\./g, '_')}"/>`,
		)
		.join('\n');

	return `<?xml version="1.0" encoding="UTF-8"?>
<package xmlns="http://www.idpf.org/2007/opf" version="3.0" unique-identifier="book-id" xml:lang="${metadata.language}">
	<metadata xmlns:dc="http://purl.org/dc/elements/1.1/">
		<dc:identifier id="book-id">${escapeXml(metadata.identifier)}</dc:identifier>
		<dc:title>${escapeXml(metadata.title)}</dc:title>
		<dc:creator id="author">${escapeXml(metadata.author)}</dc:creator>
		<dc:language>${metadata.language}</dc:language>
		<dc:publisher>${escapeXml(metadata.publisher)}</dc:publisher>
		<dc:description>${escapeXml(metadata.description)}</dc:description>
		<dc:rights>${escapeXml(metadata.rights)}</dc:rights>
		<meta property="dcterms:modified">${metadata.modified}</meta>
		<meta name="cover" content="cover-image"/>
	</metadata>
	<manifest>
		<item id="nav" href="nav.xhtml" media-type="application/xhtml+xml" properties="nav"/>
		<item id="cover-image" href="media/cover.jpg" media-type="image/jpeg" properties="cover-image"/>
		<item id="cover_xhtml" href="text/cover.xhtml" media-type="application/xhtml+xml"/>
		<item id="style" href="styles/book.css" media-type="text/css"/>
${chapterItems}
${mediaItems}
	</manifest>
	<spine>
		<itemref idref="cover_xhtml" linear="yes"/>
		<itemref idref="nav" linear="yes"/>
${spineItems}
	</spine>
</package>`;
}
