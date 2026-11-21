import type { ReactNode } from 'react';
import { ScrollView, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

type Props = {
  children?: ReactNode;
  /** Bară fixă deasupra conținutului (de exemplu <TopBar />). */
  header?: ReactNode;
  /** Conținut derulabil (implicit nu). */
  scroll?: boolean;
  /** Conținutul centrat pe ecran. */
  center?: boolean;
  /** Margini laterale de 24 px (implicit da). */
  padded?: boolean;
  className?: string;
};

/** Învelișul unei pagini: fundal hârtie, spațiu pentru notch și bara de jos, opțional derulare. */
export function Screen({ children, header, scroll = false, center = false, padded = true, className }: Props) {
  const insets = useSafeAreaInsets();
  const inner = `${padded ? 'px-6' : ''} ${center ? 'flex-1 items-center justify-center' : ''} ${className ?? ''}`;

  return (
    <View className="flex-1 bg-paper" style={{ paddingTop: insets.top }}>
      {header}
      {scroll ? (
        <ScrollView className="flex-1" contentContainerStyle={{ paddingBottom: insets.bottom + 48 }}>
          <View className={inner}>{children}</View>
        </ScrollView>
      ) : (
        <View className={`flex-1 ${inner}`} style={{ paddingBottom: insets.bottom }}>
          {children}
        </View>
      )}
    </View>
  );
}
