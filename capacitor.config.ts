import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'es.dariosevilla.impostor',
  appName: 'Juego del Impostor',
  webDir: 'www',
  server: {
    androidScheme: 'https'
  },
  android: {
    backgroundColor: '#0a0a0a'
  }
};

export default config;
