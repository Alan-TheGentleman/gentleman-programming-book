export function getCurrentZoom() {
	let zoomString = '100%';

	if (
		!(
			window.document &&
			'zoom' in window.document.body.style &&
			typeof window.document.body.style.zoom === 'string'
		)
	)
		return 100;

	zoomString = window.document.body.style.zoom || zoomString;
	return parseInt(zoomString.split('%')[0], 10);
}

export function zoomOut() {
	const zoom = getCurrentZoom();
	if (
		!(
			window.document &&
			'zoom' in window.document.body.style &&
			typeof window.document.body.style.zoom === 'string'
		)
	)
		return;
	if (zoom === 100) return;

	window.document.body.style.zoom = `${zoom - 5}%`;
}
export function zoomIn() {
	const zoom = getCurrentZoom();
	if (
		!(
			window.document &&
			'zoom' in window.document.body.style &&
			typeof window.document.body.style.zoom === 'string'
		)
	)
		return;

	window.document.body.style.zoom = `${zoom + 5}%`;
}
