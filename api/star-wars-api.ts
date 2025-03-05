import axios from 'axios';

import { StarWarsCharacterDto } from '../types/star-wars-character.dto';
import { StarWarsCharactersResponseDto } from '../types/star-wars-characters-response.dto';
import { SWAPI_BASE_URL } from '../utils/constants';

export const getCharacters = async (search?: string, page?: number) => {
  try {
    const response = await axios.get<StarWarsCharactersResponseDto>(`${SWAPI_BASE_URL}/people/`, {
      params: {
        search,
        page,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching characters:', error);
    throw error;
  }
};

export const getCharacterById = async (id: number) => {
  try {
    const response = await axios.get<StarWarsCharacterDto>(`${SWAPI_BASE_URL}/people/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching characters:', error);
    throw error;
  }
};
