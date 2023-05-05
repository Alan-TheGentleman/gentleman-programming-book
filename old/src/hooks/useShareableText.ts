import type { VirtualElement } from '@popperjs/core';
import React from 'react';
import { usePopper } from 'react-popper';

type NullableVirtualElement = {
	getBoundingClientRect: () => DOMRect | null | undefined;
};

export const useShareableText = () => {
	const [selectedText, setSelectedText] = React.useState<string>('');
	const [referenceElement, setReferenceElement] = React.useState<
		HTMLElement | NullableVirtualElement | undefined | null
	>(null);
	const [popperTooltipElement, setPopperTooltipElement] =
		React.useState<HTMLDivElement | null>(null);

	const { styles: popperTooltipStyles, attributes } = usePopper(
		referenceElement as VirtualElement,
		popperTooltipElement,
		{
			modifiers: [{ name: 'offset', options: { offset: [0, 10] } }],
			placement: 'top',
		},
	);

	const selectionChange = React.useCallback(() => {
		const selection = window.getSelection();
		if (selection) {
			const selectedText = selection.toString();
			if (selection.isCollapsed || !selectedText.length) {
				setSelectedText('');
			}
			setSelectedText(selectedText);
		}

		const virtualReference: NullableVirtualElement = {
			getBoundingClientRect: () => {
				return window.getSelection()?.getRangeAt(0).getBoundingClientRect();
			},
		};

		setReferenceElement(virtualReference);
	}, [setSelectedText]);

	React.useEffect(() => {
		window.document.addEventListener('selectionchange', selectionChange);

		return () => {
			window.document.removeEventListener('selectionchange', selectionChange);
		};
	}, [selectionChange]);

	return {
		selectedText,
		setReferenceElement,
		selectionChange,
		setPopperTooltipElement,
		styles: popperTooltipStyles.popper as Record<string, string>,
		popperAttrs: attributes.popper as Record<string, string>,
	};
};
