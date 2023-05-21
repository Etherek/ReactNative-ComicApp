import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

type ComicSource = 'xkcd' | 'other';

type SplashScreenProps = {
  onComicSourceSelected: (source: ComicSource) => void;
};

const SplashScreen: React.FC<SplashScreenProps> = ({ onComicSourceSelected }) => {
  const [selectedSource, setSelectedSource] = useState<ComicSource | null>(null);

  useEffect(() => {
    if (selectedSource) {
      onComicSourceSelected(selectedSource);
    }
  }, [selectedSource, onComicSourceSelected]);

  return (
    <View style={styles.container}>
      <Text style={styles.bigTitle}>Welcome to My Awesome App!</Text>
      <Text style={styles.title}>Select Comic Source</Text>
      <TouchableOpacity
        style={[styles.button, selectedSource === 'xkcd' && styles.selectedButton]}
        onPress={() => setSelectedSource('xkcd')}
      >
        <Text style={styles.buttonText}>xkcd</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[styles.button, selectedSource === 'other' && styles.selectedButton]}
        onPress={() => setSelectedSource('other')}
      >
        <Text style={styles.buttonText}>Other</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 24,
  },
  bigTitle: {
    fontSize: 36,
    fontWeight: 'bold',
    marginBottom: 24,
  },
  button: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
    backgroundColor: '#ddd',
    marginBottom: 16,
  },
  selectedButton: {
    backgroundColor: '#007aff',
  },
  buttonText: {
    fontSize: 18,
    color: '#333',
  },
});

export default SplashScreen;