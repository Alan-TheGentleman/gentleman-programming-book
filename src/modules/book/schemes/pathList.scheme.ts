import { z } from 'zod';

import { pathSchema } from './path.scheme';

export const pathListScheme = z.array(pathSchema);
