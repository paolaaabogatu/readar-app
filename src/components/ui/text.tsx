import { Text as RNText, type TextProps } from 'react-native';

/**
 * Textul de bază Readar: Inter, 16/25.6, culoarea ink.
 * Folosește-l în loc de Text din react-native, ca fontul să fie același peste tot.
 * Clasele primite prin className se adaugă după cele implicite și le pot suprascrie.
 */
export function Text({ className, ...rest }: TextProps & { className?: string }) {
  return <RNText className={`font-sans text-body text-ink ${className ?? ''}`} {...rest} />;
}
