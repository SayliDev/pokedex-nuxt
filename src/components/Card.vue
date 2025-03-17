<template>
  <div class="card pokemon-card bg-base-100 shadow-xl">
    <figure class="px-10 pt-10 bg-base-200 rounded-t-2xl">
      <img :src="pokemon.sprite" :alt="pokemon.name" class="w-32 h-32" />
    </figure>
    <div class="card-body items-center text-center">
      <h2 class="card-title">{{ pokemon.name }}</h2>
      <div class="flex gap-2 my-1">
        <div
          class="badge badge-outline capitalize"
          v-for="type in pokemon.types"
        >
          {{ type }}
        </div>
      </div>
      <p>#{{ pokemon.id }}</p>
      <div class="card-actions">
        <button class="btn btn-primary btn-sm gap-1">
          <PlusIcon class="w-5 h-5" /> Ajouter à l'équipe
        </button>
        <button class="btn btn-ghost btn-sm">
          <Info class="w-5 h-5" /> Détails
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { PlusIcon, Info } from "lucide-vue-next";

defineProps({
  pokemon: {
    type: Object,
    required: true,
  },
});
</script>

<style></style>
