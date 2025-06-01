import { ExpoConfig, ConfigContext } from 'expo/config';

export default ({ config }: ConfigContext): ExpoConfig => ({
  ...config,
  name: "global-economic-analysis",
  slug: "global-economic-analysis",
  extra: {
    supabaseUrl: process.env.EXPO_PUBLIC_SUPABASE_URL,
    supabaseAnonKey: process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY,
    eas: {
      projectId: process.env.EXPO_PUBLIC_EAS_PROJECT_ID,
    },
  },
  plugins: [
    [
      "expo-build-properties",
      {
        ios: {
          deploymentTarget: "13.4"
        },
        android: {
          compileSdkVersion: 33,
          targetSdkVersion: 33,
          buildToolsVersion: "33.0.0"
        }
      }
    ]
  ]
});