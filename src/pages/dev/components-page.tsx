import { useState } from 'react';
import { View } from 'react-native';

import { ChoiceList, ProgressLine, StepCounter, TopBar } from '@/components/onboarding';
import {
  Button,
  Card,
  ChecklistItem,
  ChipGroup,
  Divider,
  H1,
  Jp,
  Label,
  Paragraph,
  Pill,
  Screen,
  TextField,
  TextLink,
} from '@/components/ui';

function Row({ title, children, dark = false }: { title: string; children: React.ReactNode; dark?: boolean }) {
  return (
    <Card title={title} tone={dark ? 'dark' : 'light'} className="mt-8">
      {children}
    </Card>
  );
}

/** Catalogul componentelor: toate variantele și stările, ca în Design System din Figma. */
export function ComponentsPage() {
  const [method, setMethod] = useState<'email' | 'apple' | 'google'>('email');
  const [genres, setGenres] = useState(['Aventuri', 'Animale']);

  return (
    <Screen scroll header={<TopBar />} className="pt-4">
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
        <ChoiceList
          options={[
            { id: 'email', title: 'Cu emailul', subtitle: 'Îți alegi o parolă', icon: 'mail-outline' },
            { id: 'apple', title: 'Cu Apple', icon: 'logo-apple' },
            { id: 'google', title: 'Cu Google', icon: 'logo-google' },
          ]}
          value={method}
          onChange={setMethod}
        />
      </Row>

      <Row title="Chips">
        <ChipGroup
          options={['Aventuri', 'Basme', 'Animale', 'Spațiu', 'Mistere', 'Benzi desenate']}
          value={genres}
          onChange={setGenres}
        />
      </Row>

      <Row title="Text mic">
        <Label>Etichetă (sm)</Label>
        <Label size="xs">readar.app (xs)</Label>
        <Jp>ようこそ</Jp>
        <Paragraph>
          Nu ai cont? <TextLink>Creează unul</TextLink>
        </Paragraph>
        <Pill label="În curând" />
        <Divider tone="accent" width={40} />
      </Row>
    </Screen>
  );
}
