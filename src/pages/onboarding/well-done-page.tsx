import { router } from 'expo-router';

import { HeroSplit } from '@/components/brand';
import { OnboardingScreen } from '@/components/onboarding';
import { useOnboarding } from '@/context/onboarding-context';

/** Onboarding / 06 Gata (Figma v8): finalul, cu numele ales la pasul 1. */
export function WellDonePage() {
  const { name } = useOnboarding();
  const firstName = name.trim();

  return (
    <OnboardingScreen
      back={false}
      step={4}
      total={4}
      jp="はじまり"
      kicker="Gata"
      title={firstName ? `Bravo, ${firstName}!` : 'Bravo!'}
      helper="Raftul tău e pregătit. Prima poveste te așteaptă."
      bleed
      // replace: după onboarding nu se mai poate reveni cu „înapoi”
      primary={{ label: 'Începe să citești', onPress: () => router.replace('/home') }}>
      <HeroSplit photo={require('@/assets/images/onboarding-done.jpg')} side="left" />
    </OnboardingScreen>
  );
}
