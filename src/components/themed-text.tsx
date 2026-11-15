import { Platform, StyleSheet, Text, type TextProps } from 'react-native';

import { Fonts, ThemeColor } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';

export type ThemedTextProps = TextProps & {
  type?: 'default' | 'title' | 'small' | 'smallBold' | 'subtitle' | 'link' | 'linkPrimary' | 'code';
  themeColor?: ThemeColor;
};

export function ThemedText({ style, type = 'default', themeColor, ...rest }: ThemedTextProps) {
  const theme = useTheme();

  return <Text style={[{ color: theme[themeColor ?? 'text'] }, styles[type], style]} {...rest} />;
}

const styles = StyleSheet.create({
  small: {
    fontFamily: 'Inter_500Medium',
    fontSize: 14,
    lineHeight: 20,
  },
  smallBold: {
    fontFamily: 'Inter_600SemiBold',
    fontSize: 14,
    lineHeight: 20,
  },
  default: {
    fontFamily: 'Inter_400Regular',
    fontSize: 16,
    lineHeight: 25.6,
  },
  title: {
    fontFamily: 'EBGaramond_600SemiBold',
    fontSize: 48,
    lineHeight: 52,
  },
  subtitle: {
    fontFamily: 'EBGaramond_400Regular',
    fontSize: 32,
    lineHeight: 40,
  },
  link: {
    fontFamily: 'Inter_400Regular',
    lineHeight: 30,
    fontSize: 14,
  },
  linkPrimary: {
    fontFamily: 'Inter_500Medium',
    lineHeight: 30,
    fontSize: 14,
    color: '#2f5d93',
  },
  code: {
    fontFamily: Fonts.mono,
    fontWeight: Platform.select({ android: 700 }) ?? 500,
    fontSize: 12,
  },
});
