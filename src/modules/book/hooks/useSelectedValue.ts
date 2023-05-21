import React from 'react';

const debounce = <Fn extends (...args: unknown[]) => unknown>(
	fn: Fn,
	delay: number,
) => {
	let timer: any;
	return (...args: any) => {
		clearTimeout(timer);
		timer = setTimeout(() => {
			fn(...args);
		}, delay);
	};
};

export function useSelectedValue() {
	const [value, setValue] = React.useState<string | null>(null);

	// eslint-disable-next-line react-hooks/exhaustive-deps
	const debounced = React.useCallback(
		debounce(() => {
			const selection = window.getSelection()?.toString();
			if (selection) {
				setValue(selection);
			} else {
				setValue(null);
			}
		}, 500),
		[],
	);

	React.useEffect(() => {
		const listener = (_: Event): void => {
			debounced();
		};

		window.document.addEventListener('selectionchange', listener);

		return () => {
			window.document.removeEventListener('selectionchange', listener);
		};
	}, [debounced]);

	return value;
}
