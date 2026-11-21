import { router } from 'expo-router';

import { OnboardingScreen } from '@/components/onboarding';
import { ChipGroup } from '@/components/ui';
import { useOnboarding } from '@/context/onboarding-context';

const GENRES = ['Aventuri', 'Basme', 'Animale', 'Spațiu', 'Mistere', 'Benzi desenate', 'Prietenie', 'Natură', 'Istorie'];

/** Onboarding / 05 Ce-ți place (Figma v8): pasul 4 din 4. */
export function WhatYouLikePage() {
  const { genres, update } = useOnboarding();
  const next = () => router.push('/onboarding/well-done');

  return (
    <OnboardingScreen
      step={4}
      total={4}
      jp="すき"
      kicker="Preferințe"
      title="Ce-ți place să citești?"
      helper="Alege oricâte vrei."
      primary={{ label: 'Continuă', onPress: next, disabled: genres.length === 0 }}
      secondary={{ label: 'Sari peste', onPress: next }}>
      <ChipGroup options={GENRES} value={genres} onChange={(value) => update({ genres: value })} />
    </OnboardingScreen>
  );
}
