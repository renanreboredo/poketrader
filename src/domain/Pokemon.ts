export interface Pokemon {
  name: string;
  isDefault: boolean;
  baseExperience: number;
  sprite: string;
  stats: {
    hp: number;
    attack: number;
    defense: number;
    specialAttack: number;
    specialDefense: number;
    speed: number;
  };
}
