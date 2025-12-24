'use client';

import * as SelectPrimitives from '@radix-ui/react-select';
import { setElementVars } from '@vanilla-extract/dynamic';
import clsx from 'clsx';
import { AnimatePresence, motion } from 'framer-motion';
import {
	Children,
	cloneElement,
	isValidElement,
	ReactElement,
	ReactNode,
	useEffect,
	useRef,
	useState,
} from 'react';

import * as SelectCss from './Select.css';

type Props = {
	buttonTextClassName?: string;
	children: ReactNode;
	className?: string;
	iconLeftContainerClassName?: string;
	leftIcon?: ReactElement;
	placeholder?: string;
	rightIcon?: ReactElement;
	side?: 'left' | 'right' | 'bottom' | 'top';
	value?: string;
	onChange?: (value: string) => void;
	title?: string;
} & SelectCss.SelectVariants &
	SelectCss.OptionVariants;

export function Select({
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
}: Props) {
	const triggerRef = useRef<HTMLButtonElement | null>(null);
	const textRef = useRef<HTMLButtonElement | null>(null);
	const [isOpen, setIsOpen] = useState(false);

	useEffect(() => {
		if (!buttonTextClassName) return;

		textRef.current?.classList.add(buttonTextClassName);
	}, [buttonTextClassName]);

	useEffect(() => {
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
									{Children.map(children, child => {
										if (!isValidElement(child)) return child;
										return cloneElement(
											child as ReactElement<{
												colorScheme?: string;
												variant?: string;
											}>,
											{ colorScheme, variant },
										);
									})}
								</SelectPrimitives.SelectViewport>
							</motion.div>
						</AnimatePresence>
					</SelectPrimitives.SelectContent>
				</SelectPrimitives.Portal>
			</SelectPrimitives.Root>
		</>
	);
}
