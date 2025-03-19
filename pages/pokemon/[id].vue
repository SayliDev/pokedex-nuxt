<template>
  <div class="pokemon-detail-page bg-gray-50 min-h-screen pb-16">
    <transition name="fade" mode="out-in">
      <div
        v-if="loading"
        class="min-h-screen flex items-center justify-center bg-gray-50"
      >
        <div class="flex flex-col items-center gap-4">
          <div class="loading loading-spinner loading-lg text-primary"></div>
          <p class="text-sm text-gray-500">Chargement du Pokémon...</p>
        </div>
      </div>
      <div v-else-if="pokemon" key="pokemon-data" class="pokemon-content">
        <!-- Header -->
        <div class="relative px-4 py-16 text-white" :class="typeColorClass">
          <div
            class="absolute inset-0 opacity-20 bg-pattern pointer-events-none"
          ></div>

          <!-- Navigation -->
          <div class="container mx-auto mb-8">
            <button
              @click="goBack"
              class="btn btn-circle btn-sm bg-white/20 hover:bg-white/30 border-none text-white"
              aria-label="Retour"
            >
              <ChevronLeft class="h-5 w-5" />
            </button>
          </div>

          <div class="container mx-auto relative z-10">
            <!-- ID & Nom -->
            <div class="flex flex-wrap items-baseline justify-between mb-4">
              <div class="flex flex-col gap-1">
                <div class="flex items-center gap-2">
                  <span
                    class="badge badge-lg bg-white/20 border-none text-white font-semibold"
                    >#{{ formatId(pokemon.id) }}</span
                  >
                  <div class="flex gap-1.5">
                    <span
                      v-for="type in pokemon.types"
                      :key="type.type.name"
                      class="badge badge-sm capitalize text-white shadow-md"
                      :class="getTypeBadgeColor(type.type.name)"
                    >
                      {{ type.type.name }}
                    </span>
                  </div>
                </div>
                <h1
                  class="text-5xl md:text-6xl font-bold capitalize text-white drop-shadow-md"
                >
                  {{ pokemon.name }}
                </h1>
              </div>
            </div>
          </div>
        </div>

        <!-- Image Pokémon -->
        <div class="container mx-auto px-4">
          <div class="relative -mt-24 mb-12 flex justify-center">
            <div class="pokemon-image-container group">
              <img
                :src="getHighResImage(pokemon)"
                :alt="pokemon.name"
                class="pokemon-image transition-transform duration-500 group-hover:scale-110"
              />
              <div
                class="absolute inset-0 rounded-full bg-gradient-to-b from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              ></div>
            </div>
          </div>

          <!-- Contenu main -->
          <div class="space-y-10 max-w-6xl mx-auto">
            <!-- Section Caractéristiques -->
            <div class="card bg-base-100 shadow-xl overflow-hidden">
              <div class="card-body p-0">
                <div class="grid grid-cols-1 lg:grid-cols-12 gap-0">
                  <div class="lg:col-span-4 p-6 border-r border-base-200">
                    <h2 class="card-title flex items-center mb-4 text-xl">
                      <Award class="h-5 w-5 mr-2 text-secondary" />
                      Caractéristiques
                    </h2>

                    <div class="grid grid-cols-2 gap-4">
                      <div class="stat-card stat">
                        <div class="flex items-center gap-2 stat-content">
                          <Ruler
                            class="h-4 w-4 text-secondary opacity-80 stat-figure"
                          />
                          <span class="text-xs opacity-70">Taille</span>
                        </div>
                        <span class="text-lg font-bold opacity-60"
                          >{{ pokemon.height / 10 }} m</span
                        >
                      </div>

                      <div class="stat-card stat">
                        <div class="flex items-center gap-2 stat-content">
                          <Weight
                            class="h-4 w-4 text-secondary opacity-80 stat-figure"
                          />
                          <span class="text-xs opacity-70">Poids</span>
                        </div>
                        <span class="text-lg font-bold opacity-60"
                          >{{ pokemon.weight / 10 }} kg</span
                        >
                      </div>

                      <div class="stat-card stat">
                        <div class="flex items-center gap-2 stat-content">
                          <Sparkles
                            class="h-4 w-4 text-secondary opacity-80 stat-figure"
                          />
                          <span class="text-xs opacity-70">Expérience</span>
                        </div>
                        <span class="text-lg font-bold opacity-60"
                          >{{ pokemon.base_experience }} XP</span
                        >
                      </div>

                      <div class="stat-card stat">
                        <div class="flex items-center gap-2 stat-content">
                          <Hash
                            class="h-4 w-4 text-secondary opacity-80 stat-figure"
                          />
                          <span class="text-xs opacity-70">ID</span>
                        </div>
                        <span class="text-lg font-bold opacity-60">{{
                          formatId(pokemon.id)
                        }}</span>
                      </div>
                    </div>

                    <div class="divider my-4"></div>

                    <div>
                      <h3
                        class="font-bold mb-3 text-sm uppercase flex items-center gap-2"
                      >
                        <Cpu class="h-4 w-4 text-secondary opacity-80" />
                        Capacités
                      </h3>
                      <div class="flex flex-wrap gap-2">
                        <span
                          v-for="ability in pokemon.abilities"
                          :key="ability.ability.name"
                          class="badge badge-outline badge-md capitalize"
                        >
                          {{ ability.ability.name }}
                        </span>
                      </div>
                    </div>
                  </div>

                  <!-- Stats -->
                  <div class="lg:col-span-8 p-6">
                    <h2 class="card-title flex items-center mb-4 text-xl">
                      <BarChart class="h-5 w-5 mr-2 text-secondary" />
                      Statistiques
                    </h2>

                    <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div class="space-y-4">
                        <div
                          v-for="stat in pokemon.stats.slice(0, 3)"
                          :key="stat.stat.name"
                          class="stat-progress"
                        >
                          <div class="flex justify-between mb-1">
                            <span class="text-sm font-medium capitalize">{{
                              formatStatName(stat.stat.name)
                            }}</span>
                            <span class="text-sm font-bold">{{
                              stat.base_stat
                            }}</span>
                          </div>
                          <div class="w-full bg-gray-200 rounded-full h-3">
                            <div
                              class="h-3 rounded-full transition-all duration-1000"
                              :class="getStatBarColor(stat.stat.name)"
                              :style="{
                                width: `${Math.min(
                                  100,
                                  (stat.base_stat / 155) * 100
                                )}%`,
                              }"
                            ></div>
                          </div>
                        </div>
                      </div>

                      <div class="space-y-4">
                        <div
                          v-for="stat in pokemon.stats.slice(3)"
                          :key="stat.stat.name"
                          class="stat-progress"
                        >
                          <div class="flex justify-between mb-1">
                            <span class="text-sm font-medium capitalize">{{
                              formatStatName(stat.stat.name)
                            }}</span>
                            <span class="text-sm font-bold">{{
                              stat.base_stat
                            }}</span>
                          </div>
                          <div class="w-full bg-gray-200 rounded-full h-3">
                            <div
                              class="h-3 rounded-full transition-all duration-1000"
                              :class="getStatBarColor(stat.stat.name)"
                              :style="{
                                width: `${Math.min(
                                  100,
                                  (stat.base_stat / 155) * 100
                                )}%`,
                              }"
                            ></div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <!-- Section Sprites -->
            <div class="card bg-base-100 shadow-xl">
              <div class="card-body">
                <h2 class="card-title flex items-center mb-4 text-xl">
                  <Image class="h-5 w-5 mr-2 text-secondary" />
                  Sprites & Variations
                </h2>

                <div class="grid grid-cols-2 sm:grid-cols-4 gap-4">
                  <div class="sprite-card group">
                    <div
                      class="relative overflow-hidden rounded-lg aspect-square flex items-center justify-center bg-gray-100"
                    >
                      <img
                        :src="pokemon.sprites.front_default"
                        alt="Front"
                        class="w-24 h-24 object-contain transition-transform duration-300 group-hover:scale-110"
                      />
                    </div>
                    <p class="text-center text-sm mt-2 font-medium">Normal</p>
                  </div>

                  <div
                    class="sprite-card group"
                    v-if="pokemon.sprites.back_default"
                  >
                    <div
                      class="relative overflow-hidden rounded-lg aspect-square flex items-center justify-center bg-gray-100"
                    >
                      <img
                        :src="pokemon.sprites.back_default"
                        alt="Back"
                        class="w-24 h-24 object-contain transition-transform duration-300 group-hover:scale-110"
                      />
                    </div>
                    <p class="text-center text-sm mt-2 font-medium">Dos</p>
                  </div>

                  <div
                    class="sprite-card group"
                    v-if="pokemon.sprites.front_shiny"
                  >
                    <div
                      class="relative overflow-hidden rounded-lg aspect-square flex items-center justify-center bg-gray-100"
                    >
                      <img
                        :src="pokemon.sprites.front_shiny"
                        alt="Shiny"
                        class="w-24 h-24 object-contain transition-transform duration-300 group-hover:scale-110"
                      />
                      <div class="absolute bottom-0 right-0 m-1">
                        <Sparkles class="h-4 w-4 text-yellow-400" />
                      </div>
                    </div>
                    <p class="text-center text-sm mt-2 font-medium">Shiny</p>
                  </div>

                  <div
                    class="sprite-card group"
                    v-if="pokemon.sprites.back_shiny"
                  >
                    <div
                      class="relative overflow-hidden rounded-lg aspect-square flex items-center justify-center bg-gray-100"
                    >
                      <img
                        :src="pokemon.sprites.back_shiny"
                        alt="Shiny Back"
                        class="w-24 h-24 object-contain transition-transform duration-300 group-hover:scale-110"
                      />
                      <div class="absolute bottom-0 right-0 m-1">
                        <Sparkles class="h-4 w-4 text-yellow-400" />
                      </div>
                    </div>
                    <p class="text-center text-sm mt-2 font-medium">
                      Shiny Dos
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <!-- Boutons d'action -->
            <div class="flex justify-center gap-4 mt-8">
              <button class="btn btn-primary gap-2">
                <Plus class="h-5 w-5" />
                Ajouter à l'équipe
              </button>
            </div>
          </div>
        </div>
      </div>
      <div
        v-else
        class="min-h-screen flex items-center justify-center bg-gray-50"
      >
        <div class="text-center">
          <h2 class="text-2xl font-bold mb-4">Pokémon non trouvé</h2>
          <p class="text-gray-500 mb-6">
            Impossible de charger les données du Pokémon.
          </p>
          <button @click="goBack" class="btn btn-primary">Retour</button>
        </div>
      </div>
    </transition>
  </div>
