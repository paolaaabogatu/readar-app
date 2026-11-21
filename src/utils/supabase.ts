import AsyncStorage from '@react-native-async-storage/async-storage';
import { createClient } from '@supabase/supabase-js';
import { AppState, Platform } from 'react-native';

const url = process.env.EXPO_PUBLIC_SUPABASE_URL;
const key = process.env.EXPO_PUBLIC_SUPABASE_KEY;

if (!url || !key) {
  throw new Error(
    'Lipsesc EXPO_PUBLIC_SUPABASE_URL sau EXPO_PUBLIC_SUPABASE_KEY. Copiază .env.example ca .env.local și repornește cu npx expo start -c.',
  );
}

/** Clientul Supabase al aplicației. Sesiunea de login se păstrează pe telefon (AsyncStorage). */
export const supabase = createClient(url, key, {
  auth: {
    storage: AsyncStorage,
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false,
  },
});

// Reîmprospătează sesiunea doar cât aplicația e deschisă (recomandarea Supabase pentru React Native)
if (Platform.OS !== 'web') {
  AppState.addEventListener('change', (state) => {
    if (state === 'active') supabase.auth.startAutoRefresh();
    else supabase.auth.stopAutoRefresh();
  });
}
