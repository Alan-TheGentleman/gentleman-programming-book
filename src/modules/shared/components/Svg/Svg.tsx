import clsx from 'clsx';
import { ComponentProps, FC } from 'react';

import * as SvgCss from './Svg.css';

type SvgProps = ComponentProps<'svg'>;

export const Svg: FC<SvgProps> = ({ className, ...props }) => {
	return <svg className={clsx([SvgCss.SvgStyle, className])} {...props} />;
};
