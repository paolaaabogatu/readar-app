import { View } from 'react-native';

import { Jp } from './jp';
import { Label } from './label';

type Props = {
  /** Eticheta, afișată cu majuscule rare. */
  label: string;
  /** Cuvântul japonez dinainte, în kana (de exemplu ようこそ). Opțional. */
  jp?: string;
  className?: string;
};

/** Eticheta de deasupra titlului: „ようこそ — BINE AI VENIT”. */
export function Kicker({ label, jp, className }: Props) {
  return (
    <View className={`flex-row items-center gap-3 ${className ?? ''}`}>
      {jp && (
        <>
          <Jp>{jp}</Jp>
          <View className="h-px w-4 bg-kinako" />
        </>
      )}
      <Label tone="kinako">{label}</Label>
    </View>
  );
}
