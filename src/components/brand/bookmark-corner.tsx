import Svg, { Path } from 'react-native-svg';

type Props = {
  size?: number;
};

/** Colțul de pagină îndoit, ca un semn de carte: momiji în față, hârtie în spate. */
export function BookmarkCorner({ size = 40 }: Props) {
  return (
    <Svg width={size} height={size} viewBox="0 0 40 40" accessibilityElementsHidden importantForAccessibility="no-hide-descendants">
      <Path d="M0 0H40V40Z" fill="#fbf8f5" />
      <Path d="M0 0L40 40H0Z" fill="#d98484" />
    </Svg>
  );
}
