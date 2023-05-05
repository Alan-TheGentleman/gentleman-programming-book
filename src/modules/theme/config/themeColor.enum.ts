import { EnumType, type EnumTypeInfer } from '@/shared/utils';

export const themeColorEnum = EnumType('Light', 'Dark', 'System');
export type ThemeColor = EnumTypeInfer<typeof themeColorEnum>;
