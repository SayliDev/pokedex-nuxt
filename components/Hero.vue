<template>
  <div class="pokemon-hero relative overflow-hidden mx-auto">
    <!-- Background -->
    <div class="absolute inset-0 z-0">
      <div
        class="absolute inset-0 bg-gradient-to-br from-cyan-600 to-white-900 opacity-90"
      ></div>
      <div class="pokeball-pattern absolute inset-0 opacity-10"></div>

      <div
        class="absolute -right-16 -bottom-16 w-64 h-64 rounded-full border-8 border-white/20"
      ></div>
      <div
        class="absolute -left-16 -top-16 w-64 h-64 rounded-full border-8 border-white/10"
      ></div>

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
    <div class="hero-content text-center relative mx-auto z-10 py-16 px-4">
      <div class="max-w-lg">
        <div class="flex justify-center mb-6">
          <div class="pokemon-logo">
            <h1 class="text-5xl font-bold text-white drop-shadow-lg">
              Pokédex
            </h1>
            <div class="text-xs uppercase tracking-widest text-white/70 mt-1">
              Nuxt 3 + DaisyUI
            </div>
          </div>
        </div>

        <!-- Titre & desc -->
        <h2 class="text-3xl font-bold mb-4 text-white drop-shadow">
          Explorez tous les Pokémon
        </h2>
        <p class="mb-8 text-white/80 text-lg max-w-md mx-auto">
          Découvrez tous les Pokémon, leurs caractéristiques et ajoutez-les à
          votre équipe.
        </p>

        <Searchbar @search="$emit('search', $event)" />
      </div>
    </div>
  </div>
</template>

<script setup></script>

<style>
.pokemon-hero {
  min-height: 400px;
}

.pokeball-pattern {
  background-image: url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Ccircle cx='50' cy='50' r='40' stroke='white' stroke-width='5' fill='none' stroke-opacity='0.2'/%3E%3Cline x1='10' y1='50' x2='90' y2='50' stroke='white' stroke-width='5' stroke-opacity='0.2'/%3E%3Ccircle cx='50' cy='50' r='12' stroke='white' stroke-width='5' fill='none' stroke-opacity='0.2'/%3E%3C/svg%3E");
  background-size: 100px 100px;
}

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
