import { router } from 'expo-router';
import { Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { HeroSplit } from '@/components/brand/hero-split';
import { Lockup } from '@/components/brand/lockup';
import { Button, H2, Kicker, Paragraph, SecondaryLink } from '@/components/ui';

/**
 * Auth / Welcome, după Figma „Onboarding v8 — half-half mark, brand-safe” → „v8 / 01 Salut”.
 * Zonele fixe din v8: top bar, kicker, titlu, helper, conținut, buton principal, acțiune secundară.
 */
export function AuthWelcomePage() {
  const insets = useSafeAreaInsets();

  // Până avem autentificarea, butoanele duc în aplicație
  const continueToApp = () => router.replace('/home');

  return (
    <View className="flex-1 bg-paper" style={{ paddingTop: insets.top + 8, paddingBottom: insets.bottom + 8 }}>
      {/* Top bar */}
      <View className="h-12 items-center justify-center">
        <Lockup />
      </View>

      <View className="mt-11 px-8">
        <Kicker jp="ようこそ" label="Bine ai venit" />
        <H2 className="mt-2.5">{'Salut!\nHai să citim.'}</H2>
        <Paragraph size="sm" tone="muted" className="mt-2.5 max-w-[300px]">
          Un raft liniștit, făcut pentru tine. Patru pași mici.
        </Paragraph>
      </View>

      {/* Conținut: simbolul jumătate pe hârtie, jumătate pe fotografie */}
      <View className="mt-6">
        <HeroSplit photo={require('@/assets/images/auth-welcome.jpg')} />
      </View>

      <View className="flex-1" />

      <View className="px-8">
        <Button label="Începe" size="lg" arrowCircle onPress={() => router.push('/onboarding/name')} />
        <SecondaryLink label="Am deja cont" className="mt-5" onPress={continueToApp} />

        <Text className="mt-4 text-center font-sans-medium text-[9px] uppercase tracking-[2.5px] text-ink-muted">
          readar.app
        </Text>

        {__DEV__ && (
          <Text
            accessibilityRole="link"
            className="mt-2 text-center font-sans text-caption text-ink-whisper"
            onPress={() => router.push('/components')}>
            Componente (dev)
          </Text>
        )}
      </View>
    </View>
  );
}
