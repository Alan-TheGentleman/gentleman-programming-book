import { z } from 'zod';

export const chapterMetadataSchema = z.object({
	id: z.string(),
	name: z.string(),
	order: z.number(),
	titleList: z.array(
		z.object({
			tagId: z.string(),
			name: z.string(),
		}),
	),
});
