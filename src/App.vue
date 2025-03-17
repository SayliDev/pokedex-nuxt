<script setup>
import Navbar from "./components/Navbar.vue";
import Hero from "./components/Hero.vue";
import Filter from "./components/Filter.vue";
import Card from "./components/Card.vue";
import { onMounted, ref } from "vue";

const pokemons = ref([]);

onMounted(async () => {
  try {
    const response = await fetch("https://pokeapi.co/api/v2/pokemon?limit=40");
    const data = await response.json();

    const pokemonDetails = await Promise.all(
      data.results.map(async ({ url }) => {
        const res = await fetch(url);
        const details = await res.json();

        const speciesRes = await fetch(
          `https://pokeapi.co/api/v2/pokemon-species/${details.id}/`
        );
        const speciesData = await speciesRes.json();

        const frenchName =
          speciesData.names.find((n) => n.language.name === "fr")?.name ||
          details.name;

        const pokemonData = {
          id: details.id,
          name: frenchName,
          sprite: details.sprites.other.home.front_default,
          types: details.types.map(({ type }) => type.name),
          height: details.height,
          weight: details.weight,
          abilities: details.abilities.map(({ ability }) => ability.name),
          stats: details.stats.map(({ stat, base_stat }) => ({
            name: stat.name,
            value: base_stat,
          })),
        };

        return pokemonData;
      })
    );

    pokemons.value = pokemonDetails;
    console.log(pokemons.value);
  } catch (error) {
    console.error("Erreur lors du chargement des Pokémon :", error);
  }
});
</script>

<template>
  <Navbar />
  <Hero />
  <Filter />

  <!-- Liste des Pokémon -->
  <div class="container mx-auto px-4 py-8">
    <h2 class="text-2xl font-bold mb-6 text-center">Pokémon populaires</h2>

    <div
      class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"
    >
      <Card v-for="pokemon in pokemons" :pokemon="pokemon" />
    </div>
  </div>
</template>

<style scoped></style>
