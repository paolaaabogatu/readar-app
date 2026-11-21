import type { ReactNode } from 'react';
import { KeyboardAvoidingView, Platform, ScrollView, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { Button, H2, Kicker, Paragraph, SecondaryLink, type ButtonProps } from '@/components/ui';

import { TopBar } from './top-bar';

type Props = {
  /** Pasul curent și totalul (contor + linie de progres). Fără ele, nu apar. */
  step?: number;
  total?: number;
  /** Butonul înapoi din top bar (implicit da). */
  back?: boolean;
  /** Cuvântul japonez din kicker, scris în kana (de exemplu なまえ). */
  jp?: string;
  /** Eticheta din kicker („Nume”). */
  kicker: string;
  title: string;
  helper?: string;
  /** Conținutul ecranului (câmpuri, alegeri, ilustrație). */
  children?: ReactNode;
  /** Conținutul fără margini laterale (pentru imagini până la margine). */
  bleed?: boolean;
  /** Butonul principal, mereu în același loc. */
  primary: Pick<ButtonProps, 'label' | 'onPress' | 'disabled' | 'loading'>;
  /** Acțiunea secundară de sub buton, opțional. */
  secondary?: { label: string; onPress: () => void };
  /** Conținut sub acțiunea secundară (de exemplu adresa site-ului). */
  footer?: ReactNode;
};

/**
 * Șablonul ecranelor de onboarding din Figma v8: zone fixe, în aceeași ordine pe fiecare ecran
 * (top bar, kicker, titlu, helper, conținut, buton principal, acțiune secundară), ca să nu „sară” nimic între pași.
 */
export function OnboardingScreen({
  step,
  total,
  back = true,
  jp,
  kicker,
  title,
  helper,
  children,
  bleed = false,
  primary,
  secondary,
  footer,
}: Props) {
  const insets = useSafeAreaInsets();

  return (
    <KeyboardAvoidingView
      className="flex-1 bg-paper"
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      style={{ paddingTop: insets.top + 8 }}>
      <TopBar back={back} step={step} total={total} />

      <ScrollView className="flex-1" keyboardShouldPersistTaps="handled" contentContainerClassName="flex-grow">
        <View className="mt-9 px-8">
          <Kicker jp={jp} label={kicker} />
          <H2 className="mt-2.5">{title}</H2>
          {helper && (
            <Paragraph size="sm" tone="muted" className="mt-2.5 max-w-[300px]">
              {helper}
            </Paragraph>
          )}
        </View>

        <View className={`mt-6 ${bleed ? '' : 'px-8'}`}>{children}</View>
      </ScrollView>

      <View className="px-8 pt-4" style={{ paddingBottom: insets.bottom + 12 }}>
        <Button size="lg" arrowCircle {...primary} />
        <View className="h-11 justify-center">
          {secondary && <SecondaryLink label={secondary.label} onPress={secondary.onPress} />}
        </View>
        {footer}
      </View>
    </KeyboardAvoidingView>
  );
}
