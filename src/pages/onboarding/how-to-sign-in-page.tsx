import { router } from 'expo-router';

import { ChoiceList, OnboardingScreen, type ChoiceOption } from '@/components/onboarding';
import { useOnboarding, type SignInMethod } from '@/context/onboarding-context';

const METHODS: ChoiceOption<SignInMethod>[] = [
  { id: 'email', title: 'Cu emailul', subtitle: 'Îți alegi o parolă', icon: 'mail-outline' },
  { id: 'apple', title: 'Cu Apple', icon: 'logo-apple' },
  { id: 'google', title: 'Cu Google', icon: 'logo-google' },
];

/** Onboarding / 03 Cum intri (Figma v8): pasul 2 din 4. */
export function HowToSignInPage() {
  const { method, update } = useOnboarding();

  // Cu emailul urmează parola; cu Apple sau Google, direct preferințele
  const next = () => router.push(method === 'email' ? '/onboarding/secret-password' : '/onboarding/what-you-like');

  return (
    <OnboardingScreen
      step={2}
      total={4}
      jp="いりぐち"
      kicker="Intrare"
      title="Cum vrei să intri?"
      helper="Alege un singur drum. Îl poți schimba oricând."
      primary={{ label: 'Continuă', onPress: next }}
      secondary={{ label: '', onPress: () => {} }}>
      <ChoiceList options={METHODS} value={method} onChange={(id) => update({ method: id })} />
    </OnboardingScreen>
  );
}
