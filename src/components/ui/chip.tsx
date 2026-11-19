import { Pressable, Text, View, type PressableProps } from 'react-native';

type ChipProps = Omit<PressableProps, 'children'> & {
  label: string;
  selected?: boolean;
};

/** Eticheta selectabilă din v8 („Aventuri”, „Basme”): conturată, plină indigo când e aleasă. */
export function Chip({ label, selected = false, disabled, ...rest }: ChipProps) {
  return (
    <Pressable
      accessibilityRole="checkbox"
      accessibilityLabel={label}
      accessibilityState={{ checked: selected, disabled: !!disabled }}
      disabled={disabled}
      {...rest}>
      {({ pressed }) => (
        <View
          className={`h-[46px] justify-center rounded-full border px-[18px] ${
            selected ? 'border-indigo bg-indigo' : pressed ? 'border-ink bg-paper-raised' : 'border-ink-muted bg-transparent'
          } ${disabled ? 'opacity-40' : ''}`}>
          <Text className={`font-sans text-[14px] ${selected ? 'text-on-brand' : 'text-ink'}`}>{label}</Text>
        </View>
      )}
    </Pressable>
  );
}

type GroupProps = {
  options: string[];
  value: string[];
  onChange: (value: string[]) => void;
  className?: string;
};

/** Grup de etichete cu selecție multiplă. */
export function ChipGroup({ options, value, onChange, className }: GroupProps) {
  const toggle = (option: string) =>
    onChange(value.includes(option) ? value.filter((v) => v !== option) : [...value, option]);

  return (
    <View className={`flex-row flex-wrap gap-2 ${className ?? ''}`}>
      {options.map((option) => (
        <Chip key={option} label={option} selected={value.includes(option)} onPress={() => toggle(option)} />
      ))}
    </View>
  );
}
