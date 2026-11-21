import { Text, type TextProps } from 'react-native';

type Size = 'sm' | 'md';
type Tone = 'kinako' | 'muted' | 'on-brand';

export type JpProps = TextProps & {
  /** sm = 11 px (kicker), md = 16 px (sub logo). Implicit sm. */
  size?: Size;
  tone?: Tone;
  className?: string;
};

const SIZES: Record<Size, string> = {
  sm: 'text-[11px] tracking-[2.64px]',
  md: 'text-body tracking-[6px]',
};

const TONES: Record<Tone, string> = {
  kinako: 'text-kinako-ink',
  muted: 'text-ink-muted',
  'on-brand': 'text-on-brand',
};

/**
 * Text japonez decorativ (Noto Serif JP). Scrie-l în kana (ようこそ, なまえ, いりぐち, リーダー),
 * nu cu kanji, ca să nu pară chinezesc. Marcat cu lang="ja" pentru cititoarele de ecran.
 */
export function Jp({ size = 'sm', tone = 'kinako', className, ...rest }: JpProps) {
  return <Text lang="ja" className={`font-jp ${SIZES[size]} ${TONES[tone]} ${className ?? ''}`} {...rest} />;
}
