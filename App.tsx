import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { QueryClient, QueryClientProvider } from 'react-query';
import ComicDetailsScreen from './src/components/comicDetailsScreen';
import SplashScreen from './src/components/splashScreen';
import MainScreen from './src/components/mainScreen';

type Comic = {
  year: number;
  month: number;
  day: number;
  title: string;
  alt: string;
  img: string;
};

type RootStackParamList = {
  Main: undefined;
  ComicDetails: { comic: Comic };
};

const Stack = createStackNavigator<RootStackParamList>();

const queryClient = new QueryClient();

export default function App() {
  const [comicSource, setComicSource] = useState<string | null>(null);

  const handleComicSourceSelected = (source: string) => {
    setComicSource(source);
  };

  if (!comicSource) {
    return <SplashScreen onComicSourceSelected={handleComicSourceSelected} />;
  }

  return (
    <QueryClientProvider client={queryClient}>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="Main" component={MainScreen} />
          <Stack.Screen name="ComicDetails" component={ComicDetailsScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </QueryClientProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});