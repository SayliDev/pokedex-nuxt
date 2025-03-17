<template>
  <div class="form-control w-full max-w-lg mx-auto flex justify-center">
    <input
      type="text"
      placeholder="Rechercher un Pokémon..."
      class="input input-bordered w-full"
    />
    <button class="btn btn-square btn-primary">
      <SearchIcon class="w-6 h-6" />
    </button>
  </div>
</template>

<script setup lang="ts">
import { SearchIcon } from "lucide-vue-next";
</script>

<style></style>
