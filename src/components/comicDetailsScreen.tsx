import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import { RouteProp } from '@react-navigation/native';

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
type ComicDetailsScreenRouteProp = RouteProp<RootStackParamList, 'ComicDetails'>;

type ComicDetailsScreenProps = {
  route: ComicDetailsScreenRouteProp;
};

const ComicDetailsScreen: React.FC<ComicDetailsScreenProps> = ({ route }) => {
  const { comic } = route.params;

  return (
    <View style={styles.container}>
      <Image source={{ uri: comic.img }} style={styles.image} />
      <Text style={styles.title}>{comic.title}</Text>
      <Text style={styles.alt}>{comic.alt}</Text>
      <Text>Release date: {`${comic.day}.${comic.month}.${comic.year}`}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: '3%',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: '4%',
  },
  alt: {
    fontSize: 18,
    marginBottom: '3%',
  },
  image: {
    width: '100%',
    height: '40%',
    resizeMode: 'contain',
  },
});

export default ComicDetailsScreen;