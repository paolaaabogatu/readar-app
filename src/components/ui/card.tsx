import type { ReactNode } from 'react';
import { View } from 'react-native';

import { H3 } from './heading';

type Props = {
  /** Titlul cardului, opțional. */
  title?: string;
  /** light = hârtie (implicit), dark = indigo. */
  tone?: 'light' | 'dark';
  children?: ReactNode;
  className?: string;
};

/** Card cu colțuri de 28 px, ca în Figma (Card 01–03 de pe landing). */
export function Card({ title, tone = 'light', children, className }: Props) {
  const dark = tone === 'dark';

  return (
    <View className={`gap-3 rounded-card p-5 ${dark ? 'bg-indigo' : 'bg-paper-raised'} ${className ?? ''}`}>
      {title && <H3 tone={dark ? 'on-brand' : 'ink'}>{title}</H3>}
      {children}
    </View>
  );
}
