import type { Href } from 'expo-router';
import { router } from 'expo-router';

import { TextLink } from '@/components/ui/text-link';

type Props = {
  label: string;
  href: Href;
  className?: string;
};

/** Link vizibil doar în development (__DEV__); dispare din aplicația finală. */
export function DevLink({ label, href, className }: Props) {
  if (!__DEV__) return null;

  return (
    <TextLink tone="whisper" className={`text-center ${className ?? ''}`} onPress={() => router.push(href)}>
      {label}
    </TextLink>
  );
}
