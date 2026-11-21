import { Text, type TextProps } from 'react-native';

type Props = TextProps & {
  className?: string;
};

/** Sloganul Readar, cu italice roz: „Citește. Respiră. Înflorește.” */
export function Tagline({ className, children = 'Citește. Respiră. Înflorește.', ...rest }: Props) {
  return (
    <Text className={`font-display-italic text-h3 text-momiji ${className ?? ''}`} {...rest}>
      {children}
    </Text>
  );
}
