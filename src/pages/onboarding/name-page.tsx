import { router, type Href } from 'expo-router';

import { OnboardingScreen } from '@/components/onboarding';
import { TextField } from '@/components/ui';
import { useOnboarding } from '@/context/onboarding-context';

export function NamePage() {
  const { name, update } = useOnboarding();
  const valid = name.trim().length > 0;

  const next = () => router.push('/onboarding/method' as Href);

  return (
    <OnboardingScreen
      step={1}
      total={4}
      jp="なまえ"
      kicker="Nume"
      title="Cum te cheamă?"
      helper="Așa o să te salutăm, în fiecare zi."
      primary={{ label: 'Continuă', onPress: next, disabled: !valid }}>
      <TextField
        label="Prenumele tău"
        value={name}
        onChangeText={(text) => update({ name: text })}
        placeholder="Ana"
        autoFocus
        autoCapitalize="words"
        autoComplete="given-name"
        textContentType="givenName"
        returnKeyType="next"
        onSubmitEditing={() => valid && next()}
      />
    </OnboardingScreen>
  );
}
