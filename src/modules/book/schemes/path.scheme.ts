import { z } from 'zod';

export const pathSchema = z.object({
	params: z.object({ chapterId: z.string() }),
	locale: z.string(),
});
