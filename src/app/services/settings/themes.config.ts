export const AVAILABLE_THEMES = [
  'default',
  'default-dark',
  'blue',
  'blue-dark',
  'green',
  'green-dark',
  'megna',
  'megna-dark',
  'purple',
  'purple-dark',
  'red',
  'red-dark'
] as const;

export type ThemeName = typeof AVAILABLE_THEMES[number];
