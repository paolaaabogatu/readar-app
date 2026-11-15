import { StatusBar } from 'expo-status-bar';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect, useState } from 'react';
import { StyleSheet, Text, View, useWindowDimensions } from 'react-native';
import Animated, {
  Easing,
  useAnimatedStyle,
  useReducedMotion,
  useSharedValue,
  withDelay,
  withTiming,
} from 'react-native-reanimated';
import Svg, { Path } from 'react-native-svg';
import { scheduleOnRN } from 'react-native-worklets';

/**
 * Splash-ul animat Readar: aceeași animație ca preloader-ul de pe readar-site.
 * Petalele se rotesc și apar pe rând, colțul paginii se îndoaie, apar numele și リーダー,
 * bara se umple, apoi ecranul dispare.
 */

const INDIGO = '#0b2a52';
const PAPER = '#f3ebe5';
const FOLD = '#d68c93';

const VIEW_BOX = '-90 -88 180 172';
const PETAL = 'M0-4C-9-19-20-34-20-54V-85H20V-54C20-34 9-19 0-4Z';
const FIRST_PETAL = 'M0-4C-9-19-20-34-20-54V-85H6L20-71V-54C20-34 9-19 0-4Z';
const FOLD_PATH = 'M6-85 20-71H6Z';

const turnEase = Easing.bezier(0.65, 0, 0.35, 1);
const appearEase = Easing.out(Easing.ease);
const riseEase = Easing.bezier(0.22, 1, 0.36, 1);
const fillEase = Easing.bezier(0.16, 1, 0.3, 1);
const exitEase = Easing.bezier(0.7, 0, 0.84, 0);

const clamp = (min: number, value: number, max: number) => Math.min(Math.max(value, min), max);

function Petal({ index, size }: { index: number; size: { width: number; height: number } }) {
  const opacity = useSharedValue(0);

  useEffect(() => {
    opacity.value = withDelay(index * 110, withTiming(1, { duration: 550, easing: appearEase }));
  }, [index, opacity]);

  const style = useAnimatedStyle(() => ({ opacity: opacity.value }));

  return (
    <Animated.View style={[StyleSheet.absoluteFill, style]}>
      <Svg width={size.width} height={size.height} viewBox={VIEW_BOX}>
        {index === 0 ? (
          <Path d={FIRST_PETAL} fill={PAPER} />
        ) : (
          <Path d={PETAL} fill={PAPER} transform={`rotate(${index * 72})`} />
        )}
      </Svg>
    </Animated.View>
  );
}

