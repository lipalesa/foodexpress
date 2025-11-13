import { useEffect } from 'react';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { router } from 'expo-router';
import { useFrameworkReady } from '@/hooks/useFrameworkReady';
import { useFonts, Inter_400Regular, Inter_500Medium, Inter_600SemiBold, Inter_700Bold } from '@expo-google-fonts/inter';
import { SplashScreen } from 'expo-router';
import { AuthProvider, useAuth } from '@/contexts/AuthContext';

SplashScreen.preventAutoHideAsync();

function RootLayoutNav() {
  const { user, isAuthenticated, isInitialized } = useAuth();

  // Handle navigation based on authentication state and user type
  useEffect(() => {
    if (!isInitialized) return; // Wait for auth to initialize

    if (isAuthenticated && user) {
      // User is authenticated, navigate based on user type
      if (user.type === 'driver') {
        router.replace('/(tabs)/driver-dashboard');
      } else {
        router.replace('/(tabs)');
      }
    } else {
      // User is not authenticated, navigate to login
      router.replace('/login');
    }
  }, [isAuthenticated, isInitialized, user]);

  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="login" />
      <Stack.Screen name="(tabs)" />
      <Stack.Screen name="restaurant/[id]" options={{ presentation: 'modal' }} />
      <Stack.Screen name="menu-item/[id]" options={{ presentation: 'modal' }} />
      <Stack.Screen name="checkout" options={{ presentation: 'modal' }} />
      <Stack.Screen name="order-tracking/[id]" options={{ presentation: 'modal' }} />
      <Stack.Screen name="+not-found" />
    </Stack>
  );
}

export default function RootLayout() {
  useFrameworkReady();

  const [fontsLoaded, fontError] = useFonts({
    'Inter-Regular': Inter_400Regular,
    'Inter-Medium': Inter_500Medium,
    'Inter-SemiBold': Inter_600SemiBold,
    'Inter-Bold': Inter_700Bold,
  });

  useEffect(() => {
    if (fontsLoaded || fontError) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded, fontError]);

  if (!fontsLoaded && !fontError) {
    return null;
  }

  return (
    <AuthProvider>
      <RootLayoutNav />
      <StatusBar style="auto" />
    </AuthProvider>
  );
}