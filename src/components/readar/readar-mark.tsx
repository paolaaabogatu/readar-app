import Svg, { Path } from 'react-native-svg';

const PETAL = 'M0-4C-9-19-20-34-20-54V-85H20V-54C20-34 9-19 0-4Z';

type Props = {
  size?: number;
  color?: string;
  foldColor?: string;
};

/** Simbolul Readar: floarea sakura cu colțul paginii îndoit. */
export function ReadarMark({ size = 64, color = '#0b2a52', foldColor = '#d98484' }: Props) {
  return (
    <Svg width={size} height={(size * 172) / 180} viewBox="-90 -88 180 172">
      <Path d="M0-4C-9-19-20-34-20-54V-85H6L20-71V-54C20-34 9-19 0-4Z" fill={color} />
      {[72, 144, 216, 288].map((angle) => (
        <Path key={angle} d={PETAL} fill={color} transform={`rotate(${angle})`} />
      ))}
      <Path d="M6-85 20-71H6Z" fill={foldColor} />
    </Svg>
  );
}
