import clsx from 'clsx';

import * as TextCss from './Text.css';

type Tag = 'p' | 'div' | 'span' | 'cite' | 'blockquote' | 'li' | 'strong';

type TextProps<T extends Tag> = {
	component?: T;
	className?: string;
} & React.ComponentProps<T> &
	TextCss.TextVariants;

export function Text<T extends Tag>({
	component,
	className,
	fontSize,
	color,
	...props
}: TextProps<T>) {
	const Tag = component || 'p';
	return (
		<Tag
			className={clsx(TextCss.textRecipe({ fontSize, color }), className)}
			{...(props as any)}
		/>
	);
}
