<template>
  <div class="pokemon-detail-page bg-gray-50 min-h-screen pb-16">
    <transition name="fade" mode="out-in">
      <LoadingState v-if="loading" />
      <div v-else-if="pokemon" key="pokemon-data" class="pokemon-content">
        <PokemonHeader
          :pokemon="pokemon"
          :typeColorClass="typeColorClass"
          @go-back="goBack"
        />

        <div class="container mx-auto px-4">
          <PokemonImage :pokemon="pokemon" />

          <!-- Main -->
          <div class="space-y-10 max-w-6xl mx-auto">
            <div class="card bg-base-100 shadow-xl overflow-hidden">
              <div class="card-body p-0">
                <div class="grid grid-cols-1 lg:grid-cols-12 gap-0">
                  <PokemonCharacteristics :pokemon="pokemon" />
                  <PokemonStats :stats="pokemon.stats" />
                </div>
              </div>
            </div>

            <PokemonSprites :sprites="pokemon.sprites" />

            <!-- Boutons d'action -->
            <div class="flex justify-center gap-4 mt-8">
              <button
                class="btn btn-primary gap-2"
                @click="handleAddToTeam(pokemon)"
              >
                <Plus class="h-5 w-5" />
                Ajouter à l'équipe
              </button>
            </div>
          </div>
        </div>
      </div>
      <ErrorState v-else @go-back="goBack" />
    </transition>
  </div>
</template>

<script setup>
import { computed, onMounted, ref } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useTeamStore } from "@/stores/teamStore";
import { Plus } from "lucide-vue-next";
import { getTypeColor } from "@/utils/pokemonUtils";

import PokemonHeader from "@/components/pokemon/PokemonHeader.vue";
import PokemonImage from "@/components/pokemon/PokemonImage.vue";
import PokemonCharacteristics from "@/components/pokemon/PokemonCharacteristics.vue";
import PokemonStats from "@/components/pokemon/PokemonStats.vue";
import PokemonSprites from "@/components/pokemon/PokemonSprites.vue";
import LoadingState from "@/components/pokemon/LoadingState.vue";
import ErrorState from "@/components/pokemon/ErrorState.vue";

const teamStore = useTeamStore();
const route = useRoute();
const router = useRouter();
const pokemon = ref(null);
const loading = ref(true);
const isLeaving = ref(false);

onMounted(async () => {
  try {
    const res = await fetch(
      `https://pokeapi.co/api/v2/pokemon/${route.params.id}`
    );
    const pokemonData = await res.json();
    const speciesRes = await fetch(
      `https://pokeapi.co/api/v2/pokemon-species/${route.params.id}/`
    );
    const speciesData = await speciesRes.json();
    const frenchName =
      speciesData.names.find((n) => n.language.name === "fr")?.name ||
      pokemonData.name;
    pokemon.value = {
      ...pokemonData,
      name: frenchName,
    };

    await new Promise((resolve) => setTimeout(resolve, 600));
  } catch (error) {
    console.error("Erreur lors du chargement du Pokémon:", error);
  } finally {
    loading.value = false;
  }
});

const handleAddToTeam = (pokemon) => {
  const formattedPokemon = {
    id: pokemon.id,
    name: pokemon.name,
    types: pokemon.types.map((t) => t.type.name),
    stats: pokemon.stats.map((s) => ({
      name: s.stat.name,
      value: s.base_stat,
    })),
    sprite: pokemon.sprites.other.home.front_default,
  };

  teamStore.addToTeam(formattedPokemon);
};

const goBack = () => {
  isLeaving.value = true;
  setTimeout(() => {
    router.back();
  }, 300);
};

const typeColorClass = computed(() => {
  if (!pokemon.value) return "";
  const primaryType = pokemon.value.types[0].type.name;
  return getTypeColor(primaryType);
});
</script>

<style scoped>
.pokemon-detail-page {
  min-height: 100vh;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease, transform 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
  transform: translateY(10px);
}

.fade-enter-to,
.fade-leave-from {
  opacity: 1;
  transform: translateY(0);
}
</style>
