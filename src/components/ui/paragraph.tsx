import { Text, type TextProps } from 'react-native';

type Size = 'md' | 'sm';
type Tone = 'ink' | 'muted' | 'on-brand';

export type ParagraphProps = TextProps & {
  /** md = text obișnuit 16/1.6 (implicit), sm = text explicativ 14/1.85. */
  size?: Size;
  /** Culoarea: ink (implicit), muted sau on-brand (pe fundal indigo). */
  tone?: Tone;
  /** Clase Tailwind în plus, adăugate după cele implicite. */
  className?: string;
};

const SIZES: Record<Size, string> = {
  md: 'font-sans text-body',
  sm: 'font-sans text-helper',
};

const TONES: Record<Tone, string> = {
  ink: 'text-ink',
  muted: 'text-ink-muted',
  'on-brand': 'text-on-brand',
};

/**
 * Paragraf Readar (Inter).
 *
 * <Paragraph>Un raft liniștit pentru cărțile tale.</Paragraph>
 * <Paragraph size="sm" tone="muted">Doar tu o știi.</Paragraph>
 */
export function Paragraph({ size = 'md', tone = 'ink', className, ...rest }: ParagraphProps) {
  return <Text className={`${SIZES[size]} ${TONES[tone]} ${className ?? ''}`} {...rest} />;
}
