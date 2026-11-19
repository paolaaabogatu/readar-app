import { Pressable, Text, View, type PressableProps } from 'react-native';

type Props = Omit<PressableProps, 'children'> & {
  label: string;
  className?: string;
};

/** Acțiunea secundară din Onboarding: text urmat de o linie până la margine („Am deja cont ———”). */
export function SecondaryLink({ label, className, ...rest }: Props) {
  return (
    <Pressable accessibilityRole="link" accessibilityLabel={label} hitSlop={10} {...rest}>
      {({ pressed }) => (
        <View className={`flex-row items-center gap-4 ${className ?? ''}`}>
          <Text className={`font-sans text-caption ${pressed ? 'text-fold' : 'text-ink'}`}>{label}</Text>
          <View className={`h-px flex-1 ${pressed ? 'bg-fold' : 'bg-line'}`} />
        </View>
      )}
    </Pressable>
  );
}
