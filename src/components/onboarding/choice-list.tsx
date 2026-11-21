import type { Ionicons } from '@expo/vector-icons';
import { View } from 'react-native';

import { ChoiceRow } from './choice-row';

export type ChoiceOption<T extends string> = {
  id: T;
  title: string;
  subtitle?: string;
  icon?: keyof typeof Ionicons.glyphMap;
};

type Props<T extends string> = {
  options: ChoiceOption<T>[];
  value: T;
  onChange: (value: T) => void;
  className?: string;
};

/** Listă de opțiuni cu o singură alegere (01, 02, 03…), din rânduri ChoiceRow. */
export function ChoiceList<T extends string>({ options, value, onChange, className }: Props<T>) {
  return (
    <View accessibilityRole="radiogroup" className={className}>
      {options.map((option, i) => (
        <ChoiceRow
          key={option.id}
          index={i + 1}
          first={i === 0}
          title={option.title}
          subtitle={option.subtitle}
          icon={option.icon}
          selected={value === option.id}
          onPress={() => onChange(option.id)}
        />
      ))}
    </View>
  );
}
