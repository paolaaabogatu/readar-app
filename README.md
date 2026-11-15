# Welcome to your Expo app 👋

This is an [Expo](https://expo.dev) project created with [`create-expo-app`](https://www.npmjs.com/package/create-expo-app).

## Get started

1. Install dependencies

   ```bash
   npm install
   ```

2. Start the app

   ```bash
   npx expo start
   ```

In the output, you'll find options to open the app in a

- [development build](https://docs.expo.dev/develop/development-builds/introduction/)
- [Android emulator](https://docs.expo.dev/workflow/android-studio-emulator/)
- [iOS simulator](https://docs.expo.dev/workflow/ios-simulator/)
- [Expo Go](https://expo.dev/go), a limited sandbox for trying out app development with Expo

You can start developing by editing the files inside the **src/app** directory. This project uses [file-based routing](https://docs.expo.dev/router/introduction).

## Stiluri: Tailwind + fonturile Readar

Aplicația folosește **Tailwind CSS** prin [NativeWind](https://www.nativewind.dev), cu culorile și fonturile din designul Readar din Figma. Le găsești în `tailwind.config.js`.

Prima dată după `npm install`, pornește cu cache-ul golit:

```bash
npx expo start -c
```

### Exemplu

```tsx
import { View } from 'react-native';

import { Text } from '@/components/ui/text';

export default function Home() {
  return (
    <View className="flex-1 bg-paper p-6">
      <Text className="font-display-semibold text-h1">Readar</Text>
      <Text className="font-jp text-kinako">リーダー</Text>
      <Text className="mt-4 text-ink-muted">O pagină pe zi. Un an întreg.</Text>
    </View>
  );
}
```

`Text` din `@/components/ui/text` pornește deja cu Inter, mărimea body și culoarea ink, așa că nu trebuie să le repeți.

### Fonturi

Se încarcă o singură dată, pentru toată aplicația, în `src/app/_layout.tsx`.

| Clasă | Font | Folosire |
| --- | --- | --- |
| `font-display` | EB Garamond Regular | titluri |
| `font-display-italic` | EB Garamond Italic | titluri, accente |
| `font-display-semibold` | EB Garamond SemiBold | titluri, logo |
| `font-sans` | Inter Regular | text (implicit) |
| `font-sans-medium` | Inter Medium | butoane, etichete |
| `font-sans-semibold` | Inter SemiBold | text accentuat |
| `font-jp` | Noto Serif JP Medium | accente japoneze |

În design sunt Adobe Garamond Pro, Acumin Pro și Source Han Serif JP. Primele două nu se pot pune într-o aplicație, așa că folosim echivalente gratuite. Noto Serif JP e același font ca Source Han Serif JP.

### Culori

| Clasă | Culoare | Folosire |
| --- | --- | --- |
| `ink` / `indigo` | `#0b2a52` | text, culoarea principală |
| `ink-muted` | `#55607a` | text secundar |
| `ink-whisper` | `#c2b9b0` | text foarte discret |
| `fold` | `#2f5d93` | colțul îndoit, hover |
| `sakura` | `#f2b3bf` | accente, linii |
| `momiji` / `momiji-ink` | `#d98484` / `#a3474d` | butoane, semn de carte |
| `matcha` | `#bad9d0` | succes, calm |
| `kinako` / `kinako-ink` | `#8c715a` / `#6b533e` | detalii premium |
| `paper` / `paper-raised` | `#f4ede8` / `#fbf8f5` | fundaluri |
| `on-brand` | `#f4ede8` | text pe fundal indigo |
| `line` | `#e3dcd6` | separatoare |
| `mist` | `#f2f2f2` | fundaluri UI |

Se folosesc cu orice prefix Tailwind: `bg-sakura`, `text-momiji-ink`, `border-line`.

### Mărimi de text

`text-body` (16/25.6), `text-body-lg` (17/27.2), `text-caption` (13), `text-label` (12, spațiere 1.92), `text-h3` (28), `text-h2` (44), `text-h1` (56). Colțurile cardurilor: `rounded-card` (28px).

## Pornire în simulator

```bash
npm install          # doar prima dată sau după ce se schimbă pachetele
npx expo start -c    # -c golește cache-ul (necesar după schimbări la Tailwind)
```

În terminal, după ce apare codul QR:

| Tastă | Ce face |
| --- | --- |
| `i` | deschide simulatorul iOS |
| `a` | deschide emulatorul Android |
| `r` | reîncarcă aplicația |
| `j` | deschide debugger-ul |

Varianta scurtă: `npm run ios`.

În simulator, **Cmd + Ctrl + Z** deschide meniul de dezvoltare, unde poți apăsa **Reload**. Pe telefon, scanezi codul QR cu camera (ai nevoie de Expo Go).

## Splash screen

Splash-ul animat e în `src/components/readar-splash.tsx` și repetă preloader-ul de pe readar-site: fundal indigo, petalele care se rotesc și apar pe rând, colțul de pagină care se îndoaie, „Readar”, リーダー și bara „Se pregătește raftul tău”. Se afișează din `src/app/_layout.tsx`, după ce se încarcă fonturile.

Ca să-l revezi, reîncarcă aplicația (`r` în terminal). În Expo Go apare întâi o clipă ecranul Expo Go. În aplicația finală, ecranul indigo din `app.json` apare direct.

Momentele animației (în milisecunde) sunt în `useEffect`, în `readar-splash.tsx`:

```ts
turn.value = withTiming(0, { duration: 1300, easing: turnEase });          // rotirea petalelor
fold.value = withDelay(1150, withTiming(1, { duration: 450 }));           // colțul îndoit
wordmark.value = withDelay(1350, withTiming(1, { duration: 600 }));       // „Readar”
fill.value = withDelay(1650, withTiming(1, { duration: 1450 }));          // bara de încărcare
exit.value = withDelay(3100, withTiming(0, { duration: 900 }));           // dispariția
```

Ca să fie mai scurt, micșorează valorile din `withDelay` și `duration`. Dacă telefonul are „Reduce Motion” activat, splash-ul doar apare și dispare, fără animație.

## Actualizări

**Expo** (în proiect, nu global):

```bash
npx expo install expo@latest
npx expo install --fix
npx expo-doctor
```

**EAS CLI** (global, pentru build-uri):

```bash
npm install -g eas-cli@latest
```

**Simulatorul iOS**: actualizează Xcode din App Store, apoi descarcă cea mai nouă versiune de iOS din **Xcode → Settings → Components**, sau din terminal:

```bash
xcodebuild -downloadPlatform iOS
```

## Git

Repo-ul e legat de GitHub (`paolaaabogatu/readar-app`, ramura `main`). `.gitignore` exclude `node_modules/`, `.expo/`, folderele native `ios/` și `android/`, setările WebStorm și fișierele `.env`.

```bash
git status                      # ce s-a schimbat
git add -A                      # adaugă tot ce nu e ignorat
git commit -m "mesajul tău"
git push
```

Pentru o funcționalitate nouă, pornește o ramură nouă din `main`:

```bash
git checkout main && git pull
git checkout -b nume-ramura
```

## Get a fresh project

When you're ready, run:

```bash
npm run reset-project
```

This command will move the starter code to the **example** directory and create a blank **src/app** directory where you can start developing.

### Other setup steps

- To set up ESLint for linting, run `npx expo lint`, or follow our guide on ["Using ESLint and Prettier"](https://docs.expo.dev/guides/using-eslint/)
- If you'd like to set up unit testing, follow our guide on ["Unit Testing with Jest"](https://docs.expo.dev/develop/unit-testing/)
- Learn more about the TypeScript setup in this template in our guide on ["Using TypeScript"](https://docs.expo.dev/guides/typescript/)

## Learn more

To learn more about developing your project with Expo, look at the following resources:

- [Expo documentation](https://docs.expo.dev/): Learn fundamentals, or go into advanced topics with our [guides](https://docs.expo.dev/guides).
- [Learn Expo tutorial](https://docs.expo.dev/tutorial/introduction/): Follow a step-by-step tutorial where you'll create a project that runs on Android, iOS, and the web.

## Join the community

Join our community of developers creating universal apps.

- [Expo on GitHub](https://github.com/expo/expo): View our open source platform and contribute.
- [Discord community](https://chat.expo.dev): Chat with Expo users and ask questions.
