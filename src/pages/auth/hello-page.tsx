import { router } from 'expo-router';

import { HeroSplit } from '@/components/brand';
import { DevLink } from '@/components/dev';
import { OnboardingScreen } from '@/components/onboarding';
import { Label } from '@/components/ui';

/**
 * Auth / Welcome, după Figma „Onboarding v8 — half-half mark, brand-safe” → „v8 / 01 Salut”.
 */
export function HelloPage() {
  return (
    <OnboardingScreen
      back={false}
      jp="ようこそ"
      kicker="Bine ai venit"
      title={'Salut!\nHai să citim.'}
      helper="Un raft liniștit, făcut pentru tine. Patru pași mici."
      bleed
      primary={{ label: 'Începe', onPress: () => router.push('/onboarding/whats-your-name') }}
      secondary={{ label: 'Am deja cont', onPress: () => router.push('/welcome-back') }}
      footer={
        <>
          <Label size="xs" className="text-center">
            readar.app
          </Label>
          <DevLink label="Componente (dev)" href="/components" className="mt-2" />
        </>
      }>
      <HeroSplit photo={require('@/assets/images/auth-welcome.jpg')} />
    </OnboardingScreen>
  );
}
