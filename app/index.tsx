import { useInfiniteQuery } from '@tanstack/react-query';
import { type ErrorBoundaryProps } from 'expo-router';
import { useCallback, useMemo, useState } from 'react';
import { Button, FlatList, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useDebounce } from 'use-debounce';

import { getCharacters } from '../api/star-wars-api';
import { CharacterCard } from '../components/character-card';
import { NoDataFound } from '../components/no-data-found';
import SearchBar from '../components/search-bar';
import { StarWarsCharacterDto } from '../types/star-wars-character.dto';
import { STAR_WARS_CHARACTERS_QUERY_KEY } from '../utils/constants';

// ErrorBoundary just to showcase how would I implement it everywhere in the app, this is as simple as I could do it
export function ErrorBoundary({ error, retry }: ErrorBoundaryProps) {
  return (
    <View className="flex-1 items-center justify-center bg-red-100">
      <Text className="font-bold">{error.message}</Text>
      <Button onPress={retry} title="Try again?" color="red" />
    </View>
  );
}

const AppIndex = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [debouncedSearchQuery] = useDebounce(searchQuery, 250);
  const {
    data: { pages = [] } = {},
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
    refetch,
  } = useInfiniteQuery({
    queryKey: [STAR_WARS_CHARACTERS_QUERY_KEY, debouncedSearchQuery],
    queryFn: ({ pageParam = 1 }) => getCharacters(debouncedSearchQuery, pageParam),
    getNextPageParam: (lastPage, pages) => {
      if (lastPage.results.length < 10 || !lastPage.next) {
        return undefined;
      }
      return pages.length + 1;
    },
    initialPageParam: 1,
  });

  const characters = useMemo(() => {
    return pages.reduce((acc, page) => {
      return [...acc, ...page.results];
    }, [] as StarWarsCharacterDto[]);
  }, [pages]);

  const handleEndReach = useCallback(() => {
    if ((!isLoading || !isFetchingNextPage) && hasNextPage) {
      fetchNextPage();
    }
  }, [isLoading, hasNextPage]);

  return (
    <SafeAreaView
      className="flex-1 items-center justify-center  px-2"
      edges={['left', 'right', 'bottom']}>
      <SearchBar searchText={searchQuery} onSearch={setSearchQuery} />
      <FlatList
        ListEmptyComponent={
          !isLoading || !isFetchingNextPage ? (
            <NoDataFound label="There are no characters found" />
          ) : null
        }
        data={characters}
        // counting on "url" as unique entry
        keyExtractor={(character) => character?.url}
        renderItem={({ item }) => <CharacterCard character={item} />}
        onEndReached={handleEndReach}
        refreshing={isLoading}
        onRefresh={refetch}
        className="w-full"
      />
    </SafeAreaView>
  );
};

export default AppIndex;
