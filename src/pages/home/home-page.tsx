import { View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { ReadarMark } from '@/components/readar/readar-mark';
import { Text } from '@/components/ui/text';

export function HomePage() {
  const insets = useSafeAreaInsets();

  return (
    <View
      className="flex-1 items-center justify-center bg-paper px-8"
      style={{ paddingTop: insets.top, paddingBottom: insets.bottom }}>
      <ReadarMark size={88} />

      <Text className="mt-6 font-display-semibold text-h1 text-ink">Readar</Text>
      <Text className="mt-2 font-jp text-body tracking-[6px] text-kinako">リーダー</Text>

      <View className="my-8 h-px w-10 bg-sakura" />

      <Text className="text-center font-display-italic text-h3 text-momiji">
        Citește. Respiră. Înflorește.
      </Text>
      <Text className="mt-4 max-w-[280px] text-center text-ink-muted">
        Află titlul și autorul unei cărți dintr-o fotografie.
      </Text>

      <View className="mt-10 rounded-full border border-line bg-paper-raised px-5 py-3">
        <Text className="font-sans-semibold text-label uppercase text-ink">În curând</Text>
      </View>
    </View>
  );
}
