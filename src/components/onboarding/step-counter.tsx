import { Text } from 'react-native';

type Props = {
  step: number;
  total: number;
};

const pad = (n: number) => String(n).padStart(2, '0');

/** Contorul de pași din dreapta sus: „03 / 04”. */
export function StepCounter({ step, total }: Props) {
  return (
    <Text
      accessibilityLabel={`Pasul ${step} din ${total}`}
      className="font-sans-medium text-[11px] uppercase tracking-[1.32px] text-ink">
      {pad(step)}
      <Text className="text-ink-muted">{`  / ${pad(total)}`}</Text>
    </Text>
  );
}
