import { Ionicons } from '@expo/vector-icons';
import { Pressable, type PressableProps } from 'react-native';

export type SocialProvider = 'apple' | 'google' | 'facebook';

const PROVIDERS: Record<SocialProvider, { icon: keyof typeof Ionicons.glyphMap; label: string }> = {
  apple: { icon: 'logo-apple', label: 'Continuă cu Apple' },
  google: { icon: 'logo-google', label: 'Continuă cu Google' },
  facebook: { icon: 'logo-facebook', label: 'Continuă cu Facebook' },
};

type Props = Omit<PressableProps, 'children'> & {
  provider: SocialProvider;
  className?: string;
};

/** Butonul de conectare cu Apple, Google sau Facebook (doar iconul, cu etichetă pentru accesibilitate). */
export function SocialButton({ provider, className, ...rest }: Props) {
  const p = PROVIDERS[provider];

  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={p.label}
      className={`h-[52px] flex-1 items-center justify-center rounded-2xl border border-line bg-paper-raised active:opacity-70 ${className ?? ''}`}
      {...rest}>
      <Ionicons name={p.icon} size={20} color="#0b2a52" />
    </Pressable>
  );
}
