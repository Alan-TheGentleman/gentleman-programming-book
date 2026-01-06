'use client';

import { useEffect, useId, useRef, useState } from 'react';
import mermaid from 'mermaid';

interface MermaidProps {
	chart: string;
}

// Initialize mermaid with custom theme
mermaid.initialize({
	startOnLoad: false,
	theme: 'base',
	themeVariables: {
		primaryColor: '#2a2139',
		primaryTextColor: '#f92aad',
		primaryBorderColor: '#f92aad',
		lineColor: '#f92aad',
		secondaryColor: '#34294f',
		tertiaryColor: '#2a2139',
		background: '#2a2139',
		mainBkg: '#2a2139',
		nodeBorder: '#f92aad',
		clusterBkg: '#2a213950',
		clusterBorder: '#f92aad',
		titleColor: '#f92aad',
		edgeLabelBackground: '#2a2139',
	},
});

export function Mermaid({ chart }: MermaidProps) {
	const containerRef = useRef<HTMLDivElement>(null);
	const [svg, setSvg] = useState<string>('');
	const id = useId();

	useEffect(() => {
		const renderChart = async () => {
			if (containerRef.current) {
				const mermaidId = `mermaid-${id.replace(/:/g, '')}`;
				try {
					const { svg } = await mermaid.render(mermaidId, chart);
					setSvg(svg);
				} catch (error) {
					console.error('Mermaid rendering error:', error);
				}
			}
		};

		renderChart();
	}, [chart, id]);

	return (
		<div
			ref={containerRef}
			className='mermaid-container'
			style={{
				display: 'flex',
				justifyContent: 'center',
				margin: '1.5em 0',
				padding: '1em',
				backgroundColor: '#2a2139',
				borderRadius: '0.5rem',
				overflow: 'auto',
			}}
			dangerouslySetInnerHTML={{ __html: svg }}
		/>
	);
}
