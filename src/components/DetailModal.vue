<template>
  <dialog
    :open="store.isModalOpen"
    @close="store.closeModal()"
    id="pokemon_modal"
    class="modal"
  >
    <div
      class="modal-box max-w-xl p-0 overflow-hidden"
      v-if="store.selectedPokemon"
    >
      <!-- Header -->
      <div class="relative p-6 pb-24 text-white" :class="typeColorClasses">
        <!-- Motif en Backround -->
        <div class="absolute inset-0 opacity-20 bg-pattern"></div>

        <div
          class="absolute right-0 bottom-0 transform translate-x-1/4 translate-y-1/4 opacity-20"
        >
          <div class="w-64 h-64 rounded-full border-8 border-white"></div>
        </div>

        <!-- Informations Header -->
        <div class="flex justify-between items-start z-10 relative">
          <div>
            <h2 class="text-3xl font-bold capitalize mb-1">
              {{ store.selectedPokemon.name }}
            </h2>
            <div class="flex gap-2 flex-wrap">
              <span
                v-for="type in store.selectedPokemon.types"
                :key="type"
                class="badge badge-sm capitalize text-white shadow-md"
                :class="getTypeBadgeColor(type)"
              >
                {{ type }}
              </span>
            </div>
          </div>
          <div class="text-right">
            <span class="text-xl font-bold"
              >#{{ formatId(store.selectedPokemon.id) }}</span
            >
          </div>
        </div>
      </div>

      <!-- Image Pokémon -->
      <div class="relative -mt-20 mb-6 flex justify-center">
        <div
          class="w-32 h-32 rounded-full bg-white shadow-lg flex items-center justify-center"
        >
          <img
            :src="store.selectedPokemon.sprite"
            :alt="store.selectedPokemon.name"
            class="w-40 h-40 object-contain transform -translate-y-2 drop-shadow-xl animate-float"
          />
        </div>
      </div>

      <!-- Contenu principal -->
      <div class="px-6 pb-6">
        <!-- Caractéristiques physiques -->
        <div class="stats shadow grid grid-cols-2 gap-3 mb-6">
          <div class="stat">
            <div class="stat-figure">
              <Ruler class="h-7 w-7 opacity-50" />
            </div>
            <div class="stat-content ml-2">
              <span class="stat-desc text-xs opacity-70">Taille</span>
              <span class="stat-value font-bold opacity-50"
                >{{ store.selectedPokemon.height / 10 }} m</span
              >
            </div>
          </div>

          <div class="stat">
            <div class="stat-figure">
              <Weight class="h-7 w-7 opacity-50" />
            </div>
            <div class="stat-content ml-2">
              <span class="stat-desc text-xs opacity-70">Poids</span>
              <span class="stat-value font-bold opacity-50"
                >{{ store.selectedPokemon.weight / 10 }} kg</span
              >
            </div>
          </div>
        </div>

        <!-- Statistiques -->
        <h4 class="font-bold mb-3 text-lg flex items-center">
          <ChartBar class="h-5 w-5 mr-2" />
          Statistiques
        </h4>

        <div class="space-y-3">
          <div
            v-for="stat in store.selectedPokemon.stats"
            :key="stat.name"
            class="stat-progress"
          >
            <div class="flex justify-between mb-1">
              <span class="text-sm font-medium capitalize">{{
                stat.name
              }}</span>
              <span class="text-sm font-medium">{{ stat.value }}</span>
            </div>
            <div class="w-full bg-gray-200 rounded-full h-2.5">
              <div
                class="h-2.5 rounded-full transition-all duration-500 ease-in-out"
                :class="getStatBarColor(stat.name)"
                :style="{
                  width: `${Math.min(100, (stat.value / 155) * 100)}%`,
                  boxShadow: '0 5px 5px rgba(0, 0, 0, 0.15)',
                }"
              ></div>
            </div>
          </div>
        </div>

        <!-- Capacités -->
        <div
          v-if="
            store.selectedPokemon.abilities &&
            store.selectedPokemon.abilities.length > 0
          "
          class="mt-6"
        >
          <h4 class="font-bold mb-3 text-lg flex items-center">
            <Zap class="h-5 w-5 mr-2" />
            Capacités
          </h4>
          <div class="flex flex-wrap gap-2">
            <span
              v-for="ability in store.selectedPokemon.abilities"
              :key="ability"
              class="badge badge-outline badge-lg capitalize"
              >{{ ability }}</span
            >
          </div>
        </div>

        <!-- Actions -->
        <div class="modal-action mt-6">
          <form method="dialog" class="flex gap-2 w-full">
            <button class="btn btn-primary flex-1" @click="addToTeam">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-5 w-5 mr-1"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                />
              </svg>
              Ajouter à l'équipe
            </button>
            <button class="btn btn-dash" @click="store.closeModal()">
              Fermer
            </button>
          </form>
        </div>
      </div>
    </div>
    <form method="dialog" class="modal-backdrop">
      <button>close</button>
    </form>
  </dialog>
</template>

<script setup lang="ts">
import { ChartBar, Ruler, Weight, Zap } from "lucide-vue-next";
import { usePokemonStore } from "../stores/pokemonStore";
import { computed } from "vue";
import {
  getStatBarColor,
  getTypeBadgeColor,
  getTypeColor,
} from "../utils/pokemonUtils";

const store = usePokemonStore();

const formatId = (id: number) => {
  return id.toString().padStart(3, "0");
};

// Calcule la classe de couleur en fonction du type principal
const typeColorClasses = computed(() => {
  if (!store.selectedPokemon) return "";
  const primaryType = store.selectedPokemon.types?.[0] || "normal";
  return getTypeColor(primaryType);
});

// TODO:Fonction d'ajout à l'équipe
const addToTeam = () => {
  // store.addToTeam(store.selectedPokemon);
  store.closeModal();
};
</script>

<style>
.bg-pattern {
  background-image: url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.2'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E");
}

.stat-card {
  display: flex;
  align-items: center;
  padding: 0.75rem;
  border-radius: 0.5rem;
  background-color: rgba(0, 0, 0, 0.04);
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);
}

.dark .stat-card {
  background-color: rgba(255, 255, 255, 0.05);
}

.stat-icon {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 2rem;
  height: 2rem;
  border-radius: 0.375rem;
  background-color: rgba(0, 0, 0, 0.04);
}

.dark .stat-icon {
  background-color: rgba(255, 255, 255, 0.01);
}

.stat-content {
  display: flex;
  flex-direction: column;
}

.stat-progress {
  width: 100%;
}

@keyframes float {
  0% {
    transform: translateY(-2px);
  }
  50% {
    transform: translateY(2px);
  }
  100% {
    transform: translateY(-2px);
  }
}

.animate-float {
  animation: float 3s ease-in-out infinite;
}
</style>
