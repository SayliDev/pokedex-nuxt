<template>
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
              :src="sprites.front_default"
              alt="Front"
              class="w-24 h-24 object-contain transition-transform duration-300 group-hover:scale-110"
            />
          </div>
          <p class="text-center text-sm mt-2 font-medium">Normal</p>
        </div>

        <div class="sprite-card group" v-if="sprites.back_default">
          <div
            class="relative overflow-hidden rounded-lg aspect-square flex items-center justify-center bg-gray-100"
          >
            <img
              :src="sprites.back_default"
              alt="Back"
              class="w-24 h-24 object-contain transition-transform duration-300 group-hover:scale-110"
            />
          </div>
          <p class="text-center text-sm mt-2 font-medium">Dos</p>
        </div>

        <div class="sprite-card group" v-if="sprites.front_shiny">
          <div
            class="relative overflow-hidden rounded-lg aspect-square flex items-center justify-center bg-gray-100"
          >
            <img
              :src="sprites.front_shiny"
              alt="Shiny"
              class="w-24 h-24 object-contain transition-transform duration-300 group-hover:scale-110"
            />
            <div class="absolute bottom-0 right-0 m-1">
              <Sparkles class="h-4 w-4 text-yellow-400" />
            </div>
          </div>
          <p class="text-center text-sm mt-2 font-medium">Shiny</p>
        </div>

        <div class="sprite-card group" v-if="sprites.back_shiny">
          <div
            class="relative overflow-hidden rounded-lg aspect-square flex items-center justify-center bg-gray-100"
          >
            <img
              :src="sprites.back_shiny"
              alt="Shiny Back"
              class="w-24 h-24 object-contain transition-transform duration-300 group-hover:scale-110"
            />
            <div class="absolute bottom-0 right-0 m-1">
              <Sparkles class="h-4 w-4 text-yellow-400" />
            </div>
          </div>
          <p class="text-center text-sm mt-2 font-medium">Shiny Dos</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { Image, Sparkles } from "lucide-vue-next";

const props = defineProps({
  sprites: {
    type: Object,
    required: true,
  },
});
</script>

<style scoped>
.sprite-card {
  transition: transform 0.2s ease;
}

.sprite-card:hover {
  transform: translateY(-2px);
}
</style>
