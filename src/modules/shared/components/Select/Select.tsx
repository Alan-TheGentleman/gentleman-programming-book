import * as SelectPrimitives from '@radix-ui/react-select';
import { setElementVars } from '@vanilla-extract/dynamic';
import clsx from 'clsx';
import { AnimatePresence, motion } from 'framer-motion';
import React from 'react';

import * as SelectCss from './Select.css';

type Props = {
	buttonTextClassName?: string;
	children: React.ReactNode;
	className?: string;
	iconLeftContainerClassName?: string;
	leftIcon?: React.ReactElement;
	placeholder?: string;
	rightIcon?: React.ReactElement;
	side?: 'left' | 'right' | 'bottom' | 'top';
	value?: string;
	onChange?: (value: string) => void;
	title?: string;
} & SelectCss.SelectVariants &
	SelectCss.OptionVariants;

export const Select: React.FC<Props> = ({
	buttonTextClassName,
	children,
	className,
	iconLeftContainerClassName,
	leftIcon,
	rightIcon,
	value,
	colorScheme = 'primary',
	placeholder = 'Select an option…',
	side = 'bottom',
	variant = 'outline',
	title,
	onChange,
}) => {
	const triggerRef = React.useRef<HTMLButtonElement | null>(null);
	const textRef = React.useRef<HTMLButtonElement | null>(null);
	const [isOpen, setIsOpen] = React.useState(false);

	React.useEffect(() => {
		if (!buttonTextClassName) return;

		textRef.current?.classList.add(buttonTextClassName);
	}, [buttonTextClassName]);

	React.useEffect(() => {
		if (!isOpen) return;

		const el = document.querySelector('.' + SelectCss.SelectContent);

		if (!triggerRef.current) return;

		setElementVars(el as HTMLElement, {
			[SelectCss.containerMinWidth]: triggerRef?.current.offsetWidth + 'px',
		});
	}, [isOpen]);

	return (
		<>
			<SelectPrimitives.Root
				open={isOpen}
				onValueChange={onChange}
				value={value}
				onOpenChange={setIsOpen}
			>
				<SelectPrimitives.Trigger
					className={clsx(
						SelectCss.SelectRecipe({ colorScheme, variant }),
						className,
					)}
					title={title}
					ref={triggerRef}
				>
					{leftIcon && (
						<SelectPrimitives.Icon
							className={clsx(
								SelectCss.buttonIconContainer,
								iconLeftContainerClassName,
							)}
						>
							{leftIcon}
						</SelectPrimitives.Icon>
					)}

					<SelectPrimitives.SelectValue
						placeholder={placeholder}
						ref={textRef}
					/>

					{rightIcon && (
						<SelectPrimitives.Icon
							className={clsx(
								SelectCss.buttonIconContainer,
								SelectCss.iconRight,
							)}
						>
							{rightIcon}
						</SelectPrimitives.Icon>
					)}
				</SelectPrimitives.Trigger>

				<SelectPrimitives.Portal>
					<SelectPrimitives.SelectContent
						position='popper'
						side={side}
						sideOffset={8}
						className={SelectCss.SelectContent}
					>
						<AnimatePresence>
							<motion.div
								initial={{ opacity: 0, y: -10 }}
								animate={{ opacity: 1, y: 0 }}
								exit={{ opacity: 0, y: -20 }}
								transition={{ duration: 0.3 }}
							>
								<SelectPrimitives.SelectViewport
									className={SelectCss.OptionListContainerRecipe({
										colorScheme,
										variant,
									})}
								>
									{React.Children.map(
										children as React.ReactElement[],
										(child: React.ReactElement) =>
											React.cloneElement(child, {
												...child.props,
												colorScheme,
												variant,
											}),
									)}
								</SelectPrimitives.SelectViewport>
							</motion.div>
						</AnimatePresence>
					</SelectPrimitives.SelectContent>
				</SelectPrimitives.Portal>
			</SelectPrimitives.Root>
		</>
	);
};