export function ReadarSplash() {
  const { width: screenW, height: screenH } = useWindowDimensions();
  const reduceMotion = useReducedMotion();
  const [visible, setVisible] = useState(true);
  const [started, setStarted] = useState(false);

  // Dimensiuni ca în preloader: simbol clamp(7rem, 20vh, 11.25rem)
  const markW = clamp(112, screenH * 0.2, 180);
  const markH = (markW * 172) / 180;
  const wordmarkSize = clamp(36, screenH * 0.055, 50);
  const jpSize = clamp(12, screenH * 0.02, 18);
  const progressW = clamp(128, screenW * 0.52, 204);

  const turn = useSharedValue(-72);
  const fold = useSharedValue(0);
  const wordmark = useSharedValue(0);
  const jp = useSharedValue(0);
  const loading = useSharedValue(0);
  const fill = useSharedValue(0);
  const exit = useSharedValue(1);

  useEffect(() => {
    if (!started) return;

    const finish = () => setVisible(false);

    if (reduceMotion) {
      turn.value = 0;
      fold.value = 1;
      wordmark.value = 1;
      jp.value = 1;
      loading.value = 1;
      fill.value = 1;
      exit.value = withDelay(600, withTiming(0, { duration: 300 }, (done) => {
        if (done) scheduleOnRN(finish);
      }));
      return;
    }

    turn.value = withTiming(0, { duration: 1300, easing: turnEase });
    fold.value = withDelay(1150, withTiming(1, { duration: 450, easing: appearEase }));
    wordmark.value = withDelay(1350, withTiming(1, { duration: 600, easing: riseEase }));
    jp.value = withDelay(1600, withTiming(1, { duration: 600, easing: appearEase }));
    loading.value = withDelay(1600, withTiming(1, { duration: 450, easing: appearEase }));
    fill.value = withDelay(1650, withTiming(1, { duration: 1450, easing: fillEase }));
    exit.value = withDelay(
      3100,
      withTiming(0, { duration: 900, easing: exitEase }, (done) => {
        if (done) scheduleOnRN(finish);
      }),
    );
  }, [started, reduceMotion, turn, fold, wordmark, jp, loading, fill, exit]);

  const rootStyle = useAnimatedStyle(() => ({ opacity: exit.value }));
  const turnStyle = useAnimatedStyle(() => ({ transform: [{ rotate: `${turn.value}deg` }] }));
  const foldStyle = useAnimatedStyle(() => ({ transform: [{ scaleX: fold.value }] }));
  const wordmarkStyle = useAnimatedStyle(() => ({
    opacity: wordmark.value,
    transform: [{ translateY: (1 - wordmark.value) * 10 }],
  }));
  const jpStyle = useAnimatedStyle(() => ({ opacity: jp.value }));
  const loadingStyle = useAnimatedStyle(() => ({ opacity: loading.value }));
  const fillStyle = useAnimatedStyle(() => ({ transform: [{ scaleX: fill.value }] }));

  if (!visible) return null;

  // Punctul din care se îndoaie colțul (6, -71) în coordonatele viewBox-ului
  const foldOrigin = `${((6 + 90) / 180) * markW}px ${((-71 + 88) / 172) * markH}px`;

  return (
    <Animated.View
      pointerEvents="none"
      style={[styles.root, rootStyle]}
      onLayout={() => {
        if (started) return;
        SplashScreen.hideAsync().finally(() => setStarted(true));
      }}>
      <StatusBar style="light" />

      <View style={[styles.brand, { top: screenH * 0.328 }]}>
        <View style={{ width: markW, height: markH }}>
          <Animated.View style={[StyleSheet.absoluteFill, turnStyle]}>
            {[0, 1, 2, 3, 4].map((i) => (
              <Petal key={i} index={i} size={{ width: markW, height: markH }} />
            ))}
            <Animated.View
              style={[StyleSheet.absoluteFill, { transformOrigin: foldOrigin }, foldStyle]}>
              <Svg width={markW} height={markH} viewBox={VIEW_BOX}>
                <Path d={FOLD_PATH} fill={FOLD} />
              </Svg>
            </Animated.View>
          </Animated.View>
        </View>

        <Animated.Text
          style={[
            styles.wordmark,
            { fontSize: wordmarkSize, marginTop: clamp(26, screenH * 0.055, 50) },
            wordmarkStyle,
          ]}>
          Readar
        </Animated.Text>

        <Animated.Text
          style={[
            styles.japanese,
            { fontSize: jpSize, letterSpacing: jpSize * 0.58, paddingLeft: jpSize * 0.58 },
            { marginTop: clamp(14, screenH * 0.031, 28) },
            jpStyle,
          ]}>
          リーダー
        </Animated.Text>
      </View>

      <Animated.View style={[styles.loading, { top: screenH * 0.818 }, loadingStyle]}>
        <View style={[styles.track, { width: progressW }]}>
          <Animated.View style={[styles.fill, fillStyle]} />
        </View>
        <Text style={styles.loadingText}>Se pregătește raftul tău</Text>
      </Animated.View>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  root: {
    ...StyleSheet.absoluteFill,
    zIndex: 1000,
    backgroundColor: INDIGO,
  },
  brand: {
    position: 'absolute',
    left: 0,
    right: 0,
    alignItems: 'center',
  },
  wordmark: {
    fontFamily: 'EBGaramond_400Regular',
    color: PAPER,
  },
  japanese: {
    fontFamily: 'NotoSerifJP_500Medium',
    color: PAPER,
  },
  loading: {
    position: 'absolute',
    left: 0,
    right: 0,
    alignItems: 'center',
    gap: 14,
    paddingHorizontal: 12,
  },
  track: {
    height: 1,
    overflow: 'hidden',
    backgroundColor: 'rgba(243, 235, 229, 0.28)',
  },
  fill: {
    flex: 1,
    backgroundColor: PAPER,
    transformOrigin: 'left',
  },
  loadingText: {
    fontFamily: 'Inter_400Regular',
    fontSize: 11,
    letterSpacing: 11 * 0.38,
    textTransform: 'uppercase',
    color: PAPER,
  },
});
