<template>
  <div
    class="pokemon-card group relative overflow-hidden rounded-2xl shadow-lg transition-all duration-300 cursor-pointer hover:shadow-xl hover:scale-105"
    :class="typeColorClasses"
  >
    <!-- Pattern de fond -->
    <div
      class="absolute inset-0 opacity-10 bg-pattern"
      style="pointer-events: none"
    ></div>

    <!-- Badge de l'ID du Pokémon -->
    <div
      class="absolute top-3 right-3 bg-white/20 backdrop-blur-sm px-2 py-1 rounded-full text-xs font-bold shadow-sm"
    >
      #{{ formatId(pokemon.id) }}
    </div>

    <!-- Badges des types du Pokémon -->
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

    <!-- Conteneur de l'image du Pokémon -->
    <div
      class="pokemon-sprite-container relative pt-12 pb-4 px-6 flex justify-center items-center"
    >
      <!-- Arrière-plan décoratif -->
      <div class="absolute inset-0 flex justify-center items-center opacity-10">
        <div
          class="w-52 h-52 rounded-full border-8 border-white before:content-[''] before:absolute before:w-full before:h-2 before:bg-white before:top-1/2 before:-translate-y-1/2 before:left-0 before:right-0 after:content-[''] after:absolute after:w-12 after:h-12 after:bg-white after:rounded-full after:top-1/2 after:left-1/2 after:-translate-x-1/2 after:-translate-y-1/2"
        ></div>
      </div>

      <!-- Image du Pokémon -->
      <img
        :src="pokemon.sprite"
        :alt="pokemon.name"
        class="w-40 h-40 object-contain z-10 drop-shadow-lg transform transition-all duration-500 group-hover:scale-110 group-hover:rotate-3"
      />
    </div>

    <!-- Informations du Pokemon -->
    <div class="bg-white p-6 rounded-b-2xl">
      <h2 class="text-xl font-bold text-center mb-3 capitalize">
        {{ pokemon.name }}
      </h2>

      <!-- Statistiques du Pokémon -->
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
        >
          <PlusIcon class="w-5 h-5" /> Ajouter à l'équipe
        </button>
        <button class="btn btn-ghost btn-sm w-full gap-1 transition-all">
          <Info class="w-4 h-4" /> Détails
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { PlusIcon, Info } from "lucide-vue-next";
import { computed } from "vue";

const props = defineProps({
  pokemon: {
    type: Object,
    required: true,
  },
});

// Formate l'ID avec des zéros de début
const formatId = (id: number) => {
  return id.toString().padStart(3, "0");
};

// Calcule la couleur de fond en fonction du type du Pokémon
const typeColorClasses = computed(() => {
  const primaryType = props.pokemon.types?.[0] || "normal";
  return getTypeColor(primaryType);
});

// Carte de couleurs par type
const getTypeColor = (type: string) => {
  const colors: Record<string, string> = {
    normal: "bg-gray-200 dark:bg-gray-700",
    fire: "bg-gradient-to-r from-orange-400 to-red-500",
    water: "bg-gradient-to-r from-blue-400 to-blue-600",
    grass: "bg-gradient-to-r from-green-400 to-emerald-600",
    electric: "bg-gradient-to-r from-yellow-300 to-amber-500",
    ice: "bg-gradient-to-r from-cyan-300 to-sky-500",
    fighting: "bg-gradient-to-r from-red-600 to-rose-700",
    poison: "bg-gradient-to-r from-purple-400 to-fuchsia-600",
    ground: "bg-gradient-to-r from-yellow-600 to-amber-700",
    flying: "bg-gradient-to-r from-indigo-300 to-violet-400",
    psychic: "bg-gradient-to-r from-pink-400 to-rose-500",
    bug: "bg-gradient-to-r from-lime-400 to-green-500",
    rock: "bg-gradient-to-r from-yellow-700 to-amber-800",
    ghost: "bg-gradient-to-r from-purple-600 to-indigo-800",
    dragon: "bg-gradient-to-r from-indigo-600 to-purple-700",
    dark: "bg-gradient-to-r from-gray-700 to-gray-900",
    steel: "bg-gradient-to-r from-gray-400 to-slate-500",
    fairy: "bg-gradient-to-r from-pink-300 to-pink-500",
  };

  return colors[type] || colors.normal;
};

// Carte de couleurs par type pour les badges
const getTypeBadgeColor = (type: string) => {
  const badgeColors: Record<string, string> = {
    normal: "bg-gray-500",
    fire: "bg-orange-500",
    water: "bg-blue-500",
    grass: "bg-green-500",
    electric: "bg-yellow-500",
    ice: "bg-cyan-500",
    fighting: "bg-red-600",
    poison: "bg-purple-500",
    ground: "bg-amber-600",
    flying: "bg-indigo-400",
    psychic: "bg-pink-500",
    bug: "bg-lime-500",
    rock: "bg-amber-700",
    ghost: "bg-purple-700",
    dragon: "bg-indigo-700",
    dark: "bg-gray-800",
    steel: "bg-slate-500",
    fairy: "bg-pink-400",
  };

  return badgeColors[type] || badgeColors.normal;
};
</script>

<style>
.pokemon-card {
  width: 280px;
  transition: all 0.3s ease;
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