</template>

<script setup>
import {
  formatId,
  formatStatName,
  getStatBarColor,
  getTypeBadgeColor,
  getTypeColor,
} from "@/utils/pokemonUtils";
import {
  Award,
  BarChart,
  ChevronLeft,
  Cpu,
  Hash,
  Image,
  Plus,
  Ruler,
  Sparkles,
  Weight,
} from "lucide-vue-next";
import { computed, onMounted, ref } from "vue";
import { useRoute, useRouter } from "vue-router";

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
    pokemon.value = await res.json();
    await new Promise((resolve) => setTimeout(resolve, 600));
  } catch (error) {
    console.error("Erreur lors du chargement du Pokémon:", error);
  } finally {
    loading.value = false;
  }
});

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

const getHighResImage = (pokemon) => {
  return (
    pokemon.sprites.other?.["front_default"]?.front_default ||
    pokemon.sprites.other?.home?.front_default ||
    pokemon.sprites.front_default
  );
};
</script>

<style scoped>
.bg-pattern {
  background-image: url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.3'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E");
}

.pokemon-detail-page {
  min-height: 100vh;
}

.pokemon-image-container {
  width: 220px;
  height: 220px;
  background-color: rgba(255, 255, 255, 0.85);
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.15);
  border-radius: 9999px;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.pokemon-image-container:hover {
  transform: translateY(-5px);
  box-shadow: 0 12px 36px rgba(0, 0, 0, 0.2);
}

.pokemon-image {
  width: 85%;
  height: 85%;
  object-fit: contain;
  filter: drop-shadow(0 4px 3px rgba(0, 0, 0, 0.1));
}

.sprite-card {
  transition: transform 0.2s ease;
}

.sprite-card:hover {
  transform: translateY(-2px);
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

@media (min-width: 768px) {
  .pokemon-image-container {
    width: 280px;
    height: 280px;
  }
}
</style>
