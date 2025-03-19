<template>
  <div
    class="pokemon-card group relative overflow-hidden rounded-2xl shadow-lg transition-all duration-300 cursor-pointer hover:shadow-xl hover:scale-105"
    :class="typeColorClasses"
  >
    <!-- Pattern de fond -->
    <div
      class="absolute inset-0 opacity-20 bg-pattern"
      style="pointer-events: none"
    ></div>

    <!-- Badge ID -->
    <div
      class="absolute top-3 right-3 bg-white/20 backdrop-blur-sm px-2 py-1 text-white rounded-full text-xs font-bold shadow-sm"
    >
      #{{ formatId(pokemon.id) }}
    </div>

    <!-- Badges Types -->
    <div class="absolute top-3 left-3 flex gap-1">
      <div
        v-for="type in pokemon.types"
        :key="type"
        class="badge badge-sm capitalize text-white shadow-sm"
        :class="getTypeBadgeColor(type)"
      >
        {{ type }}
      </div>
    </div>

    <!-- Conteneur image Pokémon -->
    <RouterLink :to="`/pokemon/${pokemon.id}`">
      <div
        class="pokemon-sprite-container relative pt-12 pb-4 px-6 flex justify-center items-center"
      >
        <div
          class="absolute inset-0 flex justify-center items-center opacity-10"
        >
          <div
            class="w-52 h-52 rounded-full border-8 border-white before:content-[''] before:absolute before:w-full before:h-2 before:bg-white before:top-1/2 before:-translate-y-1/2 before:left-0 before:right-0 after:content-[''] after:absolute after:w-12 after:h-12 after:bg-white after:rounded-full after:top-1/2 after:left-1/2 after:-translate-x-1/2 after:-translate-y-1/2"
          ></div>
        </div>

        <img
          :src="pokemon.sprite"
          :alt="pokemon.name"
          class="w-40 h-40 object-contain z-10 drop-shadow-lg transform transition-all duration-500 group-hover:scale-110 group-hover:rotate-3"
        />
      </div>
    </RouterLink>

    <!-- Info Pokemon -->
    <div class="bg-white p-6 rounded-b-2xl">
      <h2 class="text-xl font-bold text-center mb-3 capitalize">
        {{ pokemon.name }}
      </h2>

      <!-- Stat Pokémon -->
      <div class="grid grid-cols-3 gap-2 mb-4 text-center">
        <div
          class="stat-box"
          v-for="stat in pokemon.stats.slice(0, 3)"
          :key="stat.name"
        >
          <span class="text-xs opacity-70 capitalize">{{ stat.name }}</span>
          <span class="font-bold">{{ stat.value }}</span>
        </div>
      </div>

      <!-- Boutons d'action -->
      <div class="flex flex-col gap-2">
        <button
          class="btn btn-primary w-full gap-1 hover:gap-2 hover:scale-105 hover:rotate-3 transition-all"
          @click="handleAddToTeam(pokemon)"
        >
          <PlusIcon class="w-5 h-5" /> Ajouter à l'équipe
        </button>
        <button
          class="btn btn-soft btn-info btn-sm w-full gap-1 transition-all"
          @click="store.openPokemonDetails(pokemon)"
        >
          <Info class="w-4 h-4" /> Détails
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Info, PlusIcon } from "lucide-vue-next";
import { computed } from "vue";
import { usePokemonStore } from "../stores/pokemonStore";
import { useTeamStore } from "../stores/teamStore";
import type { Pokemon } from "../types/PokemonType";
import {
  formatId,
  getTypeBadgeColor,
  getTypeColor,
} from "../utils/pokemonUtils";

const teamStore = useTeamStore();

const store = usePokemonStore();

const props = defineProps({
  pokemon: {
    type: Object as () => Pokemon,
    required: true,
  },
});

const handleAddToTeam = (pokemon: Pokemon) => {
  teamStore.addToTeam(pokemon);
};

// Couleur de fond en fonction du type du Pokémon
const typeColorClasses = computed(() => {
  const primaryType = props.pokemon.types?.[0] || "normal";
  return getTypeColor(primaryType);
});
</script>

<style>
.pokemon-card {
  width: 100%;
  transition: all 0.3s ease;

  @media (max-width: 720px) {
    margin: 0 20px;
    width: calc(100% - 40px);
  }
}

.stat-box {
  display: flex;
  flex-direction: column;
  padding: 0.5rem;
  border-radius: 0.5rem;
  background-color: rgba(0, 0, 0, 0.04);
}

.dark .stat-box {
  background-color: rgba(255, 255, 255, 0.05);
}

.bg-pattern {
  background-image: url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.2'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E");
}
</style>
