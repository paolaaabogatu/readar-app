import { Text, View } from 'react-native';
import Svg, { Path } from 'react-native-svg';

type Props = {
  label: string;
  /** Regula e îndeplinită (bifă indigo) sau nu încă (gri). */
  done?: boolean;
};

/** Rând cu bifă, de exemplu regulile de parolă („Cel puțin 8 litere”). */
export function ChecklistItem({ label, done = false }: Props) {
  return (
    <View
      accessible
      accessibilityRole="text"
      accessibilityLabel={`${label}, ${done ? 'îndeplinit' : 'neîndeplinit'}`}
      className="flex-row items-center gap-2.5">
      <Svg width={14} height={14} viewBox="0 0 14 14" fill="none">
        <Path
          d="M2.5 7.5l3 3 6-7"
          stroke={done ? '#0b2a52' : '#c2b9b0'}
          strokeWidth={1.5}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </Svg>
      <Text className={`font-sans text-[13px] leading-[19.5px] ${done ? 'text-ink' : 'text-ink-muted'}`}>{label}</Text>
    </View>
  );
}
