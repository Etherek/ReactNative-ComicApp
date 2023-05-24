import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, Image, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';
import axios from 'axios';
import { useInfiniteQuery } from 'react-query';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import LoadingScreen from './loadingScreen';

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
type DashboardScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Main'>;

const API_URL = 'https://xkcd.com';

const MainScreen: React.FC = () => {
  const [latestPage, setLatestPage] = useState<number>(0);
  const [fetching, setFetching] = useState<boolean>(false);
  const navigation = useNavigation<DashboardScreenNavigationProp>();

  const fetchLatestPage = async () => {
    const response = await axios.get(`${API_URL}/info.0.json`);
    setLatestPage(response.data.num);
    setFetching(true);
  };
  
  useEffect(() => {
    fetchLatestPage();
  }, []);

  const fetchComics = async ({ pageParam = latestPage }) => {
    const response = await axios.get(`${API_URL}/${pageParam}/info.0.json`);
    return response.data;
  };

  const {
    data,
    fetchNextPage,
    hasNextPage,
    isError,
    isLoading,
  } = useInfiniteQuery('comics', fetchComics, {
    getNextPageParam: (_, allPages) => allPages.length + 1,
    staleTime: Infinity,
    enabled: fetching,
  });

  if (isLoading) {
    return <LoadingScreen />;
  }

  if (isError) {
    return <Text>Error occurred while fetching comics</Text>;
  }

  return (
    <FlatList
      data={data?.pages.flatMap((page) => page)}
      keyExtractor={(comic) => comic.num.toString()}
      renderItem={({ item: comic }) => (
        <TouchableOpacity onPress={() => navigation.navigate('ComicDetails', { comic })}>
          <View style={styles.container}>
            <Image source={{ uri: comic.img }} style={styles.comicImage} />
            <Text style={styles.comicTitle}>{comic.title}</Text>
            <Text style={styles.comicAlt}>{comic.alt}</Text>
          </View>
        </TouchableOpacity>
      )}
      onEndReached={() => {
        if (data && data.pages.length) {
          fetchNextPage({ pageParam: latestPage - data.pages.length });
        }
      }}
      onEndReachedThreshold={0.1}
      ListFooterComponent={() => (isLoading && hasNextPage ? <Text>Loading more...</Text> : null)}
    />
  );
};

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const styles = StyleSheet.create({
  container: {
    width: '80%',
    alignSelf: 'center',
    marginBottom: windowHeight * 0.02,
    borderWidth: 1,
    borderColor: 'gray',
    padding: windowHeight * 0.02,
    borderRadius: 8,
  },
  comicImage: {
    width: '100%',
    height: windowHeight * 0.2,
    aspectRatio: 1,
    resizeMode: 'contain',
    alignSelf: 'center',
  },
  comicTitle: {
    fontSize: windowWidth * 0.04,
    fontWeight: 'bold',
    marginTop: windowHeight * 0.02,
    alignSelf: 'center',
  },
  comicAlt: {
    marginTop: windowHeight * 0.02,
    alignSelf: 'center',
  },
});

export default MainScreen;