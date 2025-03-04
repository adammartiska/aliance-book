import { StarWarsCharacterDto } from './star-wars-character.dto';

export type StarWarsCharactersResponseDto = {
  count: number;
  next: string | null;
  previous: string | null;
  results: StarWarsCharacterDto[];
};
