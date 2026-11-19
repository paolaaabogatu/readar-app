import { Image, type ImageSourcePropType, View, useWindowDimensions } from 'react-native';

import { ReadarMark } from '@/components/readar/readar-mark';

type Props = {
  /** Fotografia din dreapta. */
  photo: ImageSourcePropType;
  /** Fotografia stă în dreapta (implicit) sau în stânga. */
  side?: 'right' | 'left';
};

// Proporțiile din Figma (ecran de 390 px): poză 240 × 318, simbol 196, simbolul la 58 px de sus
const BASE = 390;

/**
 * Simbolul Readar „jumătate-jumătate” (Onboarding v8): jumătatea de pe hârtie e indigo,
 * jumătatea care intră pe fotografie e crem.
 */
export function HeroSplit({ photo, side = 'right' }: Props) {
  const { width } = useWindowDimensions();
  const k = width / BASE;

  const photoW = 240 * k;
  const photoH = 318 * k;
  const markSize = 196 * k;
  const markTop = 58 * k;
  const edge = side === 'right' ? width - photoW : photoW; // marginea pozei
  const markLeft = edge - markSize / 2;

  return (
    <View style={{ height: photoH }} accessibilityElementsHidden importantForAccessibility="no-hide-descendants">
      {/* Simbolul pe hârtie */}
      <View style={{ position: 'absolute', top: markTop, left: markLeft }}>
        <ReadarMark size={markSize} />
      </View>

      {/* Fotografia, cu jumătatea de simbol care cade pe ea */}
      <View
        style={{
          position: 'absolute',
          top: 0,
          width: photoW,
          height: photoH,
          overflow: 'hidden',
          [side]: 0,
        }}>
        <Image source={photo} style={{ width: photoW, height: photoH }} resizeMode="cover" />
        <View style={{ position: 'absolute', top: markTop, left: markLeft - (side === 'right' ? edge : 0) }}>
          <ReadarMark size={markSize} color="#f4ede8" />
        </View>
      </View>
    </View>
  );
}
