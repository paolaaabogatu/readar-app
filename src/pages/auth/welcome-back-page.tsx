import { router } from 'expo-router';
import { useRef, useState, type ComponentRef } from 'react';
import { TextInput } from 'react-native';

import { OnboardingScreen } from '@/components/onboarding';
import { TextField } from '@/components/ui';

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/** Auth / Intră (Figma v8 / 07): „Bine ai revenit!”, pentru cine are deja cont. */
export function WelcomeBackPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const passwordRef = useRef<ComponentRef<typeof TextInput>>(null);

  const valid = EMAIL.test(email.trim()) && password.length > 0;

  // Până avem autentificarea, intrarea duce direct în aplicație
  const signIn = () => router.replace('/home');

  return (
    <OnboardingScreen
      jp="おかえり"
      kicker="Cont existent"
      title="Bine ai revenit!"
      helper="Scrie emailul și parola ta."
      primary={{ label: 'Intră', onPress: signIn, disabled: !valid }}
      secondary={{ label: 'Am uitat parola', onPress: () => {} }}>
      <TextField
        label="Emailul tău"
        value={email}
        onChangeText={setEmail}
        placeholder="ana@email.ro"
        keyboardType="email-address"
        autoCapitalize="none"
        autoCorrect={false}
        autoComplete="email"
        textContentType="username"
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
        autoComplete="current-password"
        textContentType="password"
        returnKeyType="go"
        onSubmitEditing={() => valid && signIn()}
        className="mt-4"
      />
    </OnboardingScreen>
  );
}
