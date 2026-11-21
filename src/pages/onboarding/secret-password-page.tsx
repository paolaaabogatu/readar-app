import { router } from 'expo-router';
import { useRef, useState, type ComponentRef } from 'react';
import { TextInput, View } from 'react-native';

import { OnboardingScreen } from '@/components/onboarding';
import { ChecklistItem, TextField } from '@/components/ui';
import { useOnboarding } from '@/context/onboarding-context';

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/** Onboarding / 04 Parolă (Figma v8): pasul 3 din 4. */
export function SecretPasswordPage() {
  const { email, update } = useOnboarding();
  const [password, setPassword] = useState('');
  const [emailTouched, setEmailTouched] = useState(false);
  const passwordRef = useRef<ComponentRef<typeof TextInput>>(null);

  const emailValid = EMAIL.test(email.trim());
  const hasLength = password.length >= 8;
  const hasDigit = /\d/.test(password);
  const valid = emailValid && hasLength && hasDigit;

  const next = () => router.push('/onboarding/what-you-like');

  return (
    <OnboardingScreen
      step={3}
      total={4}
      jp="あいことば"
      kicker="Parolă"
      title="Alege o parolă secretă."
      helper="Doar tu o știi. Atinge ochiul ca s-o vezi."
      primary={{ label: 'Continuă', onPress: next, disabled: !valid }}>
      <TextField
        label="Emailul tău"
        value={email}
        onChangeText={(text) => update({ email: text })}
        onBlur={() => setEmailTouched(true)}
        error={emailTouched && email.length > 0 && !emailValid ? 'Adresa de email nu pare completă.' : undefined}
        placeholder="ana@email.ro"
        keyboardType="email-address"
        autoCapitalize="none"
        autoCorrect={false}
        autoComplete="email"
        textContentType="emailAddress"
        returnKeyType="next"
        submitBehavior="submit"
        onSubmitEditing={() => passwordRef.current?.focus()}
      />

      <TextField
        ref={passwordRef}
        label="Parola"
        value={password}
        onChangeText={setPassword}
        secureToggle
        autoCapitalize="none"
        autoCorrect={false}
        autoComplete="new-password"
        textContentType="newPassword"
        passwordRules="minlength: 8; required: digit;"
        returnKeyType="done"
        onSubmitEditing={() => valid && next()}
        className="mt-4"
      />

      <View className="mt-6 gap-2">
        <ChecklistItem label="Cel puțin 8 litere" done={hasLength} />
        <ChecklistItem label="Măcar o cifră" done={hasDigit} />
      </View>
    </OnboardingScreen>
  );
}
