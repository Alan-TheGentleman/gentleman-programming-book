import { z } from 'zod';

export const chapterScheme = z.object({
	// content: z.string(),
	id: z.string(),
	link: z.string(),
	name: z.string(),
	order: z.number(),
	titleList: z.array(
		z.object({
			value: z.string(),
			link: z.string(),
		}),
	),
});

export type Chapter = z.infer<typeof chapterScheme>;
