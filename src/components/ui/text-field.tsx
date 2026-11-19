import { Ionicons } from '@expo/vector-icons';
import { forwardRef, useState, type ComponentRef } from 'react';
import { Pressable, Text, TextInput, View, type TextInputProps } from 'react-native';

export type TextFieldProps = TextInputProps & {
  /** Eticheta de deasupra, afișată cu majuscule mici („EMAILUL TĂU”). */
  label: string;
  /** Mesaj de eroare sub câmp; colorează linia în roșu. */
  error?: string;
  /** Text de ajutor sub câmp, când nu e eroare. */
  hint?: string;
  /** Câmp de parolă, cu butonul de ochi pentru afișare. */
  secureToggle?: boolean;
  className?: string;
};

/**
 * Câmpul de text din v8: fără chenar, doar cu linie dedesubt.
 * Linia e gri, devine indigo la focus și roșie la eroare.
 */
export const TextField = forwardRef<ComponentRef<typeof TextInput>, TextFieldProps>(function TextField(
  { label, error, hint, secureToggle = false, className, onFocus, onBlur, editable = true, ...rest },
  ref,
) {
  const [focused, setFocused] = useState<boolean>(false);
  const [hidden, setHidden] = useState<boolean>(true);

  const line = error ? 'bg-momiji-ink' : focused ? 'bg-ink' : 'bg-ink-muted';
  const lineSize = error || focused ? 1.2 : 1;

  return (
    <View className={`${editable ? '' : 'opacity-40'} ${className ?? ''}`}>
      <Text className={`font-sans-medium text-[10px] uppercase tracking-[2px] ${error ? 'text-momiji-ink' : 'text-ink-muted'}`}>
        {label}
      </Text>

      <View className="mt-2 flex-row items-center">
        <TextInput
          ref={ref}
          accessibilityLabel={label}
          accessibilityHint={error ?? hint}
          editable={editable}
          secureTextEntry={secureToggle && hidden}
          cursorColor="#2f5d93"
          selectionColor="#2f5d93"
          placeholderTextColor="#c2b9b0"
          className="h-11 flex-1 font-sans-light text-[20px] text-ink"
          onFocus={(e) => {
            setFocused(true);
            onFocus?.(e);
          }}
          onBlur={(e) => {
            setFocused(false);
            onBlur?.(e);
          }}
          {...rest}
        />
        {secureToggle && (
          <Pressable
            accessibilityRole="button"
            accessibilityLabel={hidden ? 'Arată parola' : 'Ascunde parola'}
            className="h-12 w-12 items-center justify-center"
            onPress={() => setHidden((h) => !h)}>
            <Ionicons name={hidden ? 'eye-outline' : 'eye-off-outline'} size={20} color="#0b2a52" />
          </Pressable>
        )}
      </View>

      <View className={`mt-2 ${line}`} style={{ height: lineSize }} />

      {(error || hint) && (
        <Text
          accessibilityLiveRegion={error ? 'polite' : 'none'}
          className={`mt-2 font-sans text-caption ${error ? 'text-momiji-ink' : 'text-ink-muted'}`}>
          {error ?? hint}
        </Text>
      )}
    </View>
  );
});
