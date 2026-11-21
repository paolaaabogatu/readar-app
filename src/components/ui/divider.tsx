import { Text, View } from 'react-native';

type Props = {
  /** Textul din mijloc, de exemplu „sau”. Fără text, e doar o linie. */
  label?: string;
  /** subtle = linie deschisă 1 px (implicit), strong = indigo 1,2 px (stare activă în v8), accent = sakura. */
  tone?: 'subtle' | 'strong' | 'accent';
  /** Lățime fixă, pentru o linie scurtă centrată (de exemplu 40). */
  width?: number;
  /** Linie verticală, de exemplu între două butoane. */
  vertical?: boolean;
  className?: string;
};

const TONES = {
  subtle: { color: 'bg-line', size: 1 },
  strong: { color: 'bg-ink', size: 1.2 },
  accent: { color: 'bg-sakura', size: 1 },
};

/** Linia subțire din v8 (Hairline), opțional cu text la mijloc. */
export function Divider({ label, tone = 'subtle', vertical = false, width, className }: Props) {
  const t = TONES[tone];

  if (vertical) return <View className={`self-stretch ${t.color} ${className ?? ''}`} style={{ width: t.size }} />;
  if (!label)
    return (
      <View
        className={`${t.color} ${width ? 'self-center' : ''} ${className ?? ''}`}
        style={{ height: t.size, width }}
      />
    );

  return (
    <View
      accessible
      accessibilityLabel={label}
      className={`flex-row items-center gap-3.5 ${className ?? ''}`}>
      <View className={`flex-1 ${t.color}`} style={{ height: t.size }} />
      <Text className="font-sans text-caption text-ink-muted">{label}</Text>
      <View className={`flex-1 ${t.color}`} style={{ height: t.size }} />
    </View>
  );
}
