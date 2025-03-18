<template>
  <div
    class="drawer-handle fixed top-1/2 -translate-y-1/2 right-0 bg-primary hover:bg-primary-focus text-primary-content p-2 rounded-l-lg shadow-lg cursor-pointer transition-all duration-500 flex items-center justify-center"
    :class="{
      'opacity-0 pointer-events-none translate-x-full': store.isDrawerOpen,
    }"
    @click="store.openPokemonDrawer()"
  >
    <PanelRightOpen class="h-6 w-6" />
  </div>
</template>

<script setup lang="ts">
import { PanelRightOpen } from "lucide-vue-next";
import { usePokemonStore } from "../stores/pokemonStore";
const store = usePokemonStore();
</script>

<style></style>
