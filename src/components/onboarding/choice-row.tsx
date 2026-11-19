import { Ionicons } from '@expo/vector-icons';
import { Pressable, Text, View, type PressableProps } from 'react-native';

import { Radio } from '@/components/ui/radio';

type Props = Omit<PressableProps, 'children'> & {
  /** Numărul din stânga: 1 → „01”. */
  index: number;
  title: string;
  subtitle?: string;
  icon?: keyof typeof Ionicons.glyphMap;
  selected?: boolean;
  /** Linia de deasupra (pentru primul rând din listă). */
  first?: boolean;
};

/** Rândul de alegere din v8 („01 · Cu emailul · Îți alegi o parolă · ◯”). */
export function ChoiceRow({ index, title, subtitle, icon, selected = false, first = false, ...rest }: Props) {
  return (
    <Pressable
      accessibilityRole="radio"
      accessibilityLabel={subtitle ? `${title}, ${subtitle}` : title}
      accessibilityState={{ selected }}
      {...rest}>
      {({ pressed }) => (
        <View
          className={`h-[74px] flex-row items-center border-b border-line ${first ? 'border-t' : ''} ${pressed ? 'bg-paper-raised' : ''}`}>
          <Text className="w-10 font-sans-medium text-[11px] tracking-[1.32px] text-ink-muted">
            {String(index).padStart(2, '0')}
          </Text>
          {icon && (
            <View className="w-9">
              <Ionicons name={icon} size={20} color="#0b2a52" />
            </View>
          )}
          <View className="flex-1">
            <Text className="font-sans text-[17px] text-ink">{title}</Text>
            {subtitle && <Text className="mt-0.5 font-sans text-[12px] text-ink-muted">{subtitle}</Text>}
          </View>
          <Radio selected={selected} />
        </View>
      )}
    </Pressable>
  );
}
