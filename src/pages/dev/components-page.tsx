import { useState } from 'react';
import { ScrollView, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { ChoiceRow, ProgressLine, StepCounter, TopBar } from '@/components/onboarding';
import { Button, ChecklistItem, ChipGroup, Divider, H1, H3, Paragraph, TextField } from '@/components/ui';

function Row({ title, children, dark = false }: { title: string; children: React.ReactNode; dark?: boolean }) {
  return (
    <View className={`mt-8 gap-3 rounded-card p-5 ${dark ? 'bg-indigo' : 'bg-paper-raised'}`}>
      <H3 tone={dark ? 'on-brand' : 'ink'}>{title}</H3>
      {children}
    </View>
  );
}

/** Catalogul componentelor: toate variantele și stările, ca în Design System din Figma. */
export function ComponentsPage() {
  const insets = useSafeAreaInsets();
  const [choice, setChoice] = useState(1);
  const [genres, setGenres] = useState(['Aventuri', 'Animale']);

  return (
    <View className="flex-1 bg-paper" style={{ paddingTop: insets.top }}>

      <TopBar />

      <ScrollView
        className="flex-1"
        contentContainerStyle={{ paddingTop: 16, paddingBottom: insets.bottom + 48, paddingHorizontal: 24 }}>
      <H1>Componente</H1>
      <Paragraph tone="muted" className="mt-2">
        Button — variantă × stare. Apasă și ține apăsat ca să vezi starea apăsată.
      </Paragraph>

      <Row title="Primary">
        <Button label="Începe să citești" arrow />
        <Button label="Se încarcă" loading />
        <Button label="Dezactivat" disabled />
      </Row>

      <Row title="Secondary">
        <Button label="Vezi biblioteca" variant="secondary" />
        <Button label="Dezactivat" variant="secondary" disabled />
      </Row>

      <Row title="Link">
        <Button label="Citește povestea" variant="link" />
        <Button label="Dezactivat" variant="link" disabled />
      </Row>

      <Row title="Danger (eroare)">
        <Button label="Șterge contul" variant="danger" />
        <Button label="Se șterge" variant="danger" loading />
      </Row>

      <Row title="Mare, cu cerc (Onboarding)">
        <Button label="Continuă" size="lg" arrowCircle />
        <Button label="Continuă" size="lg" arrowCircle loading />
        <Button label="Continuă cu email" size="lg" />
      </Row>

      <Row title="Inverse (pe indigo)" dark>
        <Button label="Începe" variant="inverse" size="lg" arrowCircle />
        <Button label="Începe să citești" variant="inverse" arrow />
      </Row>

      <Row title="Divider">
        <Divider />
        <Divider tone="strong" />
        <Divider label="sau" />
        <View className="h-10 flex-row items-center gap-4">
          <Paragraph>Stânga</Paragraph>
          <Divider vertical />
          <Paragraph>Dreapta</Paragraph>
        </View>
      </Row>

      <Row title="Top bar și progres">
        <TopBar step={3} total={4} back={false} />
        <StepCounter step={2} total={4} />
        <ProgressLine step={1} total={4} />
      </Row>

      <Row title="Câmpuri de text">
        <TextField label="Emailul tău" placeholder="ana@email.ro" keyboardType="email-address" autoCapitalize="none" />
        <TextField label="Parola" secureToggle defaultValue="Pisica7luna" />
        <TextField label="Emailul tău" defaultValue="ana@" error="Adresa de email nu e completă." />
        <TextField label="Dezactivat" defaultValue="nu se poate edita" editable={false} />
        <View className="gap-2">
          <ChecklistItem label="Cel puțin 8 litere" done />
          <ChecklistItem label="Măcar o cifră" />
        </View>
      </Row>

      <Row title="Alegere (radio)">
        <View>
          <ChoiceRow index={1} first title="Cu emailul" subtitle="Îți alegi o parolă" icon="mail-outline" selected={choice === 1} onPress={() => setChoice(1)} />
          <ChoiceRow index={2} title="Cu Apple" icon="logo-apple" selected={choice === 2} onPress={() => setChoice(2)} />
          <ChoiceRow index={3} title="Cu Google" icon="logo-google" selected={choice === 3} onPress={() => setChoice(3)} />
        </View>
      </Row>

      <Row title="Chips">
        <ChipGroup
          options={['Aventuri', 'Basme', 'Animale', 'Spațiu', 'Mistere', 'Benzi desenate']}
          value={genres}
          onChange={setGenres}
        />
      </Row>
      </ScrollView>
    </View>
  );
}
