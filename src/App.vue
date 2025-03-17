<script setup>
import { computed, onMounted, onUnmounted, ref } from "vue";
import Card from "./components/Card.vue";
import Filter from "./components/Filter.vue";
import Hero from "./components/Hero.vue";
import Navbar from "./components/Navbar.vue";

const pokemons = ref([]);
const filteredPokemons = computed(() =>
  pokemons.value.filter((pokemon) =>
    pokemon.name.toLowerCase().includes(searchQuery.value.toLowerCase())
  )
);
const offset = ref(0);
const limit = 20;
const isLoading = ref(false);
const searchQuery = ref("");

const loadMorePokemons = async () => {
  if (isLoading.value) return;
  isLoading.value = true;

  try {
    const response = await fetch(
      `https://pokeapi.co/api/v2/pokemon?offset=${offset.value}&limit=${limit}`
    );
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

        return {
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

const handleScroll = () => {
  if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 200) {
    loadMorePokemons();
  }
};

const handleSearch = (query) => {
  searchQuery.value = query;
};

onMounted(() => {
  loadMorePokemons();
  window.addEventListener("scroll", handleScroll);
});

onUnmounted(() => {
  window.removeEventListener("scroll", handleScroll);
});
</script>

<template>
  <Navbar />
  <Hero @search="handleSearch" />

  <!-- Liste des Pokémon -->
  <div class="container mx-auto px-4 py-8">
    <h2 class="text-2xl font-bold mb-6 text-center">Pokémon populaires</h2>

    <!-- Transition douce -->
    <TransitionGroup
      tag="div"
      class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"
      name="fade"
    >
      <Card
        v-for="pokemon in filteredPokemons"
        :key="pokemon.id"
        :pokemon="pokemon"
      />
      <div
        class="col-span-full text-center text-gray-500 text-lg font-bold"
        v-if="filteredPokemons.length === 0"
      >
        <img class="w-1/3 mx-auto" src="./assets/page-empty.png" alt="" />
        <p class="text-center">Aucun Pokémon trouvé.</p>
      </div>
    </TransitionGroup>

    <!-- Loader -->
    <div v-if="isLoading" class="text-center my-4">
      <span class="loading loading-spinner loading-xl"></span>
    </div>
  </div>
</template>

<style scoped>
.fade-enter-active {
  animation: fadeInUp 0.5s ease forwards;
}

.fade-leave-active {
  animation: fadeOut 0.3s ease forwards;
}

@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes fadeOut {
  from {
    opacity: 1;
    transform: translateY(0);
  }
  to {
    opacity: 0;
    transform: translateY(-20px);
  }
}
</style>
