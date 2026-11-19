import { Text, View } from 'react-native';

import { ReadarMark } from '@/components/readar/readar-mark';

type Props = {
  /** Mărimea simbolului; numele se scalează odată cu el. Implicit 30. */
  size?: number;
  /** ink (implicit) sau on-brand, pentru fundal indigo. */
  tone?: 'ink' | 'on-brand';
  className?: string;
};

/** Logo-ul orizontal: simbolul și numele Readar. */
export function Lockup({ size = 30, tone = 'ink', className }: Props) {
  const color = tone === 'ink' ? '#0b2a52' : '#f4ede8';

  return (
    <View
      accessible
      accessibilityRole="image"
      accessibilityLabel="Readar"
      className={`flex-row items-center ${className ?? ''}`}
      style={{ gap: size / 3 }}>
      <ReadarMark size={size} color={color} />
      <Text className="font-display-semibold" style={{ fontSize: size * 0.8, color }}>
        Readar
      </Text>
    </View>
  );
}
