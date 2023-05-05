import React from 'react';
import * as reactDom from 'react-dom';

type PortalProps = {
	children: React.ReactNode;
	key?: null | string;
	portalFatherId: string;
	portalContainerId?: string;
};

export const Portal = ({
	children,
	key,
	portalFatherId,
	portalContainerId,
}: PortalProps) => {
	let _portalContainerId = React.useId();
	_portalContainerId = portalContainerId || _portalContainerId;
	const portalContainerRef = React.useRef<HTMLDivElement | null>(null);
	const portalContainer = portalContainerRef.current;

	React.useEffect(() => {
		let _portalContainer = portalContainerRef.current;

		if (!_portalContainer) {
			_portalContainer = window.document.createElement('div');
			_portalContainer.setAttribute('id', _portalContainerId);
			const _portalFather = document.getElementById(portalFatherId);
			_portalFather?.append(_portalContainer);

			portalContainerRef.current = _portalContainer;
		}
	}, [_portalContainerId, portalFatherId]);

	if (!portalContainer) return null;

	return <>{reactDom.createPortal(<>{children}</>, portalContainer, key)}</>;
};
