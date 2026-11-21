import { Text, type TextProps } from 'react-native';

type Size = 'xs' | 'sm' | 'md';
type Tone = 'ink' | 'muted' | 'kinako' | 'on-brand';

export type LabelProps = TextProps & {
  /** xs = 9 px (subsol), sm = 10 px (etichete de câmp, kicker), md = 12 px (capsule). Implicit sm. */
  size?: Size;
  tone?: Tone;
  className?: string;
};

const SIZES: Record<Size, string> = {
  xs: 'text-[9px] tracking-[2.5px]',
  sm: 'text-[10px] tracking-[2.4px]',
  md: 'text-label',
};

const TONES: Record<Tone, string> = {
  ink: 'text-ink',
  muted: 'text-ink-muted',
  kinako: 'text-kinako-ink',
  'on-brand': 'text-on-brand',
};

/** Etichetă mică, cu majuscule rare („BINE AI VENIT”, „READAR.APP”, „PRENUMELE TĂU”). */
export function Label({ size = 'sm', tone = 'muted', className, ...rest }: LabelProps) {
  return <Text className={`font-sans-medium uppercase ${SIZES[size]} ${TONES[tone]} ${className ?? ''}`} {...rest} />;
}
