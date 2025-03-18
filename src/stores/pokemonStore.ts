import { defineStore } from "pinia";
import { ref, computed } from "vue";
import type { Pokemon, PokemonSpecies } from "../types/PokemonType";

export const usePokemonStore = defineStore("pokemon", () => {
  const pokemons = ref<Pokemon[]>([]);
  const offset = ref(0);
  const limit = 20;
  const isLoading = ref(false);
  const searchQuery = ref("");
  const selectedPokemon = ref<Pokemon | null>(null);
  const isModalOpen = ref(false);

  const filteredPokemons = computed(() =>
    pokemons.value.filter((pokemon) =>
      pokemon.name.toLowerCase().includes(searchQuery.value.toLowerCase())
    )
  );

  const loadMorePokemons = async () => {
    if (isLoading.value) return;
    isLoading.value = true;

    try {
      const response = await fetch(
        `https://pokeapi.co/api/v2/pokemon?offset=${offset.value}&limit=${limit}`
      );
      const data = await response.json();

      const pokemonDetails = await Promise.all(
        data.results.map(async ({ url }: { url: string }) => {
          const res = await fetch(url);
          const details = await res.json();

          const speciesRes = await fetch(
            `https://pokeapi.co/api/v2/pokemon-species/${details.id}/`
          );
          const speciesData: PokemonSpecies = await speciesRes.json();

          const frenchName =
            speciesData.names.find((n) => n.language.name === "fr")?.name ||
            details.name;

          return {
            id: details.id,
            name: frenchName,
            sprite: details.sprites.other.home.front_default,
            types: details.types.map(
              ({ type }: { type: { name: string } }) => type.name
            ),
            height: details.height,
            weight: details.weight,
            abilities: details.abilities.map(
              ({ ability }: { ability: { name: string } }) => ability.name
            ),
            stats: details.stats.map(
              ({
                stat,
                base_stat,
              }: {
                stat: { name: string };
                base_stat: number;
              }) => ({
                name: stat.name,
                value: base_stat,
              })
            ),
          };
        })
      );

      pokemons.value.push(...pokemonDetails);
      offset.value += limit;
    } catch (error) {
      console.error("Erreur lors du chargement des Pokémon :", error);
    } finally {
      isLoading.value = false;
    }
  };

  const setSearchQuery = (query: string) => {
    searchQuery.value = query;
  };

  const openPokemonDetails = (pokemon: Pokemon) => {
    selectedPokemon.value = pokemon;
    isModalOpen.value = true;
  };

  const closeModal = () => {
    isModalOpen.value = false;
  };

  return {
    pokemons,
    filteredPokemons,
    isLoading,
    searchQuery,
    selectedPokemon,
    isModalOpen,
    loadMorePokemons,
    setSearchQuery,
    openPokemonDetails,
    closeModal,
  };
});
