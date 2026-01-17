export interface Pokemon {
    pokemonName: string;
    pokemonTypes: string[];
    pokemonImageUrl: string;
    pokemonDescription: string;
    pokemonHp: number | null;
    pokemonAttack: number | null;
    pokemonDefense: number | null;
    pokemonSpecialAttack: number | null;
    pokemonSpecialDefense: number | null;
    pokemonSpeed: number | null;
}