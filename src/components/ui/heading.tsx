import { Text, type TextProps } from 'react-native';

type Level = 1 | 2 | 3;
type Tone = 'ink' | 'muted' | 'on-brand';

export type HeadingProps = TextProps & {
  /** Nivelul titlului: 1 = cel mai mare. Implicit 1. */
  level?: Level;
  /** Culoarea: ink (implicit), muted sau on-brand (pe fundal indigo). */
  tone?: Tone;
  /** Clase Tailwind în plus, adăugate după cele implicite. */
  className?: string;
};

// Stilurile fiecărui nivel, într-un singur loc
const LEVELS: Record<Level, string> = {
  1: 'font-display text-h1',
  2: 'font-display text-h2',
  3: 'font-display-semibold text-h3',
};

const TONES: Record<Tone, string> = {
  ink: 'text-ink',
  muted: 'text-ink-muted',
  'on-brand': 'text-on-brand',
};

/**
 * Titlu Readar (EB Garamond). Cititoarele de ecran îl anunță ca titlu.
 *
 * <Heading level={1}>Bine ai revenit.</Heading>
 * <H2 tone="muted">Raftul tău</H2>
 */
export function Heading({ level = 1, tone = 'ink', className, ...rest }: HeadingProps) {
  return (
    <Text
      accessibilityRole="header"
      maxFontSizeMultiplier={1.4}
      className={`${LEVELS[level]} ${TONES[tone]} ${className ?? ''}`}
      {...rest}
    />
  );
}

export const H1 = (props: Omit<HeadingProps, 'level'>) => <Heading level={1} {...props} />;
export const H2 = (props: Omit<HeadingProps, 'level'>) => <Heading level={2} {...props} />;
export const H3 = (props: Omit<HeadingProps, 'level'>) => <Heading level={3} {...props} />;
