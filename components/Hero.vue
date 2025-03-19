<template>
  <div class="pokemon-hero relative overflow-hidden">
    <!-- Arrière-plan animé -->
    <div class="absolute inset-0 z-0">
      <div
        class="absolute inset-0 bg-gradient-to-br from-blue-600 to-indigo-900 opacity-90"
      ></div>
      <div class="pokeball-pattern absolute inset-0 opacity-10"></div>

      <!-- Éléments décoratifs -->
      <div
        class="absolute -right-16 -bottom-16 w-64 h-64 rounded-full border-8 border-white/20"
      ></div>
      <div
        class="absolute -left-16 -top-16 w-64 h-64 rounded-full border-8 border-white/10"
      ></div>

      <!-- Petites pokéballs animées -->
      <div
        class="absolute top-1/4 left-1/4 w-8 h-8 rounded-full bg-white/20 animate-float-slow"
      ></div>
      <div
        class="absolute top-2/3 right-1/3 w-6 h-6 rounded-full bg-white/20 animate-float-slower"
      ></div>
      <div
        class="absolute bottom-1/4 left-1/2 w-10 h-10 rounded-full bg-white/20 animate-float"
      ></div>
    </div>

    <!-- Contenu principal -->
    <div class="hero-content text-center relative z-10 py-16 px-4">
      <div class="max-w-lg">
        <!-- Logo Pokémon -->
        <div class="flex justify-center mb-6">
          <div class="pokemon-logo">
            <h1 class="text-5xl font-bold text-white drop-shadow-lg">
              Pokédex
            </h1>
            <div class="text-xs uppercase tracking-widest text-white/70 mt-1">
              L'encyclopédie Pokémon
            </div>
          </div>
        </div>

        <!-- Titre et description -->
        <h2 class="text-3xl font-bold mb-4 text-white drop-shadow">
          Explorez le monde des Pokémon
        </h2>
        <p class="mb-8 text-white/80 text-lg max-w-md mx-auto">
          Découvrez tous les Pokémon, leurs caractéristiques et ajoutez-les à
          votre équipe!
        </p>

        <!-- Barre de recherche -->
        <div class="search-container w-full max-w-lg mx-auto relative">
          <div class="relative">
            <!-- Icône de recherche -->
            <div
              class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-5 w-5 text-gray-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </div>

            <!-- Champ de recherche -->
            <input
              type="text"
              placeholder="Rechercher par nom ou numéro..."
              class="input input-lg w-full pl-10 pr-16 shadow-lg focus:outline-none border-none bg-white/90 backdrop-blur-sm text-gray-800 placeholder-gray-500"
              v-model="searchQuery"
              @input="handleSearch"
            />

            <!-- Icône de la pokéball -->
            <div class="absolute inset-y-0 right-0 pr-3 flex items-center">
              <div
                class="w-8 h-8 rounded-full bg-red-500 border-2 border-gray-800 flex items-center justify-center"
              >
                <div
                  class="w-6 h-6 rounded-full bg-white border border-gray-800 flex items-center justify-center"
                >
                  <div class="w-2 h-2 rounded-full bg-gray-800"></div>
                </div>
              </div>
            </div>
          </div>

          <!-- Suggestions de recherche (optionnel) -->
          <div
            class="search-suggestions absolute mt-2 w-full bg-white shadow-lg rounded-lg overflow-hidden z-50"
            v-if="showSuggestions && suggestions.length > 0"
          >
            <ul class="divide-y divide-gray-100">
              <li
                v-for="suggestion in suggestions"
                :key="suggestion.id"
                class="px-4 py-3 hover:bg-gray-100 cursor-pointer flex items-center"
                @click="selectSuggestion(suggestion)"
              >
                <img
                  :src="suggestion.sprite"
                  :alt="suggestion.name"
                  class="w-8 h-8 mr-3"
                />
                <span class="font-medium capitalize">{{
                  suggestion.name
                }}</span>
                <span class="ml-auto text-gray-500 text-sm"
                  >#{{ formatId(suggestion.id) }}</span
                >
              </li>
            </ul>
          </div>
        </div>

        <!-- Statistiques rapides -->
        <div class="stats-container flex justify-center gap-4 mt-8">
          <div
            class="stat-pill bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full text-white"
          >
            <span class="font-bold">151</span> Pokémon de Kanto
          </div>
          <div
            class="stat-pill bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full text-white"
          >
            <span class="font-bold">18</span> Types
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from "vue";

// État de recherche
const searchQuery = ref("");
const showSuggestions = ref(false);
const suggestions = ref([]);

// Fonction de formatage de l'ID
const formatId = (id) => {
  return id.toString().padStart(3, "0");
};

// Gestion de la recherche
const handleSearch = () => {
  // Simuler des suggestions - à remplacer par votre logique réelle
  if (searchQuery.value.length > 0) {
    // Exemple de suggestions - à remplacer par votre logique de filtrage
    suggestions.value = [
      {
        id: 25,
        name: "pikachu",
        sprite:
          "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/25.png",
      },
      {
        id: 26,
        name: "raichu",
        sprite:
          "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/26.png",
      },
    ];
    showSuggestions.value = true;
  } else {
    showSuggestions.value = false;
  }
};

// Sélection d'une suggestion
const selectSuggestion = (pokemon) => {
  searchQuery.value = pokemon.name;
  showSuggestions.value = false;
  // Ici, vous pourriez naviguer vers la page du Pokémon ou effectuer une autre action
};
</script>

<style>
.pokemon-hero {
  min-height: 400px;
  background-color: #1e40af;
}

.pokeball-pattern {
  background-image: url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Ccircle cx='50' cy='50' r='40' stroke='white' stroke-width='5' fill='none' stroke-opacity='0.2'/%3E%3Cline x1='10' y1='50' x2='90' y2='50' stroke='white' stroke-width='5' stroke-opacity='0.2'/%3E%3Ccircle cx='50' cy='50' r='12' stroke='white' stroke-width='5' fill='none' stroke-opacity='0.2'/%3E%3C/svg%3E");
  background-size: 100px 100px;
}

/* Animations */
@keyframes float {
  0%,
  100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-10px);
  }
}

@keyframes float-slow {
  0%,
  100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-15px);
  }
}

@keyframes float-slower {
  0%,
  100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-20px);
  }
}

.animate-float {
  animation: float 4s ease-in-out infinite;
}

.animate-float-slow {
  animation: float-slow 6s ease-in-out infinite;
}

.animate-float-slower {
  animation: float-slower 8s ease-in-out infinite;
}

.pokemon-logo {
  filter: drop-shadow(0 4px 6px rgba(0, 0, 0, 0.2));
}
</style>
