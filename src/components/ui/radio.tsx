import { View } from 'react-native';

type Props = {
  selected?: boolean;
};

/** Cerculețul de selecție din v8: contur indigo, punct plin când e ales. */
export function Radio({ selected = false }: Props) {
  return (
    <View
      className={`h-5 w-5 items-center justify-center rounded-full border ${selected ? 'border-ink' : 'border-ink-muted'}`}>
      {selected && <View className="h-2 w-2 rounded-full bg-ink" />}
    </View>
  );
}
