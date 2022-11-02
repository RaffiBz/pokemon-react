export interface Pokemon {
  id: string;
  name: string;
  abilities: { ability: { name: string } }[];
  sprites: { front_default: string };
  stats: { stat: { name: string }; base_stat: string }[];
  types: { type: { name: string } }[];
  weight: string;
  moves: { move: { name: string } }[];
}
