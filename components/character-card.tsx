import { LinearGradient } from 'expo-linear-gradient';
import { Link } from 'expo-router';
import React from 'react';
import { Image, Text, TouchableOpacity, View } from 'react-native';

import placeholderImage from '../assets/placeholder.png';
import { StarWarsCharacterDto } from '../types/star-wars-character.dto';
import { extractIdFromUrl, getCharacterAvatarUri } from '../utils/utils';

export type CharacterCardProps = {
  character: StarWarsCharacterDto;
};

export const CharacterCard = ({ character }: CharacterCardProps) => {
  const { name, gender, height, birth_year, url } = character;
  const characterId = extractIdFromUrl(url);

  return (
    <Link asChild href={`/character/${characterId}`}>
      <TouchableOpacity className="mb-4 w-full px-4">
        <View className="w-full overflow-hidden rounded-xl bg-white shadow-xl">
          <LinearGradient
            colors={['#42275a', '#734b6d']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}>
            <View className="flex-row items-center p-4">
              <Image
                source={{ uri: getCharacterAvatarUri(url) }}
                className="mr-4 h-20 w-20 rounded-full border-2 border-white"
                defaultSource={placeholderImage}
              />
              <View className="flex-1 justify-center">
                <Text className="mb-1 text-xl font-bold text-white">{name}</Text>
                <View className="flex-row gap-8">
                  <View>
                    <Text className="text-center text-base font-bold text-gray-200">Gender</Text>
                    <Text className="text-center text-base text-white">{gender || 'Unknown'}</Text>
                  </View>
                  <View>
                    <Text className="text-center text-base font-bold text-gray-200">Height</Text>
                    <Text className="text-center text-base text-white">{height || 'Unknown'}</Text>
                  </View>
                  <View>
                    <Text className="text-center text-base  font-bold text-gray-200">
                      Birth Year
                    </Text>
                    <Text className="text-center text-base text-white">
                      {birth_year || 'Unknown'}
                    </Text>
                  </View>
                </View>
              </View>
            </View>
          </LinearGradient>
        </View>
      </TouchableOpacity>
    </Link>
  );
};
