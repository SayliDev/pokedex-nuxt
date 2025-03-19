<template>
  <div class="search-container w-full max-w-lg mx-auto relative">
    <div class="relative">
      <div
        class="absolute left-3 top-1/2 transform -translate-y-1/2 pointer-events-none z-20"
      >
        <Search class="w-5 h-5 text-gray-500" />
      </div>

      <input
        type="text"
        placeholder="Rechercher par nom..."
        class="input input-lg w-full pl-10 pr-16 shadow-lg focus:outline-none border-none bg-white/90 backdrop-blur-sm text-gray-800 placeholder-gray-500"
        @input="$emit('search', $event.target.value)"
      />

      <div class="absolute inset-y-0 right-0 pr-3 flex items-center">
        <img src="@/assets/pokeball.png" class="w-7 h-7" alt="Pokeball" />
      </div>
    </div>
  </div>
</template>

<script setup>
import { Search } from "lucide-vue-next";

defineEmits(["search"]);
</script>
