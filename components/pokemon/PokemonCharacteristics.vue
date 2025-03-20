<template>
  <div class="lg:col-span-4 p-6 border-r border-base-200">
    <h2 class="card-title flex items-center mb-4 text-xl">
      <Award class="h-5 w-5 mr-2 text-secondary" />
      Caractéristiques
    </h2>

    <div class="grid grid-cols-2 gap-4">
      <div class="stat-card stat">
        <div class="flex items-center gap-2 stat-content">
          <Ruler class="h-4 w-4 text-secondary opacity-80 stat-figure" />
          <span class="text-xs opacity-70">Taille</span>
        </div>
        <span class="text-lg font-bold opacity-60"
          >{{ pokemon.height / 10 }} m</span
        >
      </div>

      <div class="stat-card stat">
        <div class="flex items-center gap-2 stat-content">
          <Weight class="h-4 w-4 text-secondary opacity-80 stat-figure" />
          <span class="text-xs opacity-70">Poids</span>
        </div>
        <span class="text-lg font-bold opacity-60"
          >{{ pokemon.weight / 10 }} kg</span
        >
      </div>

      <div class="stat-card stat">
        <div class="flex items-center gap-2 stat-content">
          <Sparkles class="h-4 w-4 text-secondary opacity-80 stat-figure" />
          <span class="text-xs opacity-70">Expérience</span>
        </div>
        <span class="text-lg font-bold opacity-60"
          >{{ pokemon.base_experience }} XP</span
        >
      </div>

      <div class="stat-card stat">
        <div class="flex items-center gap-2 stat-content">
          <Hash class="h-4 w-4 text-secondary opacity-80 stat-figure" />
          <span class="text-xs opacity-70">ID</span>
        </div>
        <span class="text-lg font-bold opacity-60">{{
          formatId(pokemon.id)
        }}</span>
      </div>
    </div>

    <div class="divider my-4"></div>

    <div>
      <h3 class="font-bold mb-3 text-sm uppercase flex items-center gap-2">
        <Cpu class="h-4 w-4 text-secondary opacity-80" />
        Capacités
      </h3>
      <div class="flex flex-wrap gap-2">
        <span
          v-for="ability in pokemon.abilities"
          :key="ability.ability.name"
          class="badge badge-outline badge-md capitalize"
        >
          {{ ability.ability.name }}
        </span>
      </div>
    </div>
  </div>
</template>

<script setup>
import { formatId } from "@/utils/pokemonUtils";
import { Award, Cpu, Hash, Ruler, Sparkles, Weight } from "lucide-vue-next";

const props = defineProps({
  pokemon: {
    type: Object,
    required: true,
  },
});
</script>
