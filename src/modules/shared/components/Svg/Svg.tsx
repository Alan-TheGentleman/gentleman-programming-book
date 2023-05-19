import clsx from 'clsx';
import React from 'react';

import * as SvgCss from './Svg.css';

type SvgProps = React.ComponentProps<'svg'>;

export const Svg: React.FC<SvgProps> = ({ className, ...props }) => {
	return <svg className={clsx([SvgCss.SvgStyle, className])} {...props} />;
};
