function buildTweet(pageUrl: string, quote: string | undefined) {
	if (quote !== undefined) {
		const characterTotal = quote.length + pageUrl.length;
		if (characterTotal + 19 < 280) {
			return encodeURIComponent(`“${quote}” – `);
		}

		const amountToTrim = 280 - (pageUrl.length + 19);
		return encodeURIComponent(`“${quote.slice(0, amountToTrim)}…” –`);
	}

	return '';
}

export const buildTweetUrl = (quote: string) => {
	const pageUrl = encodeURIComponent(window.location.href);
	const tweet = buildTweet(pageUrl, quote);

	return `https://twitter.com/intent/tweet?url=${pageUrl}&text=${tweet}&via=alan_buscaglia`;
};
