import { EnumType, type EnumTypeInfer } from '@/shared/utils';

export const themeColorEnum = EnumType('Light', 'Dark', 'Sepia', 'System');
export type ThemeColor = EnumTypeInfer<typeof themeColorEnum>;
