import { DefaultTheme } from 'react-native-paper';
import colors from './color';

export const theme = {
  ...DefaultTheme,
  roundness: 2,
  colors: {
    ...DefaultTheme.colors,
    primary: colors.primary,
    accent: colors.accent,
    background: colors.background,
    text: colors.text,
  },
};
