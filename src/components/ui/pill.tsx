import { View } from 'react-native';

import { Label } from './label';

type Props = {
  label: string;
  className?: string;
};

/** Capsulă informativă (nu se apasă), de exemplu „În curând”. */
export function Pill({ label, className }: Props) {
  return (
    <View className={`self-center rounded-full border border-line bg-paper-raised px-5 py-3 ${className ?? ''}`}>
      <Label size="md" tone="ink" className="font-sans-semibold">
        {label}
      </Label>
    </View>
  );
}
