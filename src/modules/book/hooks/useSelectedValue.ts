import { useEffect, useRef, useState } from 'react';

const debounce = <Fn extends (...args: unknown[]) => unknown>(
	fn: Fn,
	delay: number,
) => {
	let timer: ReturnType<typeof setTimeout>;
	return (...args: Parameters<Fn>) => {
		clearTimeout(timer);
		timer = setTimeout(() => {
			fn(...args);
		}, delay);
	};
};

export function useSelectedValue() {
	const [value, setValue] = useState<string | null>(null);

	const debounced = useRef(
		debounce(() => {
			const selection = window.getSelection()?.toString();
			if (selection) {
				setValue(selection);
			} else {
				setValue(null);
			}
		}, 500),
	).current;

	useEffect(() => {
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
