import { Text, type TextProps } from 'react-native';

type Tone = 'fold' | 'muted' | 'whisper';

export type TextLinkProps = TextProps & {
  /** fold = albastru (implicit), muted = gri, whisper = foarte discret. */
  tone?: Tone;
  className?: string;
};

const TONES: Record<Tone, string> = {
  fold: 'font-sans-semibold text-fold',
  muted: 'font-sans text-ink-muted underline',
  whisper: 'font-sans text-ink-whisper',
};

/** Link în text („Nu ai cont? Creează unul”). Se poate pune și în interiorul altui Text. */
export function TextLink({ tone = 'fold', className, ...rest }: TextLinkProps) {
  return <Text accessibilityRole="link" suppressHighlighting className={`text-caption ${TONES[tone]} ${className ?? ''}`} {...rest} />;
}
