<template>
  <div class="relative px-4 py-16 text-white" :class="typeColorClass">
    <div
      class="absolute inset-0 opacity-20 bg-pattern pointer-events-none"
    ></div>

    <!-- Navigation -->
    <div class="container mx-auto mb-8">
      <button
        @click="$emit('go-back')"
        class="btn btn-circle btn-sm bg-white/20 hover:bg-white/30 border-none text-white"
        aria-label="Retour"
      >
        <ChevronLeft class="h-5 w-5" />
      </button>
    </div>

    <div class="container mx-auto relative z-10">
      <!-- ID & Nom -->
      <div class="flex flex-wrap items-baseline justify-between mb-4">
        <div class="flex flex-col gap-1">
          <div class="flex items-center gap-2">
            <span
              class="badge badge-lg bg-white/20 border-none text-white font-semibold"
            >
              #{{ formatId(pokemon.id) }}
            </span>
            <div class="flex gap-1.5">
              <span
                v-for="type in pokemon.types"
                :key="type.type.name"
                class="badge badge-sm capitalize text-white shadow-md"
                :class="getTypeBadgeColor(type.type.name)"
              >
                {{ type.type.name }}
              </span>
            </div>
          </div>
          <h1
            class="text-5xl md:text-6xl font-bold capitalize text-white drop-shadow-md"
          >
            {{ pokemon.name }}
          </h1>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ChevronLeft } from "lucide-vue-next";
import { formatId, getTypeBadgeColor } from "@/utils/pokemonUtils";

const props = defineProps({
  pokemon: {
    type: Object,
    required: true,
  },
  typeColorClass: {
    type: String,
    required: true,
  },
});

defineEmits(["go-back"]);
</script>

<style scoped>
.bg-pattern {
  background-image: url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.3'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E");
}
</style>
