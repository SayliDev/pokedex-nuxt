export interface Pokemon {
  id: number;
  name: string;
  sprite: string;
  types: string[];
  stats: { name: string; value: number }[];
  height: number;
  weight: number;
  abilities: string[];
}

export interface PokemonSpecies {
  names: { name: string; language: { name: string } }[];
}
