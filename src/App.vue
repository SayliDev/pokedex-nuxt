<script setup lang="ts">
import Navbar from "./components/Navbar.vue";
import Hero from "./components/Hero.vue";
import Filter from "./components/Filter.vue";
import Card from "./components/Card.vue";
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
      <Card />
    </div>
  </div>
</template>

<style scoped></style>
