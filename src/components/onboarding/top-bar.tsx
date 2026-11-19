import { router } from 'expo-router';
import { Pressable, View } from 'react-native';
import Svg, { Path } from 'react-native-svg';

import { Lockup } from '@/components/brand/lockup';

import { ProgressLine } from './progress-line';
import { StepCounter } from './step-counter';

type Props = {
  /** Arată butonul înapoi (implicit da). */
  back?: boolean;
  onBack?: () => void;
  /** Pasul curent și totalul; fără ele, nu apar contorul și linia de progres. */
  step?: number;
  total?: number;
};

/** Bara de sus din v8: înapoi în stânga, logo-ul centrat, contorul de pași în dreapta, linia de progres dedesubt. */
export function TopBar({ back = true, onBack, step, total }: Props) {
  const hasSteps = step != null && total != null;

  return (
    <View>
      <View className="h-12 flex-row items-center justify-between px-5">
        <View className="w-12">
          {back && (
            <Pressable
              accessibilityRole="button"
              accessibilityLabel="Înapoi"
              className="h-12 w-12 items-center justify-center"
              onPress={onBack ?? (() => router.back())}>
              <Svg width={20} height={20} viewBox="0 0 20 20" fill="none">
                <Path d="M12.5 4l-6 6 6 6" stroke="#0b2a52" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" />
              </Svg>
            </Pressable>
          )}
        </View>

        <Lockup />

        <View className="w-12 items-end">{hasSteps && <StepCounter step={step} total={total} />}</View>
      </View>

      {hasSteps && <ProgressLine step={step} total={total} className="mx-8 mt-2.5" />}
    </View>
  );
}
