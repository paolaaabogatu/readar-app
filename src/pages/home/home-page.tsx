import { ReadarMark, Tagline } from '@/components/brand';
import { Divider, H1, Jp, Paragraph, Pill, Screen } from '@/components/ui';

/** Home: ecranul de după onboarding (deocamdată „În curând”). */
export function HomePage() {
  return (
    <Screen center className="px-8">
      <ReadarMark size={88} />

      <H1 className="mt-6 font-display-semibold">Readar</H1>
      <Jp size="md" tone="kinako" className="mt-2">
        リーダー
      </Jp>

      <Divider tone="accent" width={40} className="my-8" />

      <Tagline className="text-center" />
      <Paragraph tone="muted" className="mt-4 max-w-[280px] text-center">
        Află titlul și autorul unei cărți dintr-o fotografie.
      </Paragraph>

      <Pill label="În curând" className="mt-10" />
    </Screen>
  );
}
