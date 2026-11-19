import { ActivityIndicator, Pressable, Text, View, type PressableProps } from 'react-native';
import Svg, { Path } from 'react-native-svg';

/**
 * Variantele din Figma (Design System → „Button — variant × state”):
 * - primary:   pastilă indigo; apăsat → albastru Ori
 * - secondary: contur indigo; apăsat → plin indigo
 * - link:      doar text; apăsat → subliniat
 * În plus față de Figma:
 * - danger:    acțiuni distructive sau erori (momiji închis)
 * - inverse:   pentru fundal indigo (ecranul de noapte)
 */
export type ButtonVariant = 'primary' | 'secondary' | 'link' | 'danger' | 'inverse';
export type ButtonSize = 'md' | 'lg';

export type ButtonProps = Omit<PressableProps, 'children' | 'style'> & {
  label: string;
  variant?: ButtonVariant;
  /** md = 52 px (implicit), lg = 56 px, pe toată lățimea (butonul principal din Onboarding). */
  size?: ButtonSize;
  /** Săgeata „→” după text, ca în Figma. */
  arrow?: boolean;
  /** Săgeata într-un cerc, în dreapta (stilul Onboarding). Doar pentru size="lg". */
  arrowCircle?: boolean;
  /** Arată un indicator de încărcare și blochează apăsarea. */
  loading?: boolean;
  className?: string;
};

type Look = { box: string; text: string; icon: string };

const COLORS = {
  indigo: '#0b2a52',
  ori: '#2f5d93',
  paper: '#f4ede8',
  momijiInk: '#a3474d',
  momijiDark: '#87363c',
};

// Aspectul fiecărei variante: [normal, apăsat]
const LOOKS: Record<ButtonVariant, [Look, Look]> = {
  primary: [
    { box: 'bg-indigo', text: 'text-on-brand', icon: COLORS.paper },
    { box: 'bg-fold', text: 'text-on-brand', icon: COLORS.paper },
  ],
  secondary: [
    { box: 'border border-ink bg-transparent', text: 'text-ink', icon: COLORS.indigo },
    { box: 'border border-ink bg-indigo', text: 'text-on-brand', icon: COLORS.paper },
  ],
  link: [
    { box: 'bg-transparent', text: 'text-ink', icon: COLORS.indigo },
    { box: 'bg-transparent', text: 'text-ink underline', icon: COLORS.indigo },
  ],
  danger: [
    { box: 'bg-momiji-ink', text: 'text-on-brand', icon: COLORS.paper },
    { box: 'bg-[#87363c]', text: 'text-on-brand', icon: COLORS.paper },
  ],
  inverse: [
    { box: 'bg-paper', text: 'text-ink', icon: COLORS.indigo },
    { box: 'bg-sakura', text: 'text-ink', icon: COLORS.indigo },
  ],
};

function Arrow({ color, size = 14 }: { color: string; size?: number }) {
  return (
    <Svg width={size} height={size} viewBox="0 0 14 14" fill="none">
      <Path d="M1 7h12M8 2l5 5-5 5" stroke={color} strokeWidth={1.4} strokeLinecap="round" strokeLinejoin="round" />
    </Svg>
  );
}

/**
 * Butonul Readar.
 *
 * <Button label="Începe să citești" arrow />
 * <Button label="Vezi biblioteca" variant="secondary" />
 * <Button label="Citește povestea" variant="link" />
 * <Button label="Șterge contul" variant="danger" />
 * <Button label="Continuă" size="lg" arrowCircle loading={saving} />
 */
export function Button({
  label,
  variant = 'primary',
  size = 'md',
  arrow = false,
  arrowCircle = false,
  loading = false,
  disabled,
  className,
  ...rest
}: ButtonProps) {
  const isLink = variant === 'link';
  const blocked = !!disabled || loading;
  const [normal] = LOOKS[variant];

  return (
    <Pressable
      accessibilityRole={isLink ? 'link' : 'button'}
      accessibilityLabel={label}
      accessibilityState={{ disabled: blocked, busy: loading }}
      disabled={blocked}
      hitSlop={isLink ? 10 : undefined}
      {...rest}>
      {({ pressed }) => {
        const look = pressed && !blocked ? LOOKS[variant][1] : normal;
        const shape = isLink
          ? 'self-start py-1'
          : size === 'lg'
            ? `h-14 w-full rounded-full ${arrowCircle ? 'justify-between pl-6 pr-2' : 'justify-center px-6'}`
            : 'h-[52px] self-start rounded-full justify-center px-[26px]';

        return (
          <View
            className={`flex-row items-center gap-2 ${shape} ${look.box} ${blocked ? 'opacity-40' : ''} ${className ?? ''}`}>
            {loading && !arrowCircle && <ActivityIndicator size="small" color={look.icon} />}
            <Text className={`font-sans-medium text-[15px] tracking-[0.3px] ${look.text}`}>{label}</Text>
            {arrow && !arrowCircle && !loading && <Arrow color={look.icon} />}
            {arrowCircle && size === 'lg' && (
              <View
                className={`h-10 w-10 items-center justify-center rounded-full ${variant === 'inverse' ? 'bg-indigo' : 'bg-paper'}`}>
                {loading ? (
                  <ActivityIndicator size="small" color={variant === 'inverse' ? COLORS.paper : COLORS.indigo} />
                ) : (
                  <Arrow color={variant === 'inverse' ? COLORS.paper : COLORS.indigo} />
                )}
              </View>
            )}
          </View>
        );
      }}
    </Pressable>
  );
}
