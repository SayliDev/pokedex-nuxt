<template>
  <div class="hero bg-base-200 py-8">
    <div class="hero-content text-center">
      <div class="max-w-md">
        <h1 class="text-4xl font-bold mb-5">Explorez le monde des Pokémon</h1>
        <p class="mb-5">
          Découvrez tous les Pokémon, leurs caractéristiques et ajoutez-les à
          votre équipe!
        </p>
        <Searchbar @search="$emit('search', $event)" />
      </div>
    </div>
  </div>
</template>

<script setup>
import Searchbar from "./Searchbar.vue";

defineEmits(["search"]);
</script>
