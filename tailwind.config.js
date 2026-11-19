/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  presets: [require('nativewind/preset')],
  theme: {
    extend: {
      // Culorile Readar din Figma (ghid de brand + Landing page)
      colors: {
        ink: { DEFAULT: '#0b2a52', muted: '#55607a', whisper: '#c2b9b0' },
        indigo: '#0b2a52',
        fold: '#2f5d93',
        sakura: '#f2b3bf',
        momiji: { DEFAULT: '#d98484', ink: '#a3474d' },
        matcha: '#bad9d0',
        kinako: { DEFAULT: '#8c715a', ink: '#6b533e' },
        paper: { DEFAULT: '#f4ede8', raised: '#fbf8f5' },
        'on-brand': '#f4ede8',
        line: '#e3dcd6',
        mist: '#f2f2f2',
      },
      // Fiecare greutate e o familie separată în React Native
      fontFamily: {
        // Titluri: Adobe Garamond Pro -> EB Garamond
        display: ['EBGaramond_400Regular'],
        'display-italic': ['EBGaramond_400Regular_Italic'],
        'display-semibold': ['EBGaramond_600SemiBold'],
        // Text și interfață: Acumin Pro -> Inter
        'sans-light': ['Inter_300Light'],
        sans: ['Inter_400Regular'],
        'sans-medium': ['Inter_500Medium'],
        'sans-semibold': ['Inter_600SemiBold'],
        // Accente japoneze: Source Han Serif JP -> Noto Serif JP
        jp: ['NotoSerifJP_500Medium'],
      },
      // Stilurile de text din Figma
      fontSize: {
        body: ['16px', { lineHeight: '25.6px' }],
        'body-lg': ['17px', { lineHeight: '27.2px' }],
        caption: ['13px', { lineHeight: '18.85px' }],
        label: ['12px', { lineHeight: '15.6px', letterSpacing: '1.92px' }],
        helper: ['14px', { lineHeight: '25.9px', letterSpacing: '0.28px' }],
        // Titluri pentru ecranele aplicației (Auth / Onboarding din Figma)
        h3: ['24px', { lineHeight: '30px' }],
        h2: ['32px', { lineHeight: '37.8px' }],
        h1: ['40px', { lineHeight: '45px' }],
      },
      borderRadius: {
        card: '28px',
      },
    },
  },
  plugins: [],
};
