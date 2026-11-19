import { Text, View } from 'react-native';

type Props = {
  /** Eticheta, afișată cu majuscule rare. */
  label: string;
  /** Cuvântul japonez dinainte, opțional (de exemplu ようこそ). */
  jp?: string;
  className?: string;
};

/** Eticheta de deasupra titlului: „ようこそ — BINE AI VENIT”. */
export function Kicker({ label, jp, className }: Props) {
  return (
    <View className={`flex-row items-center gap-3 ${className ?? ''}`}>
      {jp && (
        <>
          <Text className="font-jp text-[11px] tracking-[2.64px] text-kinako-ink">{jp}</Text>
          <View className="h-px w-4 bg-kinako" />
        </>
      )}
      <Text className="font-sans-medium text-[10px] uppercase tracking-[2.4px] text-kinako-ink">{label}</Text>
    </View>
  );
}
