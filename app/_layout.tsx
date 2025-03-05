import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Stack } from 'expo-router';
import React from 'react';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import '../global.css';

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 60 * 1, // 1 hour
    },
  },
});

export default function Layout() {
  return (
    <SafeAreaProvider>
      <QueryClientProvider client={queryClient}>
        <GestureHandlerRootView style={{ flex: 1 }}>
          <Stack screenOptions={{ headerShown: false }}>
            <Stack.Screen
              name="index"
              options={{
                title: 'Star Wars characters',
                headerShown: true,
                headerTitleStyle: {
                  fontWeight: 'bold',
                },
                headerTintColor: 'black',
              }}
            />
            <Stack.Screen
              name="character/[id]"
              options={{
                title: 'Character detail',
                headerShown: true,
                headerTitleStyle: {
                  fontWeight: 'bold',
                },
                headerTintColor: 'black',
              }}
            />
          </Stack>
        </GestureHandlerRootView>
      </QueryClientProvider>
    </SafeAreaProvider>
  );
}
