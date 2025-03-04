import { useInfiniteQuery } from '@tanstack/react-query';
import { useMemo, useState } from 'react';
import { FlatList, Image, Text, View } from 'react-native';

import { getCharacters } from '../api/star-wars-api';
import { StarWarsCharacterDto } from '../types/star-wars-character.dto';

type ScreenContentProps = {
  title: string;
  path: string;
  children?: React.ReactNode;
};

export const STAR_WARS_CHARACTERS_QUERY_KEY = 'STAR_WARS_CHARACTERS';

export const ScreenContent = ({ title, path }: ScreenContentProps) => {
  const [searchQuery, setSearchQuery] = useState('');

  const {
    data: { pages = [] } = {},
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
    isError,
    error,
  } = useInfiniteQuery({
    queryKey: [STAR_WARS_CHARACTERS_QUERY_KEY, searchQuery],
    queryFn: ({ pageParam = 1 }) => getCharacters(searchQuery, pageParam),
    getNextPageParam: (lastPage, pages) => {
      if (lastPage.results.length < 10 || !lastPage.next) {
        return undefined;
      }
      return pages.length + 1;
    },
    initialPageParam: 1,
    retry: false,
  });

  const renderCharacterItem = ({ item }: { item: StarWarsCharacterDto }) => {
    const avatarUrl =
      'https://vieraboschkova.github.io/swapi-gallery/static/assets/img/people/1.jpg';
    return (
      <View className="flex-row items-center border-b border-gray-200 bg-white p-4">
        <Image
          source={{ uri: avatarUrl }}
          className="mr-4 h-16 w-16 rounded-full"
          // defaultSource={require('../assets/placeholder.png')}
        />
        <View>
          <Text className="text-lg font-bold text-black">{item.name}</Text>
          <Text className="text-gray-600">Gender: {item.gender}</Text>
          <Text className="text-gray-600">Birth Year: {item.birth_year}</Text>
        </View>
      </View>
    );
  };

  const characters = useMemo(() => {
    return pages.reduce((acc, page) => {
      return [...acc, ...page.results];
    }, [] as StarWarsCharacterDto[]);
  }, [pages]);

  return (
    <View className={styles.container}>
      <Text className={styles.title}>Star wars chatacters</Text>
      <FlatList
        data={characters}
        // counting on "url" as unique entry
        keyExtractor={(character) => character?.url}
        renderItem={renderCharacterItem}
      />
    </View>
  );
};

const styles = {
  container: `items-center flex-1 justify-center`,
  title: `text-xl font-bold`,
};
