import { useQuery } from '@tanstack/react-query';
import { LinearGradient } from 'expo-linear-gradient';
import { useLocalSearchParams } from 'expo-router';
import React from 'react';
import { ActivityIndicator, Image, ScrollView, Text, View } from 'react-native';

import { getCharacterById } from '../../api/star-wars-api';
import DetailMultiRow from '../../components/detail-multi-row';
import { DetailRow } from '../../components/detail-row';
import { NoDataFound } from '../../components/no-data-found';
import { CHARACTER_DETAIL_QUERY_KEY } from '../../utils/constants';
import { extractIdFromUrl } from '../../utils/utils';

export default function CharacterDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();

  const { data: character, isLoading } = useQuery({
    queryKey: [CHARACTER_DETAIL_QUERY_KEY, id],
    queryFn: () => getCharacterById(Number(id)),
    enabled: !!id,
  });

  if (isLoading) {
    return (
      <View className="flex-1 items-center justify-center bg-gray-100">
        <ActivityIndicator />
      </View>
    );
  }

  if (!character) {
    return <NoDataFound label="Character not found" />;
  }

  const {
    url,
    name,
    birth_year,
    gender,
    height,
    mass,
    homeworld,
    eye_color,
    hair_color,
    skin_color,
    species,
    starships,
    vehicles,
    films,
    created,
    edited,
  } = character;

  const characterId = extractIdFromUrl(url);
  const avatarUrl = `https://vieraboschkova.github.io/swapi-gallery/static/assets/img/people/${characterId}.jpg`;

  return (
    <ScrollView className="bg-gray-00 flex-1">
      <LinearGradient
        colors={['#42275a', '#734b6d']}
        start={{ x: 0, y: 1 }}
        end={{ x: 0, y: 0 }}
        className="absolute left-0 right-0 top-0 h-full w-full">
        <View className="items-center p-4">
          <Image
            source={{ uri: avatarUrl }}
            className="mb-4 h-40 w-40 rounded-full"
            resizeMode="cover"
          />

          <Text className="mb-4 text-3xl font-bold text-white">{name}</Text>
          <View className="w-full rounded-lg bg-white p-4 shadow-md">
            <DetailRow label="Birth Year" value={birth_year} />
            <DetailRow label="Gender" value={gender} />
            <DetailRow label="Height" value={`${height} cm`} />
            <DetailRow label="Mass" value={`${mass} kg`} />
            <DetailRow label="Homeworld" value={homeworld} />
            <View className="mt-2 border-t border-gray-200 pt-2">
              <DetailRow label="Eye Color" value={eye_color} />
              <DetailRow label="Hair Color" value={hair_color} />
              <DetailRow label="Skin Color" value={skin_color} />
            </View>
            <DetailMultiRow data={species} title="Species" emptyMessage="No species available" />
            <DetailMultiRow
              data={starships}
              title="Starships"
              emptyMessage="No starships available"
            />
            <DetailMultiRow data={vehicles} title="Vehicles" emptyMessage="No vehicles available" />
            <DetailMultiRow data={films} title="Films" emptyMessage="No films available" />
            <View className="mt-2 flex-row justify-between border-t border-gray-200 pt-2">
              <Text className="text-xs text-gray-500">
                Created: {new Date(created).toLocaleDateString()}
              </Text>
              <Text className="text-xs text-gray-500">
                Last Edited: {new Date(edited).toLocaleDateString()}
              </Text>
            </View>
          </View>
        </View>
      </LinearGradient>
    </ScrollView>
  );
}
