import { View } from 'react-native';

type Props = {
  step: number;
  total: number;
  className?: string;
};

/** Linia de progres de sub top bar: linie deschisă, cu partea parcursă în indigo. */
export function ProgressLine({ step, total, className }: Props) {
  const percent = Math.min(Math.max(step / total, 0), 1) * 100;

  return (
    <View
      accessibilityRole="progressbar"
      accessibilityValue={{ min: 0, max: total, now: step }}
      className={`relative h-[1.2px] ${className ?? ''}`}>
      <View className="absolute inset-x-0 top-0 h-px bg-line" />
      <View className="absolute left-0 top-0 h-[1.2px] bg-ink" style={{ width: `${percent}%` }} />
    </View>
  );
}
