import * as DialogPrimitives from '@radix-ui/react-dialog';
import clsx from 'clsx';
import React from 'react';
import { VscChromeClose } from 'react-icons/vsc';

import { IconButton } from '@/shared/components';

import * as DialogCss from './Dialog.css';

type DialogProps = {
	trigger: React.ReactElement;
	title?: React.ReactElement;
	description?: React.ReactElement;
	body: React.ReactElement;
	classNameContent?: string;
} & DialogPrimitives.DialogProps;

export const Dialog: React.FC<DialogProps> = ({
	trigger,
	title,
	description,
	body,
	classNameContent,
	...props
}) => {
	return (
		<DialogPrimitives.Root {...props}>
			<DialogPrimitives.Trigger asChild>{trigger}</DialogPrimitives.Trigger>
			<DialogPrimitives.Portal>
				<DialogPrimitives.Overlay className={DialogCss.overlay} />
				<DialogPrimitives.Content
					className={clsx(DialogCss.content, classNameContent)}
				>
					<DialogPrimitives.Title>{title}</DialogPrimitives.Title>
					<DialogPrimitives.Description>
						{description}
					</DialogPrimitives.Description>

					{body}

					<DialogPrimitives.Close asChild>
						<IconButton
							className={DialogCss.close}
							variant='ghost'
							colorScheme='secondary'
							icon={<VscChromeClose />}
							aria-label='Close'
						/>
					</DialogPrimitives.Close>
				</DialogPrimitives.Content>
			</DialogPrimitives.Portal>
		</DialogPrimitives.Root>
	);
};
