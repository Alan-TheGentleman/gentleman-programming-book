import React, { useId } from 'react';
import { Portal } from 'src/components/SelectedMenu/Portal';
import { SharePopupMenu } from 'src/components/SelectedMenu/SharePopup';
import { useShareableText } from 'src/hooks';

type SelectedMenuProps = {
	wrapperId: string;
	children: React.ReactElement;
};

export const SelectedMenu = ({ wrapperId, children }: SelectedMenuProps) => {
	const portalContainerId = useId();
	const {
		selectedText,
		setReferenceElement,
		selectionChange,
		popperAttrs,
		styles,
		setPopperTooltipElement,
	} = useShareableText();

	const childrenWithProps = React.Children.map(children, child =>
		React.cloneElement(child, {
			...child.props,
			id: wrapperId,
			ref: setReferenceElement,
			onMouseUp: selectionChange,
		}),
	);

	return (
		<React.Fragment>
			{childrenWithProps}

			<Portal portalContainerId={portalContainerId} portalFatherId={wrapperId}>
				<SharePopupMenu
					selectedText={selectedText}
					popperAttrs={popperAttrs}
					styles={styles}
					ref={setPopperTooltipElement}
				/>
			</Portal>
		</React.Fragment>
	);
};
