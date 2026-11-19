import { createContext, useContext, useState, type ReactNode } from 'react';

export type SignInMethod = 'email' | 'apple' | 'google';

type OnboardingState = {
  name: string;
  method: SignInMethod;
  genres: string[];
};

type OnboardingContextValue = OnboardingState & {
  update: (patch: Partial<OnboardingState>) => void;
};

const OnboardingContext = createContext<OnboardingContextValue | null>(null);

/** Ține minte ce alege utilizatorul pe parcursul onboarding-ului (nume, metodă, genuri). */
export function OnboardingProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<OnboardingState>({ name: '', method: 'email', genres: [] });

  return (
    <OnboardingContext.Provider value={{ ...state, update: (patch) => setState((s) => ({ ...s, ...patch })) }}>
      {children}
    </OnboardingContext.Provider>
  );
}

export function useOnboarding() {
  const value = useContext(OnboardingContext);
  if (!value) throw new Error('useOnboarding trebuie folosit în interiorul OnboardingProvider');
  return value;
}
