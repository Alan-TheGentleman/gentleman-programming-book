export const EPUB_STYLESHEET = `
body {
	font-family: Georgia, 'Times New Roman', serif;
	line-height: 1.5;
	margin: 0 5%;
}

h1, h2, h3, h4, h5, h6 {
	line-height: 1.25;
	page-break-after: avoid;
	margin: 1.2em 0 0.6em;
}

h1 {
	page-break-before: always;
	font-size: 1.7em;
}

pre {
	white-space: pre-wrap;
	word-wrap: break-word;
	overflow-wrap: break-word;
	hyphens: none;
	font-size: 0.7em;
	line-height: 1.35;
	background-color: #f5f5f5;
	border-left: 3px solid #c71f7a;
	padding: 0.5em 0.6em;
	margin: 1em 0;
}

code {
	font-family: 'Courier New', monospace;
	word-wrap: break-word;
}

p code {
	font-size: 0.85em;
	background-color: #f5f5f5;
	padding: 0 0.15em;
}

img {
	max-width: 100%;
	height: auto;
}

figure.diagram {
	margin: 1em 0;
	text-align: center;
	page-break-inside: avoid;
}

figure.diagram img {
	max-width: 100%;
	height: auto;
}

table {
	width: 100%;
	border-collapse: collapse;
	font-size: 0.78em;
	margin: 1em 0;
	page-break-inside: avoid;
}

th, td {
	border: 1px solid #bbbbbb;
	padding: 0.3em 0.4em;
	text-align: left;
}

th {
	background-color: #f0f0f0;
}

blockquote {
	margin: 1em 1.2em;
	font-style: italic;
	border-left: 3px solid #ffa54b;
	padding-left: 0.8em;
}

.cover {
	margin: 0;
	padding: 0;
	text-align: center;
}

.cover img {
	max-width: 100%;
	max-height: 100%;
}
`;
